const playButton = document.querySelector('[data-play-button]');
const videoCover = document.querySelector('[data-video-cover]');
const videoSRC = document.querySelector('#player').dataset.videoSrc;

export function initVideo() {

  function loadAPI() {
    return new Promise(function (resolve, reject) {
      const tag = document.createElement('script');
      const firstScriptTag = document.getElementsByTagName('script')[0];
      tag.src = 'https://www.youtube.com/iframe_api';

      tag.onload = () => resolve(tag);
      tag.onerror = () => reject(new Error('Ошибка загрузки YouTube API'));

      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    });
  }

  const promise = loadAPI();
  promise
      .then(onYouTubeIframeAPIReady)
      .catch((err) => console.error(`Ошибка: ${err.message}`)); // eslint-disable-line no-console

  let player;

  function onYouTubeIframeAPIReady() {
    window.YT.ready(function () {
      // eslint-disable-next-line no-undef
      player = new YT.Player('player', {
        height: '100%',
        width: '100%',
        videoId: videoSRC,
        playerVars: {
          'playsinline': 1,
        },
        events: {
          'onReady': onPlayerReady,
          'onStateChange': onPlayerStateChange,
        },
      });
    });
  }

  function onPlayerReady() {
    playButton.addEventListener('click', () => {
      player.playVideo();
      videoCover.dataset.videoCoverIsshown = false;
      playButton.dataset.playButtonIsshown = false;
    });
  }

  function onPlayerStateChange(event) {
    // eslint-disable-next-line no-undef
    if (event.data === YT.PlayerState.ENDED) {
      endedVideo();
    }
  }

  function endedVideo() {
    videoCover.dataset.videoCoverIsshown = true;
    playButton.dataset.playButtonIsshown = true;
  }
}
