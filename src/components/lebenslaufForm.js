import { gsap } from 'gsap'

// Elemente auswählen
const button = document.querySelector('[lebenslauf-button]')
const formWrapper = document.querySelector('[lebenslauf-form-wrapper]')
const subjectField = document.querySelector('[betreff-field]')
const nameField = document.querySelector('[lebenslauf-name]')

// Skript nur ausführen, wenn alle Elemente vorhanden sind
if (button && formWrapper && subjectField && nameField) {
  button.addEventListener('click', () => {
    const isOpen = formWrapper.getAttribute('data-open') === 'true'

    if (isOpen) {
      // Schließen des Formulars
      gsap.to(formWrapper, {
        height: 0,
        duration: 0.5,
        ease: 'power2.inOut',
        onComplete: () => {
          formWrapper.setAttribute('data-open', 'false')
          formWrapper.setAttribute('aria-hidden', 'true') // Für Screenreader unsichtbar
          button.setAttribute('aria-expanded', 'false') // Button zeigt geschlossen
          button.focus() // Fokus zurück auf den Button setzen
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
          formWrapper.setAttribute('aria-hidden', 'false') // Für Screenreader sichtbar
          button.setAttribute('aria-expanded', 'true') // Button zeigt geöffnet

          // Betreff-Feld vorausfüllen
          subjectField.value = 'Anfrage ganzer Lebenslauf'

          // Fokus auf das Namensfeld legen
          nameField.focus()
        }
      })
    }
  })
}
