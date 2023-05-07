const playButton = document.querySelector('[data-play-button]');
const videoCover = document.querySelector('[data-video-cover]');
const videoSRC = document.querySelector('#player').dataset.videoSrc;
const tag = document.createElement('script');
const firstScriptTag = document.getElementsByTagName('script')[0];

tag.src = 'https://www.youtube.com/iframe_api';
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

let player;
function onYouTubeIframeAPIReady() {
  // eslint-disable-next-line no-undef
  player = new YT.Player('player', {
    videoId: videoSRC,
    playerVars: {
      'playsinline': 1,
    },
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange,
    },
  });
}

function onPlayerReady() {
  playButton.addEventListener('click', () => {
    player.playVideo();
    videoCover.dataset.videoCoverIsshown = 'false';
    playButton.dataset.playButtonIsshown = 'false';
  });
}

function onPlayerStateChange(event) {
  // eslint-disable-next-line no-undef
  if (event.data === YT.PlayerState.ENDED) {
    pauseVideo();
  }
}

function pauseVideo() {
  videoCover.dataset.videoCoverIsshown = 'true';
  playButton.dataset.playButtonIsshown = 'true';
}

export {onYouTubeIframeAPIReady};
