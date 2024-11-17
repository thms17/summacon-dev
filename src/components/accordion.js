import { gsap } from '../index';

function partnerAccordion() {
  const partnerElements = document.querySelectorAll('[partner-accordion="component"]');

  if (partnerElements.length === 0) return;

  partnerElements.forEach(function (accordion) {
    const button = accordion.querySelector('[partner-accordion="button"]');
    const panel = accordion.querySelector('[partner-accordion="panel"]');
    const plusIcon = accordion.querySelector('[partner-accordion="plus-icon"]');
    const minusIcon = accordion.querySelector('[partner-accordion="minus-icon"]');
    const text = accordion.querySelector('[partner-accordion="text"]');
    const openText = button.querySelector('[partner-accordion="open-text"]');
    const closeText = button.querySelector('[partner-accordion="close-text"]');

    if (!button) return; // Falls kein Button vorhanden ist, abbrechen

    button.addEventListener('click', function () {
      const isOpen = gsap.getProperty(panel, 'height') > 0; // Prüfe, ob das Panel geöffnet ist

      const duration = 0.9;
      const ease = 'power2.inOut';

      if (!isOpen) {
        // Panel aufklappen
        gsap.fromTo(
          panel,
          {
            height: 0,
            autoAlpha: 0,
          },
          {
            height: 'auto',
            autoAlpha: 1,
            duration: duration,
            ease: ease,
          }
        );
        gsap.to(plusIcon, {
          rotation: 90,
          autoAlpha: 0,
          duration: 0.4,
          ease: ease,
        });
        gsap.to(minusIcon, {
          rotation: 0,
          autoAlpha: 1,
          duration: 0.4,
          ease: ease,
        });
        gsap.to(text, {
          y: '0%',
          scale: 1,
          duration: duration,
          ease: ease,
        });
        // Textwechsel Animation mit Rotation und Skalierung
        gsap.to(openText, {
          y: '100%', // Nach unten schieben
          rotation: 10, // Leichte Drehung im Uhrzeigersinn
          scale: 0.9,
          autoAlpha: 0,
          transformOrigin: 'left center', // Punkt um den sich der Text dreht
          duration: 0.4,
          ease: ease,
          onComplete: () => {
            openText.style.visibility = 'hidden'; // Nach der Animation verstecken
            openText.style.position = 'absolute'; // Position auf absolute setzen
            closeText.style.position = 'relative'; // Sichbarer Text auf relative setzen
          },
        });
        gsap.fromTo(
          closeText,
          {
            y: '-100%', // Startpunkt über dem Button
            rotation: -10, // Leichte Drehung gegen den Uhrzeigersinn
            scale: 0.5, // Startgröße
            visibility: 'hidden',
          },
          {
            y: '0%', // In die Sichtbarkeit fahren
            rotation: 0, // Zurück zur neutralen Position
            scale: 1, // Auf Originalgröße skalieren
            visibility: 'visible',
            duration: 0.4,
            autoAlpha: 1,
            transformOrigin: 'left center', // Punkt um den sich der Text dreht
            ease: ease,
          }
        );
      } else {
        // Panel einklappen
        gsap.to(panel, {
          height: 0,
          autoAlpha: 0,
          duration: duration,
          ease: ease,
        });
        gsap.to(minusIcon, {
          rotation: -90,
          autoAlpha: 0,
          duration: 0.4,
          ease: ease,
        });
        gsap.to(plusIcon, {
          rotation: 0,
          autoAlpha: 1,
          duration: 0.4,
          ease: ease,
        });
        gsap.to(text, {
          y: '-10%',
          scale: 0.95,
          duration: duration,
          ease: ease,
        });
        // Textwechsel zurück mit Rotation und Skalierung
        gsap.to(closeText, {
          y: '-100%', // Nach oben schieben
          rotation: -10, // Leichte Drehung gegen den Uhrzeigersinn
          scale: 0.5,
          autoAlpha: 0,
          transformOrigin: 'left center', // Punkt um den sich der Text dreht
          duration: 0.4,
          ease: ease,
          onComplete: () => {
            closeText.style.visibility = 'hidden'; // Nach der Animation verstecken
            closeText.style.position = 'absolute'; // Position auf absolute setzen
            openText.style.position = 'relative'; // Sichtbaren Text auf relative setzen
          },
        });
        gsap.fromTo(
          openText,
          {
            y: '100%', // Startpunkt unter dem Button
            rotation: 10, // Leichte Drehung im Uhrzeigersinn
            scale: 0.5, // Startgröße
            visibility: 'hidden',
          },
          {
            y: '0%', // In die Sichtbarkeit fahren
            rotation: 0, // Zurück zur neutralen Position
            scale: 1, // Auf Originalgröße skalieren
            visibility: 'visible',
            duration: 0.4,
            autoAlpha: 1,
            transformOrigin: 'left center', // Punkt um den sich der Text dreht
            ease: ease,
          }
        );
      }
    });
  });
}

partnerAccordion();
