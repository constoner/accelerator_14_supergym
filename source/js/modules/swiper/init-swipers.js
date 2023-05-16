import Swiper from '../../vendor/swiper-bundle';
import debounce from '../../utils/debounce';


const swipers = document.querySelectorAll('.swiper'); // коллекция нодов свайперов
const coachSlides = document.querySelector('.swiper--coach').querySelectorAll('.swiper__slide'); // количество слайдов с тренерами

const CoachSlidesPerView = {
  MOBILE: 1,
  TABLET: 2,
  DESKTOP: 4,
};

// базовые настройки свайпера
const SWIPERSETTINGS = {
  wrapperClass: 'swiper__wrapper',
  slideClass: 'swiper__slide',
  direction: 'horizontal',
  grabCursor: true,
  preventInteractionOnTransition: true,
};

// настройки свайпера тренеров
const COACHSETTINGS = {
  slidesPerView: getSlidesNumber(CoachSlidesPerView),
  loop: getSwiperContinious(CoachSlidesPerView),
  updateOnWindowResize: true,
  breakpoints: {
    320: {spaceBetween: 20},
    768: {spaceBetween: 30},
    950: {spaceBetween: 60},
    1200: {spaceBetween: 15},
    1250: {spaceBetween: 30},
    1350: {spaceBetween: 40},
  },
  navigation: {
    prevEl: '.coach-swiper__button--prev',
    nextEl: '.coach-swiper__button--next',
  },
};

// настройки свайпера отзывов
const FEEDBACKSETTINGS = {
  slidesPerView: 1,
  spaceBetween: 100,
  effect: 'fade',
  fadeEffect: {
    crossFade: true,
  },
  navigation: {
    nextEl: '.swiper__button--next',
    prevEl: '.swiper__button--prev',
  },
};

// определение количества слайдов в зависимости от размеров экрана
function getSlidesNumber(settings) {
  const width = window.innerWidth;
  let SLIDESPERVIEW;
  if (width < 768) {
    SLIDESPERVIEW = settings.MOBILE;
  } else if (width < 1200) {
    SLIDESPERVIEW = settings.TABLET;
  } else {
    SLIDESPERVIEW = settings.DESKTOP;
  }
  return SLIDESPERVIEW;
}

// включекние бесконечной прокрутки при достаточном количестве слайдов
function getSwiperContinious(settings) {
  let isContinious = false;
  if (getSlidesNumber(settings) * 2 <= coachSlides.length) {
    isContinious = true;
  }
  return isContinious;
}

// объединение параметров свайперов
function getParameters() {
  return [Object.assign(Object.assign({}, SWIPERSETTINGS), COACHSETTINGS), Object.assign(Object.assign({}, SWIPERSETTINGS), FEEDBACKSETTINGS)];
}

export const initSwipers = () => {
  const set = getParameters(); // массив с параметрами
  const swipersArray = [];
  if (swipers.length) {
    // создание свайперов, при наличии подходящих нодов
    swipers.forEach((item, index) => {
      swipersArray[index] = new Swiper(`.${item.classList[2]}`, set[index]);
    });

    // перезагрузка свайпера с тренерами при изменении размеров вьюпорта (дебаунс на 0,5 секунды)
    window.addEventListener('resize', debounce(() => {
      swipersArray[0].params.slidesPerView = getSlidesNumber(CoachSlidesPerView);
      swipersArray[0].update();
    }, 500));
  }
};
