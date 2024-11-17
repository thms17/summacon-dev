import { gsap, ScrollTrigger } from '../index.js'

gsap.registerPlugin(ScrollTrigger)

const mm = gsap.matchMedia()

// Initialisiere die Animationen nur auf Desktop-Bildschirmen ab 992px
mm.add('(min-width: 992px)', () => {
  // Überprüfe, ob alle erforderlichen Elemente für SplitType vorhanden sind
  const heroWordsSlideUpElements = document.querySelectorAll('[hero-words-slide-up]')
  const wordsSlideUpElements = document.querySelectorAll('[words-slide-up]')
  const heroWordsSlideFromRightElements = document.querySelectorAll('[hero-words-slide-from-right]')
  const wordsSlideFromRightElements = document.querySelectorAll('[words-slide-from-right]')

  // Funktion, um SplitType anzuwenden und die Spans nach der Animation zu entfernen
  function applySplitTypeAndAnimate(elements, animationSettings) {
    elements.forEach((element) => {
      // Erzeuge die SplitType-Instanz für das Element
      const splitInstance = new SplitType(element, { types: 'words', tagName: 'span' })

      // Erstelle die Animation
      gsap.fromTo(element.querySelectorAll('.word'), animationSettings.from, {
        ...animationSettings.to,
        scrollTrigger: {
          trigger: element,
          start: 'top 85%',
          toggleActions: 'play none none none',
          onLeave: () => splitInstance.revert(), // Entfernt Spans nach der Animation
          onEnterBack: () => splitInstance.split() // Wendet SplitType erneut an, falls zurückgescrollt wird
        }
      })
    })
  }

  // Funktion zur Erstellung der Timeline-Animation für die Hero-Sektion
  function createHeroTimeline() {
    if (heroWordsSlideUpElements.length > 0 || heroWordsSlideFromRightElements.length > 0) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '[text-split]', // Erstes Element, das die Timeline auslöst
          start: 'top 80%', // Startpunkt der Timeline
          onEnter: () => tl.play(), // Spielt die Timeline ab, wenn das Element in den Viewport scrollt
          onLeaveBack: () => tl.pause(0) // Setzt die Timeline zurück, wenn man zurückscrollt
        }
      })

      // Hero-spezifische Animation: hero-words-slide-up für das Header-Element
      if (heroWordsSlideUpElements.length > 0) {
        const splitInstance = new SplitType(heroWordsSlideUpElements, {
          types: 'words',
          tagName: 'span'
        })
        tl.fromTo(
          heroWordsSlideUpElements[0].querySelectorAll('.word'),
          { autoAlpha: 0, y: 30 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out',
            stagger: { amount: 0.5 },
            onComplete: () => splitInstance.revert() // Entfernt Spans nach der Animation
          }
        )
      }

      // Zweite Animation: hero-words-slide-from-right für die Paragraphen in der Hero-Sektion
      if (heroWordsSlideFromRightElements.length > 0) {
        const splitInstance = new SplitType(heroWordsSlideFromRightElements, {
          types: 'words',
          tagName: 'span'
        })
        tl.fromTo(
          heroWordsSlideFromRightElements[0].querySelectorAll('.word'),
          { autoAlpha: 0, x: 30 },
          {
            autoAlpha: 1,
            x: 0,
            duration: 0.6,
            ease: 'power2.out',
            stagger: { amount: 0.5 },
            onComplete: () => splitInstance.revert() // Entfernt Spans nach der Animation
          }
        )
      }

      // Hero-Bild: Zoom-out mit horizontaler Bewegung von rechts nach links, sanft endend
      const heroImageReveal = document.querySelector('[hero-image-reveal]')
      if (heroImageReveal) {
        tl.fromTo(
          heroImageReveal,
          { autoAlpha: 0, scale: 1.05 },
          { autoAlpha: 1, scale: 1, duration: 1, ease: 'power3.out' },
          '<' // Startet gleichzeitig mit der Paragraphen-Animation
        )
      }

      // Dritte Animation: Button-Gruppe, leicht gestaffelt von rechts
      const buttonGroup = document.querySelector('[button-reveal]')
      if (buttonGroup) {
        tl.fromTo(
          Array.from(buttonGroup.children),
          { autoAlpha: 0, x: 30 },
          { autoAlpha: 1, x: 0, duration: 0.5, ease: 'power2.out', stagger: 0.15 },
          '-=0.3'
        )
      }

      // Vierte Animation: Element mit hero-animation-reveal-later einblenden
      const heroAnimationRevealLater = document.querySelector('[hero-animation-reveal-later]')
      if (heroAnimationRevealLater) {
        tl.fromTo(
          heroAnimationRevealLater,
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: 0.5, ease: 'power1.out' }
        )
      }
    }
  }

  // Funktion zur Initialisierung der `words-slide-up`-Animation für wiederverwendbare Elemente außerhalb der Hero-Sektion
  function initWordsSlideUp() {
    applySplitTypeAndAnimate(wordsSlideUpElements, {
      from: { autoAlpha: 0, y: 20 },
      to: { autoAlpha: 1, y: 0, duration: 0.4, ease: 'power2.out', stagger: { amount: 0.2 } }
    })
  }

  // Funktion zur Initialisierung der `words-slide-from-right`-Animation für wiederverwendbare Elemente außerhalb der Hero-Sektion
  function initWordsSlideFromRight() {
    applySplitTypeAndAnimate(wordsSlideFromRightElements, {
      from: { autoAlpha: 0, x: 20 },
      to: { autoAlpha: 1, x: 0, duration: 0.4, ease: 'power2.out', stagger: { amount: 0.2 } }
    })
  }

  // Verhindert, dass Inhalte vor der Animation sichtbar sind
  if (document.querySelector('[text-split]')) {
    gsap.set('[text-split]', { opacity: 1 })
  }
  // if (document.querySelector('[hero-animation-reveal-later]')) {
  //   gsap.set('[hero-animation-reveal-later]', { opacity: 0 });
  // }

  // Initialisiere die Hero-Timeline und die anderen Animationen
  createHeroTimeline()
  initWordsSlideUp()
  initWordsSlideFromRight()

  // Rückgabefunktion, die bei Verkleinerung des Bildschirms (z. B. unter 992px) ausgeführt wird
  return () => {
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
  }
})
