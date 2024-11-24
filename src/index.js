import 'swiper/css' // Core Swiper styles
import 'swiper/css/thumbs' // Styles for Thumbs module
import './styles/timeline-carousel.css'
import './styles/erfolge-cards.css'
import './styles/general.css'
import './styles/menu-hover.css'
import './styles/buttons-hover.css'
import './styles/nav.css'
import './styles/lebenslaufForm.css'
import './styles/languageSwitcher.css'

import Swiper from 'swiper'
import { Thumbs } from 'swiper/modules'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

import './components/swiper-timeline'
import './components/accordion'
import './components/erfolge-liste-numbering'
import './components/hero-grid-animation'
import './components/highlight-zitate'
import './components/scroll-to-top-button'
import './components/video'
import './components/nav'
import './components/gsap-text-animations'
import './components/move-up-gsap'
import './components/lebenslaufForm'

export { Swiper, Thumbs, gsap, ScrollTrigger, ScrollToPlugin }
