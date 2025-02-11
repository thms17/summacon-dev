import { gsap } from '../index'

function partnerAccordion() {
  const partnerElements = document.querySelectorAll('[partner-accordion="component"]')

  if (partnerElements.length === 0) return

  partnerElements.forEach(function (accordion) {
    const button = accordion.querySelector('[partner-accordion="trigger"]')
    const panel = accordion.querySelector('[partner-accordion="panel"]')
    const plusIcon = accordion.querySelector('[partner-accordion="plus-icon"]')
    const minusIcon = accordion.querySelector('[partner-accordion="minus-icon"]')
    const text = accordion.querySelector('[partner-accordion="text"]')
    const openText = button.querySelector('[partner-accordion="open-text"]')
    const closeText = button.querySelector('[partner-accordion="close-text"]')
    const links = panel.querySelectorAll('a, button, input, select, textarea') // Interaktive Elemente im Panel

    if (!button || !panel) return // Falls Button oder Panel fehlen, abbrechen

    // Initiale ARIA-Attribute setzen
    button.setAttribute('aria-expanded', 'false')
    panel.setAttribute('aria-hidden', 'true')

    // tabindex=-1 für interaktive Elemente setzen
    links.forEach((link) => link.setAttribute('tabindex', '-1'))

    button.addEventListener('click', function () {
      const isOpen = button.getAttribute('aria-expanded') === 'true' // Prüfen, ob geöffnet ist
      const duration = 0.1
      const ease = 'power2.inOut'

      if (!isOpen) {
        // Panel aufklappen
        button.setAttribute('aria-expanded', 'true')
        panel.setAttribute('aria-hidden', 'false')

        // Interaktive Elemente aktivieren
        links.forEach((link) => link.setAttribute('tabindex', '0'))

        gsap.fromTo(
          panel,
          {
            height: 0,
            autoAlpha: 0
          },
          {
            height: 'auto',
            autoAlpha: 1,
            duration,
            ease
          }
        )
        gsap.to(plusIcon, {
          rotation: 90,
          autoAlpha: 0,
          duration: 0.4,
          ease
        })
        gsap.to(minusIcon, {
          rotation: 0,
          autoAlpha: 1,
          duration: 0.4,
          ease
        })
        gsap.to(text, {
          y: '0%',
          scale: 1,
          duration,
          ease
        })
        gsap.to(openText, {
          y: '100%',
          rotation: 10,
          scale: 0.9,
          autoAlpha: 0,
          transformOrigin: 'left center',
          duration: 0.4,
          ease,
          onComplete: () => {
            openText.style.visibility = 'hidden'
            openText.style.position = 'absolute'
            closeText.style.position = 'relative'
          }
        })
        gsap.fromTo(
          closeText,
          {
            y: '-100%',
            rotation: -10,
            scale: 0.5,
            visibility: 'hidden'
          },
          {
            y: '0%',
            rotation: 0,
            scale: 1,
            visibility: 'visible',
            duration: 0.4,
            autoAlpha: 1,
            transformOrigin: 'left center',
            ease
          }
        )
      } else {
        // Panel einklappen
        button.setAttribute('aria-expanded', 'false')
        panel.setAttribute('aria-hidden', 'true')

        // Interaktive Elemente deaktivieren
        links.forEach((link) => link.setAttribute('tabindex', '-1'))

        gsap.to(panel, {
          height: 0,
          autoAlpha: 0,
          duration,
          ease
        })
        gsap.to(minusIcon, {
          rotation: -90,
          autoAlpha: 0,
          duration: 0.4,
          ease
        })
        gsap.to(plusIcon, {
          rotation: 0,
          autoAlpha: 1,
          duration: 0.4,
          ease
        })
        gsap.to(text, {
          y: '-10%',
          scale: 0.95,
          duration,
          ease
        })
        gsap.to(closeText, {
          y: '-100%',
          rotation: -10,
          scale: 0.5,
          autoAlpha: 0,
          transformOrigin: 'left center',
          duration: 0.4,
          ease,
          onComplete: () => {
            closeText.style.visibility = 'hidden'
            closeText.style.position = 'absolute'
            openText.style.position = 'relative'
          }
        })
        gsap.fromTo(
          openText,
          {
            y: '100%',
            rotation: 10,
            scale: 0.5,
            visibility: 'hidden'
          },
          {
            y: '0%',
            rotation: 0,
            scale: 1,
            visibility: 'visible',
            duration: 0.4,
            autoAlpha: 1,
            transformOrigin: 'left center',
            ease
          }
        )
      }
    })
  })
}

partnerAccordion()
