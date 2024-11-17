import { gsap, ScrollTrigger } from '../index'

gsap.registerPlugin(ScrollTrigger)

// Das Element mit dem Attribut 'animate=circle-rolling' auswählen
const circleRollingElement = document.querySelector('[animate="circle-rolling"]')

if (window.innerWidth > 990) {
  if (circleRollingElement) {
    // Setze das Element initial 80% nach links von seiner ursprünglichen Position
    gsap.set(circleRollingElement, {
      x: '-80%' // Initiale Verschiebung um 80% nach links
    })

    // Erstelle die ScrollTrigger-Animation
    gsap.to(circleRollingElement, {
      x: '0%', // Zurück zur ursprünglichen Position
      duration: 1,
      ease: 'bounce.out', // Bouncy Ease
      scrollTrigger: {
        trigger: circleRollingElement,
        start: 'top 80%', // Startet, wenn das Element 80% des Viewports erreicht hat
        toggleActions: 'play none none none' // Spielt die Animation nur ab
      }
    })
  }
}

// Alle Elemente mit dem Attribut 'animate=arrow-move' auswählen
const arrowMoveElements = document.querySelectorAll('[animate="arrow-move"]')

arrowMoveElements.forEach((element) => {
  // Setze das Element initial 50% nach unten und 50% nach links von seiner ursprünglichen Position und auf autoAlpha 0
  gsap.set(element, {
    x: '-50%', // Verschiebung um 50% nach links
    y: '50%', // Verschiebung um 50% nach unten
    autoAlpha: 0 // Unsichtbar setzen
  })

  // Erstelle die ScrollTrigger-Animation
  gsap.to(element, {
    x: '0%', // Zurück zur ursprünglichen horizontalen Position
    y: '0%', // Zurück zur ursprünglichen vertikalen Position
    autoAlpha: 1, // Sichtbar machen
    duration: 1.2,
    ease: 'power4.out', // Stärkeres Ease zum Ende hin
    scrollTrigger: {
      trigger: element,
      start: 'top 80%', // Startet, wenn das Element 20% des Viewports erreicht hat
      toggleActions: 'play none none none' // Spielt die Animation nur ab
    }
  })
})

// Das Element mit dem Attribut 'animate=triangle-move' auswählen
const triangleMoveElement = document.querySelector('[animate="triangle-move"]')

if (triangleMoveElement) {
  // Setze das Element initial auf eine Drehung von -90 Grad
  gsap.set(triangleMoveElement, {
    rotation: -90 // Drehe um 90 Grad gegen den Uhrzeigersinn
  })

  // Erstelle die ScrollTrigger-Animation für die Drehung
  gsap.to(triangleMoveElement, {
    rotation: 0, // Zurück zur ursprünglichen Position (0 Grad)
    ease: 'none', // Keine zusätzliche Beschleunigung, scrollt gleichmäßig
    scrollTrigger: {
      trigger: triangleMoveElement,
      start: 'top 75%', // Startet, wenn das Element 25% des Viewports erreicht hat
      end: 'top 20%', // Endet, wenn das Element 80% des Viewports erreicht hat
      scrub: true // Verknüpft die Animation mit dem Scrollen
    }
  })
}
