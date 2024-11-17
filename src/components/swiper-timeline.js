import { A11y, gsap, Swiper, Thumbs } from '../index'

function assignBecameBlueClass(container) {
  // Sammle alle Elemente mit der Klasse 'swiper-slide' in einem Array
  const slides = Array.from(container.querySelectorAll('.swiper-slide'))

  // Finde das Element mit der Klasse 'swiper-slide-thumb-active'
  const activeSlideIndex = slides.findIndex((slide) =>
    slide.classList.contains('swiper-slide-thumb-active')
  )

  // Überprüfen, ob ein aktives Element vorhanden ist
  if (activeSlideIndex !== -1) {
    // Schleife über alle Slides
    for (let i = 0; i < slides.length; i++) {
      // Finde das Element mit der Klasse 'timeline-carousel_dotted-line grey'
      const greyLine = slides[i].querySelector(
        '.timeline-carousel_year-nav-slide .timeline-carousel_dotted-line-container .timeline-carousel_dotted-line.grey'
      )

      // Finde das Element mit der Klasse 'timeline-carousel_year-nav-slide-point'
      const navSlidePoint = slides[i].querySelector(
        '.timeline-carousel_year-nav-slide .timeline-carousel_year-nav-slide-point'
      )

      // Finde das Element mit der Klasse 'timeline-carousel_navigation-year-number'
      const yearNumber = slides[i].querySelector('.timeline-carousel_navigation-year-number')

      // Wenn das Element gefunden wurde, wende die Klassen an oder entferne sie
      if (greyLine) {
        if (i < activeSlideIndex) {
          greyLine.classList.add('became-blue')
        } else {
          greyLine.classList.remove('became-blue')
        }
      }

      if (navSlidePoint) {
        if (i < activeSlideIndex) {
          navSlidePoint.classList.add('background-light-blue')
        } else {
          navSlidePoint.classList.remove('background-light-blue')
        }
      }

      if (yearNumber) {
        if (i < activeSlideIndex) {
          yearNumber.classList.add('text-color-light-blue')
        } else {
          yearNumber.classList.remove('text-color-light-blue')
        }
      }
    }
  }
}

function initTimelineCarousel() {
  const attrPrefix = 'timeline-carousel'

  const component = document.querySelector(`[${attrPrefix}="component"]`)
  if (!component) return

  const carouselNavigationEl = component.querySelector(`[${attrPrefix}="navigation"]`)
  const carouselPanelsEl = component.querySelector(`[${attrPrefix}="panels"]`)

  const yearEls = carouselNavigationEl.querySelectorAll(`[${attrPrefix}="navigation-year"]`)
  const innerPrevButtonEls = carouselPanelsEl.querySelectorAll(`[${attrPrefix}="inner-prev"]`)
  const innerNextButtonEls = carouselPanelsEl.querySelectorAll(`[${attrPrefix}="inner-next"]`)

  const panelSlides = carouselPanelsEl.querySelectorAll('.swiper-slide')
  const slideElements = {
    contentLeft: Array.from(panelSlides).map((slide) =>
      slide.querySelector(`[${attrPrefix}="content-left"]`)
    ),
    contentRight: Array.from(panelSlides).map((slide) =>
      slide.querySelector(`[${attrPrefix}="content-right"]`)
    )
  }

  let currentIndex = 0

  const navigationCarousel = new Swiper(carouselNavigationEl, {
    slidesPerView: 'auto',
    freeMode: true
  })

  const panelCarousel = new Swiper(carouselPanelsEl, {
    modules: [Thumbs],
    speed: 0,
    thumbs: {
      swiper: navigationCarousel
    },
    on: {
      transitionStart: (carousel) => {
        animateOnTransitionStart(slideElements, carousel.activeIndex)
      },
      transitionEnd: (carousel) => {
        animateOnTransitionEnd(slideElements, carousel.activeIndex)
        // Zentriere das aktive Element nur auf Bildschirmen unter 768px
        if (window.innerWidth <= 767) {
          navigationCarousel.slideTo(carousel.activeIndex)
        }
      }
    }
  })

  function animateOnTransitionStart(slideElements, activeIndex) {
    slideElements.contentLeft.forEach((element, index) => {
      if (index !== activeIndex) {
        gsap.to(element, {
          xPercent: currentIndex < activeIndex ? -20 : 20,
          autoAlpha: 0
        })
      }
    })
    slideElements.contentRight.forEach((element, index) => {
      if (index !== activeIndex) {
        gsap.to(element, {
          xPercent: currentIndex < activeIndex ? -20 : 20,
          autoAlpha: 0
        })
      }
    })
  }

  function animateOnTransitionEnd(slideElements, activeIndex) {
    assignBecameBlueClass(carouselNavigationEl)
    gsap.fromTo(
      slideElements.contentLeft[activeIndex],
      {
        xPercent: currentIndex < activeIndex ? 30 : -30
      },
      {
        xPercent: 0,
        autoAlpha: 1
      }
    )
    gsap.fromTo(
      slideElements.contentRight[activeIndex],
      {
        xPercent: currentIndex < activeIndex ? 20 : -20
      },
      {
        xPercent: 0,
        autoAlpha: 1
      }
    )

    currentIndex = activeIndex
  }

  innerPrevButtonEls.forEach((button, index) => {
    if (yearEls[index - 1]) {
      button.ariaLabel = `Gehe zurück zu Jahr ${yearEls[index - 1].textContent}`
    }
    button.addEventListener('click', () => {
      panelCarousel.slideTo(index - 1)
    })
  })

  innerNextButtonEls.forEach((button, index) => {
    if (index + 1 < yearEls.length) {
      button.ariaLabel = `Gehe zu Jahr ${yearEls[index + 1].textContent}`
      button.addEventListener('click', () => {
        panelCarousel.slideTo(index + 1)
      })
    }
  })

  // Funktion für Media Query Einstellungen
  function updateSwiperSettings() {
    if (window.matchMedia('(max-width: 479px)').matches) {
      navigationCarousel.params.spaceBetween = 4
    } else {
      navigationCarousel.params.spaceBetween = 10
    }
    navigationCarousel.update()
  }

  // Event Listener für Bildschirmgrößenänderungen
  window.addEventListener('resize', updateSwiperSettings)
  updateSwiperSettings() // Initiales Update bei Seitenaufruf
}

initTimelineCarousel()
