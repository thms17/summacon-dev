const players = new Map()
const videoContainers = Array.from(document.querySelectorAll('[video-component="container"]'))

// Lade alle Videos sofort
loadAllVideos(videoContainers, players)

document.querySelectorAll('[video-component="load-video"]').forEach(function (button) {
  button.addEventListener('click', function () {
    localStorage.setItem('showVideos', true)
    const videoContainer = button.closest('[video-component="container"]')
    const index = videoContainers.indexOf(videoContainer)

    // Entferne den Placeholder und starte das Video
    const placeholder = videoContainer.querySelector('[video-component="placeholder"]')
    if (placeholder) placeholder.style.display = 'none'

    // Steuerelemente aktivieren
    setVideoControlsFocusable(videoContainer, true)

    playVideo(players, index)
  })

  button.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
      localStorage.setItem('showVideos', true)
      const videoContainer = button.closest('[video-component="container"]')
      const index = videoContainers.indexOf(videoContainer)

      // Entferne den Placeholder und starte das Video
      const placeholder = videoContainer.querySelector('[video-component="placeholder"]')
      if (placeholder) placeholder.style.display = 'none'

      // Steuerelemente aktivieren
      setVideoControlsFocusable(videoContainer, true)

      playVideo(players, index)
    }
  })
})

function loadAllVideos(videoContainers, players) {
  videoContainers.forEach(function (container, index) {
    loadVideo(container, players, index)
  })
}

function loadVideo(videoContainer, players, index) {
  const videoPlayer = videoContainer.querySelector('[video-component="player"]')

  if (videoPlayer) {
    videoPlayer.src = 'https://pub-55c1ed121ab0419d82c39cd62613c574.r2.dev/SummaCon_V1.webm'
    videoPlayer.type = 'video/webm'

    // **Plyr-Player initialisieren**
    const player = new Plyr(videoPlayer, {
      controls: [
        'play-large',
        'play',
        'progress',
        'current-time',
        'volume',
        'settings',
        'fullscreen'
      ],
      settings: ['captions'],
      captions: { active: false, language: 'de', update: false },
      i18n: { captions: 'Untertitel' }
    })

    // **Steuerelemente erst deaktivieren**
    setVideoControlsFocusable(videoContainer, false)

    // Falls notwendig, aktivieren, wenn das Video gestartet wird
    player.on('play', () => {
      setVideoControlsFocusable(videoContainer, true)
    })

    players.set(index, player)
  }
}

function playVideo(players, index) {
  const player = players.get(index)
  if (player) {
    player.play().catch(() => {})
  }
}

// **Funktion zum (De-)Aktivieren der Fokusierbarkeit**
function setVideoControlsFocusable(videoContainer, isFocusable) {
  const controls = videoContainer.querySelectorAll(
    '.plyr__controls button, .plyr__controls input, .plyr__controls a'
  )

  controls.forEach((control) => {
    if (isFocusable) {
      control.removeAttribute('tabindex')
    } else {
      control.setAttribute('tabindex', '-1')
    }
  })
}
