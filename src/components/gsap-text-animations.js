import { gsap, ScrollTrigger } from '../index.js'

gsap.registerPlugin(ScrollTrigger)

// Prüfen, ob prefers-reduced-motion aktiv ist
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

function initGSAPAnimations() {
  if (prefersReducedMotion) return // Falls reduziert, keine Animation starten

  const mm = gsap.matchMedia()

  mm.add('(min-width: 992px)', () => {
    const heroWordsSlideUpElements = document.querySelectorAll('[hero-words-slide-up]')
    const wordsSlideUpElements = document.querySelectorAll('[words-slide-up]')
    const heroWordsSlideFromRightElements = document.querySelectorAll(
      '[hero-words-slide-from-right]'
    )
    const wordsSlideFromRightElements = document.querySelectorAll('[words-slide-from-right]')

    function applySplitTypeAndAnimate(elements, animationSettings) {
      elements.forEach((element) => {
        const splitInstance = new SplitType(element, { types: 'words', tagName: 'span' })

        gsap.fromTo(element.querySelectorAll('.word'), animationSettings.from, {
          ...animationSettings.to,
          scrollTrigger: {
            trigger: element,
            start: 'top 85%',
            toggleActions: 'play none none none',
            onLeave: () => splitInstance.revert(),
            onEnterBack: () => splitInstance.split()
          }
        })
      })
    }

    function createHeroTimeline() {
      if (heroWordsSlideUpElements.length > 0 || heroWordsSlideFromRightElements.length > 0) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: '[text-split]',
            start: 'top 80%',
            onEnter: () => tl.play(),
            onLeaveBack: () => tl.pause(0)
          }
        })

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
              onComplete: () => splitInstance.revert()
            }
          )
        }

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
              onComplete: () => splitInstance.revert()
            }
          )
        }

        const heroImageReveal = document.querySelector('[hero-image-reveal]')
        if (heroImageReveal) {
          tl.fromTo(
            heroImageReveal,
            { autoAlpha: 0, scale: 1.05 },
            { autoAlpha: 1, scale: 1, duration: 1, ease: 'power3.out' },
            '<'
          )
        }

        const buttonGroup = document.querySelector('[button-reveal]')
        if (buttonGroup) {
          tl.fromTo(
            Array.from(buttonGroup.children),
            { autoAlpha: 0, x: 30 },
            { autoAlpha: 1, x: 0, duration: 0.5, ease: 'power2.out', stagger: 0.15 },
            '-=0.3'
          )
        }

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

    function initWordsSlideUp() {
      applySplitTypeAndAnimate(wordsSlideUpElements, {
        from: { autoAlpha: 0, y: 20 },
        to: { autoAlpha: 1, y: 0, duration: 0.4, ease: 'power2.out', stagger: { amount: 0.2 } }
      })
    }

    function initWordsSlideFromRight() {
      applySplitTypeAndAnimate(wordsSlideFromRightElements, {
        from: { autoAlpha: 0, x: 20 },
        to: { autoAlpha: 1, x: 0, duration: 0.4, ease: 'power2.out', stagger: { amount: 0.2 } }
      })
    }

    if (document.querySelector('[text-split]')) {
      gsap.set('[text-split]', { opacity: 1 })
    }

    createHeroTimeline()
    initWordsSlideUp()
    initWordsSlideFromRight()

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  })
}

// Starte die Animationen, falls erlaubt
initGSAPAnimations()
