const playButton = document.querySelector('[data-play-button]');
const videoCover = document.querySelector('[data-video-cover]');
const videoSRC = document.querySelector('#player').dataset.videoSrc;

export function initVideo() {
  // промис для асинхронной загрузки API
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

  // после загрузки промиса вызываем функцию создания плеера
  const promise = loadAPI();
  promise
      .then(onYouTubeIframeAPIReady)
      .catch((err) => console.error(`Ошибка: ${err.message}`)); // eslint-disable-line no-console

  // создание плеера
  let player;

  function onYouTubeIframeAPIReady() {
    // недокументированная функция API
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

  // активация кнопки воспроизведения после загрузки плеера
  function onPlayerReady() {
    playButton.addEventListener('click', () => {
      player.playVideo();
      videoCover.dataset.videoCoverIsshown = false;
      playButton.dataset.playButtonIsshown = false;
    });
  }

  // возвращшение обложки видео по его завершению
  function onPlayerStateChange(event) {
    // eslint-disable-next-line no-undef
    if (event.data === YT.PlayerState.ENDED) {
      videoCover.dataset.videoCoverIsshown = true;
      playButton.dataset.playButtonIsshown = true;
    }
  }
}
