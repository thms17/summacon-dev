import { gsap } from 'gsap'

let navbarInitialized = false // Verhindert mehrfaches Ausführen
let menuOpen = false

const component = document.querySelector('[navbar="component"]')
const overlay = document.querySelector('.nav-overlay')
const menuTrigger = document.querySelector('[navbar="dropdown-trigger"]')
const topLine = document.querySelector('.line.top')
const middleLine = document.querySelector('.line.middle')
const bottomLine = document.querySelector('.line.bottom')
const mobileTrigger = component.querySelector('[navbar="dropdown-trigger"]')
const dropdownPanel = component.querySelector('[navbar="dropdown-panel"]')
const dropdownItems = component.querySelectorAll('.nav_menu_link')

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

        navMobileOpenAnim.to(dropdownPanel, {
          visibility: 'visible',
          height: 'auto',
          duration: 1,
          ease: 'power3.inOut'
        })
        navMobileOpenAnim.fromTo(
          dropdownItems,
          {
            autoAlpha: 0,
            y: '1rem'
          },
          {
            autoAlpha: 1,
            y: '0rem',
            duration: 0.2,
            ease: 'power3.inOut',
            stagger: 0.1
          },
          '<50%'
        )

        function navbarState(value) {
          if (value === 'open') {
            mobileTrigger.setAttribute('aria-expanded', true)
            mobileTrigger.setAttribute('aria-label', 'Menü schließen') // Ändert Aria-Label
            component.classList.add('nav-mobile-open')
            document.body.style.overflow = 'hidden'
            document.body.classList.add('no-select') // Deaktiviert Textauswahl
            gsap.to(overlay, { autoAlpha: 1, duration: 0.3, ease: 'power2.out' })
            menuOpen = true
          } else {
            mobileTrigger.setAttribute('aria-expanded', false)
            mobileTrigger.setAttribute('aria-label', 'Menü öffnen') // Ändert Aria-Label
            component.classList.remove('nav-mobile-open')
            document.body.style.overflow = 'visible'
            document.body.classList.remove('no-select') // Aktiviert Textauswahl wieder
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

        mobileTrigger.addEventListener('click', function () {
          playStateMobileAnim()
        })

        mobileTrigger.addEventListener('keydown', function (event) {
          if (event.key === 'Enter' || event.key === ' ') {
            playStateMobileAnim()
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
    document.body.classList.add('no-select') // Deaktiviert Textauswahl
    menuOpen = true
    menuTrigger.setAttribute('aria-label', 'Menü schließen') // Ändert Aria-Label
  } else {
    closeMenu()
  }
}

function closeMenu() {
  const closeTimeline = gsap.timeline({
    onComplete: () => {
      dropdownPanel.style.visibility = 'hidden'
      dropdownPanel.style.height = 'auto'
    }
  })

  closeTimeline.to(overlay, {
    autoAlpha: 0,
    duration: 0.3,
    ease: 'power2.out'
  })

  closeTimeline.to(
    dropdownItems,
    {
      autoAlpha: 0,
      y: '-1rem',
      duration: 0.2,
      ease: 'power3.inOut',
      stagger: -0.2
    },
    0
  )

  closeTimeline.to(
    dropdownPanel,
    {
      height: 0,
      duration: 0.7,
      ease: 'power2.inOut'
    },
    0
  )

  closeTimeline.to(topLine, { rotation: 0, y: -6, duration: 0.3, ease: 'power2.out' }, 0)
  closeTimeline.to(middleLine, { autoAlpha: 1, duration: 0.3, ease: 'power1.out' }, 0)
  closeTimeline.to(bottomLine, { rotation: 0, y: 6, duration: 0.3, ease: 'power2.out' }, 0)

  component.classList.remove('nav-mobile-open')
  document.body.style.overflow = 'visible'
  document.body.classList.remove('no-select') // Aktiviert Textauswahl wieder
  menuOpen = false
  menuTrigger.setAttribute('aria-label', 'Menü öffnen') // Ändert Aria-Label
}

menuTrigger.addEventListener('click', toggleMenu)

initNavbar()
