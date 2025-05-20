import { gsap } from 'gsap'

let navbarInitialized = false // Verhindert mehrfaches Ausführen
let menuOpen = false

const component = document.querySelector('[navbar="component"]')
const overlay = document.querySelector('.nav-overlay')
const menuTrigger = document.querySelector('[navbar="dropdown-trigger"]')
const topLine = document.querySelector('.line.top')
const middleLine = document.querySelector('.line.middle')
const bottomLine = document.querySelector('.line.bottom')
const dropdownPanel = component?.querySelector('[navbar="dropdown-panel"]')
const dropdownItems = component?.querySelectorAll('[navbar="item"]') // Auswahl der Dropdown-Elemente

const mm = gsap.matchMedia()
const breakpoint = 992

function initNavbar() {
  if (navbarInitialized) return // Funktion nur einmal ausführen
  navbarInitialized = true

  if (!component || !overlay) return // Sicherstellen, dass alle erforderlichen Elemente vorhanden sind

  mm.add(
    {
      isDesktop: `(min-width: ${breakpoint}px)`,
      isMobile: `(max-width: ${breakpoint - 1}px)`
    },
    (context) => {
      const { isMobile } = context.conditions

      if (isMobile) {
        const navMobileOpenAnim = gsap.timeline({
          paused: true,
          reversed: true,
          onReverseComplete: () => {
            navbarState('closed')
          }
        })

        navMobileOpenAnim
          .set(dropdownPanel, { visibility: 'visible' })
          .to(dropdownPanel, {
            height: 'auto',
            duration: 1,
            ease: 'power3.inOut'
          })
          .fromTo(
            dropdownItems,
            { autoAlpha: 0, y: '1rem' },
            { autoAlpha: 1, y: '0rem', duration: 0.1, stagger: 0.07, ease: 'power1.Out' },
            '<50%'
          )

        function navbarState(value) {
          if (value === 'open') {
            menuTrigger.setAttribute('aria-expanded', true)
            menuTrigger.setAttribute('aria-label', 'Menü schließen')
            component.classList.add('nav-mobile-open')
            document.body.style.overflow = 'hidden'
            document.body.classList.add('no-select')
            gsap.to(overlay, { autoAlpha: 1, duration: 0.3, ease: 'power2.out' })
            menuOpen = true
          } else {
            menuTrigger.setAttribute('aria-expanded', false)
            menuTrigger.setAttribute('aria-label', 'Menü öffnen')
            component.classList.remove('nav-mobile-open')
            document.body.style.overflow = 'visible'
            document.body.classList.remove('no-select')
            gsap.to(overlay, { autoAlpha: 0, duration: 0.3, ease: 'power2.out' })
            menuOpen = false
          }
        }

        function playStateMobileAnim() {
          if (navMobileOpenAnim.reversed()) {
            navMobileOpenAnim.play()
            navbarState('open')
          } else {
            navMobileOpenAnim.reverse()
            navbarState('closed')
          }
        }

        menuTrigger.addEventListener('click', playStateMobileAnim)

        menuTrigger.addEventListener('keydown', (event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault()
            toggleMenu()
            playStateMobileAnim()
          }
        })

        document.addEventListener('keydown', (event) => {
          if (event.key === 'Escape' && menuOpen) {
            toggleMenu()
            navMobileOpenAnim.reverse()
          }
        })

        document.addEventListener('click', (event) => {
          if (menuOpen && !component.contains(event.target) && event.target !== menuTrigger) {
            toggleMenu()
            navMobileOpenAnim.reverse()
          }
        })
      }
    }
  )
}

function toggleMenu() {
  if (!menuOpen) {
    dropdownPanel.style.visibility = 'visible'
    gsap.to(overlay, { autoAlpha: 1, duration: 0.3, ease: 'power2.out' })
    gsap.to(topLine, { rotation: 45, y: 0, duration: 0.3, ease: 'power2.out' })
    gsap.to(middleLine, { autoAlpha: 0, duration: 0.3, ease: 'power4.out' })
    gsap.to(bottomLine, { rotation: -45, y: 0, duration: 0.3, ease: 'power2.out' })
    gsap.to(dropdownPanel, { opacity: 1, duration: 0.3, ease: 'power2.out' })
    document.body.classList.add('no-select')
    menuOpen = true
    menuTrigger.setAttribute('aria-label', 'Menü schließen')
  } else {
    closeMenu()
  }
}

function closeMenu() {
  const closeTimeline = gsap.timeline({
    onComplete: () => {
      dropdownPanel.style.visibility = 'hidden'
      dropdownPanel.style.maxHeight = 'none' // Entfernt die max-height-Beschränkung nach der Animation
    }
  })

  closeTimeline
    .to(overlay, {
      autoAlpha: 0,
      duration: 0.3,
      ease: 'power2.out'
    })
    .to(
      dropdownItems,
      {
        autoAlpha: 0,
        duration: 0.1,
        ease: 'power1.out',
        stagger: -0.1
      },
      0
    )
    .fromTo(
      dropdownPanel,
      { maxHeight: dropdownPanel.scrollHeight + 'px' }, // Startwert: aktuelle Scroll-Höhe
      {
        maxHeight: '0px', // Endwert: 0px
        duration: 0.7,
        ease: 'power2.inOut'
      },
      0
    )
    .to(
      topLine,
      {
        rotation: 0,
        y: -6,
        duration: 0.3,
        ease: 'power2.out'
      },
      0
    )
    .to(
      middleLine,
      {
        autoAlpha: 1,
        duration: 0.3,
        ease: 'power1.out'
      },
      0
    )
    .to(
      bottomLine,
      {
        rotation: 0,
        y: 6,
        duration: 0.3,
        ease: 'power2.out'
      },
      0
    )

  component.classList.remove('nav-mobile-open')
  document.body.style.overflow = 'visible'
  document.body.classList.remove('no-select')
  menuOpen = false
  menuTrigger.setAttribute('aria-label', 'Menü öffnen')
}

menuTrigger.addEventListener('click', toggleMenu)

initNavbar()
