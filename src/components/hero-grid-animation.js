import { gsap } from '../index'

// Funktion, die die Animation ausführt
function startAnimation() {
  const cells = document.querySelectorAll('.hero_grid-right-side-grid .grid-cell')

  if (cells.length === 0) return

  const cellsArray = Array.from(cells)
  const sortedCells = cellsArray.sort((a, b) => {
    const aIndex = a.parentElement.rowIndex + a.cellIndex
    const bIndex = b.parentElement.rowIndex + b.cellIndex
    return aIndex - bIndex
  })

  // Media Query für Mobile
  const isMobile = window.matchMedia('(max-width: 449px)').matches

  // Unterschiedliche Animationen für Desktop und Mobile
  if (isMobile) {
    // Mobile Animation
    const baseDuration = 0.01
    const baseStagger = 0.15

    const duration = baseDuration * (10 / cells.length)
    const staggerEach = baseStagger * (10 / cells.length)

    const mobileTimeline = gsap.timeline({
      onComplete: () => {
        sortedCells.forEach((cell) => cell.style.removeProperty('border-color'))
      }
    })

    // Erste Animation für Mobile
    mobileTimeline.to(sortedCells, {
      duration,
      borderColor: 'var(--base-color-brand--mid-opacity-blue)',
      stagger: {
        each: staggerEach,
        grid: 'auto',
        from: 'start'
      },
      ease: 'power2.inOut'
    })

    // Zweite Animation für Mobile
    mobileTimeline.to(
      sortedCells,
      {
        duration,
        borderColor: 'var(--border-color--border-grid)',
        stagger: {
          each: staggerEach,
          grid: 'auto',
          from: 'start'
        },
        ease: 'power2.inOut'
      },
      '+=0.05'
    )
  } else {
    // Desktop Animation
    const desktopTimeline = gsap.timeline({
      onComplete: () => {
        sortedCells.forEach((cell) => cell.style.removeProperty('border-color'))
      }
    })

    // Erste Animation für Desktop
    desktopTimeline.to(sortedCells, {
      duration: 0.07,
      borderColor: 'var(--base-color-brand--mid-opacity-blue)',
      stagger: {
        each: 0.08,
        grid: 'auto',
        from: 'start'
      },
      ease: 'power2.inOut'
    })

    // Zweite Animation für Desktop
    desktopTimeline.to(
      sortedCells,
      {
        duration: 0.1,
        borderColor: 'var(--border-color--border-grid)',
        stagger: {
          each: 0.1,
          grid: 'auto',
          from: 'start'
        },
        ease: 'power2.inOut'
      },
      '+=0.01'
    )
  }
}

// Animation starten, nachdem die Seite vollständig geladen ist
window.addEventListener('load', () => {
  setTimeout(startAnimation, 500)
})
