import { gsap, ScrollTrigger } from '../index.js'

gsap.registerPlugin(ScrollTrigger)

// Prüfen, ob prefers-reduced-motion aktiv ist
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

function initMoveUpGsap() {
  if (prefersReducedMotion) return // Falls reduziert, keine Animationen starten

  const mm = gsap.matchMedia()

  // Initialisiere die Animationen nur auf Bildschirmen ab 992px
  mm.add('(min-width: 992px)', () => {
    function initMoveUp() {
      const moveUpElements = document.querySelectorAll('[move-up]')
      if (!moveUpElements.length) return
      moveUpElements.forEach((element) => {
        gsap.fromTo(
          element,
          { autoAlpha: 0, y: 20 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.7,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: element,
              start: 'top 90%',
              toggleActions: 'play none none none'
            }
          }
        )
      })
    }

    function initMoveUpSlow() {
      const moveUpSlowElements = document.querySelectorAll('[move-up-slow]')
      if (!moveUpSlowElements.length) return
      moveUpSlowElements.forEach((element) => {
        gsap.fromTo(
          element,
          { autoAlpha: 0, y: 20 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 1.7,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: element,
              start: 'top 90%',
              toggleActions: 'play none none none'
            }
          }
        )
      })
    }

    function initMoveUpStagger() {
      const staggerContainers = document.querySelectorAll('[move-up-stagger]')
      if (!staggerContainers.length) return
      staggerContainers.forEach((container) => {
        gsap.fromTo(
          Array.from(container.children),
          { autoAlpha: 0, y: 20 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.5,
            ease: 'power2.out',
            stagger: 0.2,
            scrollTrigger: {
              trigger: container,
              start: 'top 90%',
              toggleActions: 'play none none none'
            }
          }
        )
      })
    }

    function initMoveRight() {
      const moveRightElements = document.querySelectorAll('[move-right]')
      if (!moveRightElements.length) return
      moveRightElements.forEach((element) => {
        gsap.fromTo(
          element,
          { autoAlpha: 0, x: -20 },
          {
            autoAlpha: 1,
            x: 0,
            duration: 0.7,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: element,
              start: 'top 90%',
              toggleActions: 'play none none none'
            },
            onComplete: () => {
              gsap.set(element, { opacity: 1 }) // Setzt die opacity dauerhaft auf 1 nach der Animation
            }
          }
        )
      })
    }

    // Initialisiere die Animationen
    initMoveUp()
    initMoveUpSlow()
    initMoveUpStagger()
    initMoveRight()

    // Rückgabefunktion, die alle ScrollTrigger entfernt, wenn die Breite unter 992px fällt
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  })
}

// Starte die Animationen nur, wenn keine reduzierte Bewegung aktiviert ist
initMoveUpGsap()
