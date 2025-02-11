const players = new Map()
const videoContainers = Array.from(document.querySelectorAll('[video-component="container"]'))

// Lade alle Videos sofort
loadAllVideos(videoContainers, players)

// Event-Listener für Buttons hinzufügen
document.querySelectorAll('[video-component="load-video"]').forEach(function (button) {
  button.addEventListener('click', function () {
    localStorage.setItem('showVideos', true)
    const videoContainer = button.closest('[video-component="container"]')
    const index = videoContainers.indexOf(videoContainer)

    // Entferne den Placeholder und starte das Video
    const placeholder = videoContainer.querySelector('[video-component="placeholder"]')
    if (placeholder) placeholder.style.display = 'none'

    playVideo(players, index) // Video abspielen
  })

  button.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
      localStorage.setItem('showVideos', true)
      const videoContainer = button.closest('[video-component="container"]')
      const index = videoContainers.indexOf(videoContainer)

      // Entferne den Placeholder und starte das Video
      const placeholder = videoContainer.querySelector('[video-component="placeholder"]')
      if (placeholder) placeholder.style.display = 'none'

      playVideo(players, index) // Video abspielen
    }
  })
})

// Lade alle Videos
function loadAllVideos(videoContainers, players) {
  videoContainers.forEach(function (container, index) {
    loadVideo(container, players, index)
  })
}

// Lade ein einzelnes Video
function loadVideo(videoContainer, players, index) {
  const videoPlayer = videoContainer.querySelector('[video-component="player"]')

  if (videoPlayer) {
    // Setze die Videoquelle
    videoPlayer.src = 'https://assets.summacon.de/video/SummaCon_V1.webm'
    videoPlayer.type = 'video/webm'

    // Plyr-Player initialisieren
    const player = new Plyr(videoPlayer, {
      controls: ['play-large', 'play', 'progress', 'current-time', 'volume', 'fullscreen']
    })

    players.set(index, player)
  }
}

// Video abspielen
function playVideo(players, index) {
  const player = players.get(index)
  if (player) {
    player.play()
  }
}
