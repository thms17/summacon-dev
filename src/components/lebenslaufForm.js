import { gsap } from 'gsap'

// Elemente auswählen
const button = document.querySelector('[lebenslauf-button]')
const formWrapper = document.querySelector('[lebenslauf-form-wrapper]')

// Funktion zum Finden fokussierbarer Kinder
function getFocusableElements(container) {
  return container.querySelectorAll(
    'input, textarea, button, select, a[href], [tabindex]:not([tabindex="-1"])'
  )
}

// Funktion zum Steuern des tabindex
function setTabindex(container, hidden) {
  const focusableElements = getFocusableElements(container)
  focusableElements.forEach((el) => {
    if (hidden) {
      el.setAttribute('tabindex', '-1') // Fokussierbarkeit entfernen
    } else {
      el.setAttribute('tabindex', '0') // Fokussierbarkeit wiederherstellen
    }
  })
}

// tabindex bei Pageload entfernen
if (formWrapper) {
  setTabindex(formWrapper, true) // Standard: Fokussierbarkeit deaktiviert
}

// Prüfen, ob alle erforderlichen Elemente vorhanden sind
if (button && formWrapper) {
  button.addEventListener('click', () => {
    const isOpen = formWrapper.getAttribute('data-open') === 'true'

    if (isOpen) {
      // Bevor das Formular geschlossen wird, Fokus vom Input entfernen
      button.focus() // Fokus auf den Button legen

      // Schließen des Formulars
      gsap.to(formWrapper, {
        height: 0,
        duration: 0.8,
        ease: 'power2.inOut',
        onComplete: () => {
          formWrapper.setAttribute('data-open', 'false')
          button.setAttribute('aria-expanded', 'false') // Button zeigt geschlossen
          setTabindex(formWrapper, true) // tabindex entfernen
        }
      })
    } else {
      // Öffnen des Formulars
      const autoHeight = formWrapper.scrollHeight // Höhe des Inhalts berechnen
      formWrapper.style.height = '0px' // Sicherstellen, dass wir bei 0 starten
      gsap.to(formWrapper, {
        height: autoHeight,
        duration: 0.5,
        ease: 'power2.inOut',
        onComplete: () => {
          formWrapper.style.height = 'auto' // Nach der Animation auf auto setzen
          formWrapper.setAttribute('data-open', 'true')
          button.setAttribute('aria-expanded', 'true') // Button zeigt geöffnet
          setTabindex(formWrapper, false) // tabindex wiederherstellen
        }
      })
    }
  })
}
