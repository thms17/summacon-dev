import { gsap } from '../index' // ScrollTrigger wird hier nicht verwendet und daher entfernt

// Funktion zum Anzeigen und Verstecken des Scroll-to-Top Buttons
const initScrollToTopButton = () => {
  const scrollToTopBtn = document.querySelector('.scroll-to-top-button')

  // Sicherstellen, dass das Element existiert
  if (!scrollToTopBtn) {
    console.error('Scroll-to-Top Button nicht gefunden!')
    return
  }

  // Setze die Initialposition des Buttons
  gsap.set(scrollToTopBtn, { bottom: '-2rem', opacity: 0 })

  // Berechne die Schwellenwerte
  const thresholdTop = window.innerHeight * 1.1 // 110% der Fensterhöhe
  const thresholdBottom = () =>
    document.documentElement.scrollHeight - window.innerHeight - window.innerHeight * 0.3 // 30% vor Ende der Seite

  // Funktion, um den Button anzuzeigen oder auszublenden
  const handleScroll = () => {
    const currentScroll = window.scrollY

    if (currentScroll > thresholdTop && currentScroll < thresholdBottom()) {
      // Zeige den Button an
      gsap.to(scrollToTopBtn, {
        bottom: '1.5rem',
        opacity: 1,
        duration: 0.2,
        ease: 'power2.out'
      })
    } else {
      // Verstecke den Button
      gsap.to(scrollToTopBtn, {
        bottom: '-2rem',
        opacity: 0,
        duration: 0.2,
        ease: 'power2.in'
      })
    }
  }

  // Scroll-Event hinzufügen
  window.addEventListener('scroll', handleScroll)

  // Funktion, um beim Klick zum Seitenanfang zu scrollen
  scrollToTopBtn.addEventListener('click', (e) => {
    e.preventDefault()
    gsap.to(window, { scrollTo: { y: 0 }, duration: 0.5, ease: 'power2.out' })
  })
}

// Starte die Funktion
initScrollToTopButton()
