const players = new Map();
const placeholders = document.querySelectorAll('[video-component="placeholder"]');
const videoContainers = Array.from(document.querySelectorAll('[video-component="container"]'));

// Lade alle Videos sofort
loadAllVideos(videoContainers, players);

document.querySelectorAll('[video-component="load-video"]').forEach(function (button) {
  button.addEventListener('click', function () {
    localStorage.setItem('showVideos', true);
    const videoContainer = button.closest('[video-component="container"]');
    const index = videoContainers.indexOf(videoContainer);

    // Entferne den Placeholder und starte das Video direkt
    const placeholder = videoContainer.querySelector('[video-component="placeholder"]');
    if (placeholder) placeholder.style.display = 'none';

    playVideo(players, index);
  });

  button.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
      localStorage.setItem('showVideos', true);
      const videoContainer = button.closest('[video-component="container"]');
      const index = videoContainers.indexOf(videoContainer);

      // Entferne den Placeholder und starte das Video direkt
      const placeholder = videoContainer.querySelector('[video-component="placeholder"]');
      if (placeholder) placeholder.style.display = 'none';

      playVideo(players, index);
    }
  });
});

function loadAllVideos(videoContainers, players) {
  videoContainers.forEach(function (container, index) {
    loadVideo(container, players, index);
  });
}

function loadVideo(videoContainer, players, index) {
  const videoPlayer = videoContainer.querySelector('[video-component="player"]');
  if (videoPlayer && videoPlayer.hasAttribute('data-plyr-provider')) {
    const provider = videoPlayer.getAttribute('data-plyr-provider');
    const embedId = videoPlayer.getAttribute('data-plyr-embed-id');
    const player = new Plyr(videoPlayer, {
      controls: ['play-large', 'play', 'progress', 'current-time', 'volume', 'fullscreen'],
      youtube: {
        noCookie: true,
        rel: 0,
        showinfo: 0,
        iv_load_policy: 3,
        modestbranding: 1,
      },
    });

    player.source = {
      type: 'video',
      sources: [
        {
          src: embedId,
          provider: provider,
        },
      ],
    };

    players.set(index, player);
  } else if (videoPlayer) {
    const player = new Plyr(videoPlayer, {
      controls: ['play-large', 'play', 'progress', 'current-time', 'volume', 'fullscreen'],
    });

    player.source = {
      type: 'video',
      sources: [
        {
          src: 'https://assets.summacon.de/video/SummaCon_V1.webm',
          type: 'video/webm',
        },
      ],
    };

    players.set(index, player);
  }
}

function playVideo(players, index) {
  const player = players.get(index);
  if (player) {
    player.play(); // Starte das Video sofort
  }
}
