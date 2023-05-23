import Swiper from '../../vendor/swiper-bundle';
import debounce from '../../utils/debounce';


const swipers = document.querySelectorAll('.swiper'); // коллекция нодов свайперов
const coachSlides = document.querySelector('.swiper--coach').querySelectorAll('.swiper__slide'); // слайды с тренерами
const feedbackSlides = document.querySelector('.swiper--feedback').querySelectorAll('.swiper__slide'); // слайды с тренерами
const coachScrollables = getScrollables(coachSlides, 12);
const feedbackScrollables = getScrollables(feedbackSlides, 21);
resetTabindex(coachScrollables);
resetTabindex(feedbackScrollables);

const DEBOUCE_DELAY = 500;
const TRANSITION_DURATION = 400;
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
  speed: TRANSITION_DURATION,
  grabCursor: true,
  preventInteractionOnTransition: true,
};

// настройки свайпера тренеров
const COACHSETTINGS = {
  slidesPerView: getSlidesNumber(CoachSlidesPerView),
  loop: getSwiperContinious(CoachSlidesPerView),
  updateOnWindowResize: true,
  watchSlidesProgress: true, // предотвращает переключение сладов при табах
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
  autoHeight: true,
  effect: 'creative',
  creativeEffect: {
    prev: {translate: [0, 0, -400]},
    next: {translate: ['125%', 0, 0]},
  },
  navigation: {
    prevEl: '.swiper__button--prev',
    nextEl: '.swiper__button--next',
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

// получение элементов со скроллом
function getScrollables(collection, diff) {
  const output = [];
  Array
      .from(collection)
      .forEach((item, i) => {
        output[i] = null;
        const inner = Array.from(item.querySelectorAll('div, p'));
        inner.forEach((el) => {
          if (el.scrollHeight - el.clientHeight > diff) {
            output[i] = el;
          }
        });
      });
  return output;
}

// сброс табиндекса на скроллах
function resetTabindex(nodes) {
  nodes.forEach((el) => {
    if (el) {
      el.tabIndex = '-1';
    }
  });
}

// установка табиндексов
function setTabIndex(slides, scrolls) {

  const slidesArray = Array.from(slides); // массив сладйов
  slidesArray.forEach((slide, index) => {
    const card = slide.querySelector('div'); // установка табиндекса для карточек в видимых слайдах
    card.tabIndex = '-1'; // сброс табиндекса

    if (slide.classList.contains('swiper-slide-visible')) {
      card.tabIndex = '0';
      if (scrolls[index]) {
        scrolls[index].tabIndex = '0';
      }
    }
  });
}


export const initSwipers = () => {

  const set = getParameters(); // массив с параметрами
  const swipersArray = [];
  if (swipers.length) {
    // создание свайперов, при наличии подходящих нодов
    swipers.forEach((item, index) => {
      swipersArray[index] = new Swiper(`.${item.classList[2]}`, set[index]);
    });

    const coachSwiper = swipersArray[0];
    const feedbackSwiper = swipersArray[1];

    // перезагрузка свайпера с тренерами при изменении размеров вьюпорта (дебаунс на 0,5 секунды)
    window.addEventListener('resize', debounce(() => {
      coachSwiper.params.slidesPerView = getSlidesNumber(CoachSlidesPerView);
      coachSwiper.update();
    }, DEBOUCE_DELAY));


    setTabIndex(coachSlides, coachScrollables);
    setTabIndex(feedbackSwiper, feedbackScrollables);
    coachSwiper.on('slideChange', () => setTimeout(() => setTabIndex(coachSlides, coachScrollables), TRANSITION_DURATION));
    feedbackSwiper.on('slideChange', () => setTimeout(() => setTabIndex(feedbackSlides, feedbackScrollables), TRANSITION_DURATION));
  }
};
