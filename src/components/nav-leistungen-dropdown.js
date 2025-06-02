import { gsap } from 'gsap'
;(() => {
  // 0) No-JS-Klasse entfernen, damit CSS-Fallback wegfällt
  document.documentElement.classList.remove('no-js')
  // 1) Elemente per data-Attribute selektieren
  const wrapper = document.querySelector('[data-dropdown="leistungen"]')
  if (!wrapper) return

  const trigger = wrapper.querySelector('[data-dropdown-trigger]')
  const menu = wrapper.querySelector('[data-dropdown-menu]')
  const links = wrapper.querySelectorAll('[data-dropdown-link]')

  // 2) Funktionen zum Öffnen/Schließen ohne geteiltes Timeline
  const openMenu = () => {
    // Stop any ongoing animations on the menu
    gsap.killTweensOf(menu)
    // ARIA-Attribute setzen
    trigger.setAttribute('aria-expanded', 'true')
    // Menü sichtbar machen
    menu.removeAttribute('hidden')
    menu.setAttribute('data-open', 'true')
    links.forEach((link) => link.setAttribute('tabindex', '0'))
    // Einblend-Animation
    gsap.fromTo(
      menu,
      { autoAlpha: 0, y: -10, display: 'block' },
      { duration: 0.25, autoAlpha: 1, y: 0, ease: 'power1.out' }
    )
  }

  const closeMenu = () => {
    // Stop any ongoing animations on the menu
    gsap.killTweensOf(menu)
    // ARIA-Attribute zurücksetzen
    trigger.setAttribute('aria-expanded', 'false')
    links.forEach((link) => link.setAttribute('tabindex', '-1'))
    // Ausblend-Animation
    gsap.to(menu, {
      duration: 0.2,
      autoAlpha: 0,
      y: -10,
      ease: 'power1.in',
      onComplete: () => {
        menu.setAttribute('hidden', '')
        menu.removeAttribute('data-open')
        gsap.set(menu, { display: 'none' })
      }
    })
  }

  // Toggle‐Funktion für Mobile/Click
  const toggleMenu = (e) => {
    e.preventDefault()
    const isOpen = trigger.getAttribute('aria-expanded') === 'true'
    if (isOpen) {
      closeMenu()
      trigger.focus()
    } else {
      openMenu()
      links[0]?.focus()
    }
  }

  // 4) Breakpoint-Logik: Hover für Desktop, Klick für Mobile
  const desktopMQ = window.matchMedia('(min-width: 992px)')

  const setupDesktop = () => {
    wrapper.addEventListener('mouseenter', openMenu)
    wrapper.addEventListener('mouseleave', closeMenu)
    trigger.removeEventListener('click', toggleMenu)
  }

  const setupMobile = () => {
    trigger.addEventListener('click', toggleMenu)
    wrapper.removeEventListener('mouseenter', openMenu)
    wrapper.removeEventListener('mouseleave', closeMenu)
  }

  // Initiale Zuordnung je nach Viewport
  if (desktopMQ.matches) {
    setupDesktop()
  } else {
    setupMobile()
  }

  // Wenn sich der Viewport ändert (z.B. Resize), Listener anpassen
  desktopMQ.addEventListener('change', (e) => {
    if (e.matches) {
      // Wechsel zu Desktop
      setupDesktop()
      if (trigger.getAttribute('aria-expanded') === 'true') {
        closeMenu()
      }
    } else {
      // Wechsel zu Mobile
      setupMobile()
      if (trigger.getAttribute('aria-expanded') === 'true') {
        closeMenu()
      }
    }
  })

  // 5) Keyboard-Interaktionen (unabhängig von Breakpoint)
  // a) Enter/Space auf Dropdown-Icon
  trigger.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      const isOpen = trigger.getAttribute('aria-expanded') === 'true'
      if (isOpen) {
        closeMenu()
        trigger.focus()
      } else {
        openMenu()
        links[0]?.focus()
      }
    }
    if (e.key === 'Escape') {
      const isOpen = trigger.getAttribute('aria-expanded') === 'true'
      if (isOpen) {
        closeMenu()
        trigger.focus()
      }
    }
  })

  // b) Klick außerhalb schließt das Menü
  document.addEventListener('click', (e) => {
    if (!wrapper.contains(e.target)) {
      if (trigger.getAttribute('aria-expanded') === 'true') {
        closeMenu()
      }
    }
  })

  // c) Pfeil-Navigation innerhalb der Links
  links.forEach((link, idx) => {
    link.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        const next = (idx + 1) % links.length
        links[next].focus()
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault()
        const prev = (idx - 1 + links.length) % links.length
        links[prev].focus()
      }
      if (e.key === 'Escape') {
        e.preventDefault()
        closeMenu()
        trigger.focus()
      }
    })
  })

  // d) Wenn Button (Trigger) den Fokus verliert → Menü schließen, es sei denn, Fokus geht in die Links
  trigger.addEventListener('blur', () => {
    setTimeout(() => {
      if (!wrapper.contains(document.activeElement)) {
        if (trigger.getAttribute('aria-expanded') === 'true') {
          closeMenu()
        }
      }
    }, 100)
  })
})()
