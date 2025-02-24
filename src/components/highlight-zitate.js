import { gsap, ScrollTrigger } from '../index'

gsap.registerPlugin(ScrollTrigger)

// Prüfen, ob prefers-reduced-motion aktiv ist
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

function initHighlightZitate() {
  if (prefersReducedMotion) return // Falls reduziert, keine Animationen starten

  // Das Element mit dem Attribut 'animate=circle-rolling' auswählen
  const circleRollingElement = document.querySelector('[animate="circle-rolling"]')

  if (window.innerWidth > 990) {
    if (circleRollingElement) {
      gsap.set(circleRollingElement, {
        x: '-80%' // Initiale Verschiebung um 80% nach links
      })

      gsap.to(circleRollingElement, {
        x: '0%',
        duration: 1,
        ease: 'bounce.out',
        scrollTrigger: {
          trigger: circleRollingElement,
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      })
    }
  }

  // Alle Elemente mit dem Attribut 'animate=arrow-move' auswählen
  const arrowMoveElements = document.querySelectorAll('[animate="arrow-move"]')

  arrowMoveElements.forEach((element) => {
    gsap.set(element, {
      x: '-50%',
      y: '50%',
      autoAlpha: 0
    })

    gsap.to(element, {
      x: '0%',
      y: '0%',
      autoAlpha: 1,
      duration: 1.2,
      ease: 'power4.out',
      scrollTrigger: {
        trigger: element,
        start: 'top 80%',
        toggleActions: 'play none none none'
      }
    })
  })

  // Das Element mit dem Attribut 'animate=triangle-move' auswählen
  const triangleMoveElement = document.querySelector('[animate="triangle-move"]')

  if (triangleMoveElement) {
    gsap.set(triangleMoveElement, {
      rotation: -90
    })

    gsap.to(triangleMoveElement, {
      rotation: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: triangleMoveElement,
        start: 'top 75%',
        end: 'top 20%',
        scrub: true
      }
    })
  }
}

// **Starte die Animationen nur, wenn keine reduzierte Bewegung aktiviert ist**
initHighlightZitate()
