import Swiper from '../../vendor/swiper-bundle';

// const SWIPERS = ['swiper--coach', 'swiper--feedback'];

const CoachSlidesPerView = {
  MOBILE: 1,
  TABLET: 2,
  DESKTOP: 4,
};

const swipers = document.querySelectorAll('.swiper');
const coachSlides = document.querySelector('.swiper--coach').querySelectorAll('.swiper__slide');
const width = window.innerWidth;

// 1 настройки свайпера с карточками тренеров
// 1.1 - определение количества карточек в зависимости от размера экрана;

let SLIDESPERVIEW;
if (width < 768) {
  SLIDESPERVIEW = CoachSlidesPerView.MOBILE;
} else if (width < 1200) {
  SLIDESPERVIEW = CoachSlidesPerView.TABLET;
} else {
  SLIDESPERVIEW = CoachSlidesPerView.DESKTOP;
}

// 1.2 - включение бесконечной прокрутки при достаточном количестве карточек;
let isContinious = false;
if (SLIDESPERVIEW * 2 <= coachSlides.length) {
  isContinious = true;
}

let SWIPERSETTINGS = {
  wrapperClass: 'swiper__wrapper',
  slideClass: 'swiper__slide',
  direction: 'horizontal',
  grabCursor: true,
  preventInteractionOnTransition: true,
  navigation: {
    nextEl: '.swiper__button--next',
    prevEl: '.swiper__button--prev',
  },
};

const COACHSETTINGS = {
  slidesPerView: SLIDESPERVIEW,
  loop: isContinious,
  breakpoints: {
    320: {spaceBetween: 20},
    768: {spaceBetween: 30},
    950: {spaceBetween: 60},
    1200: {spaceBetween: 15},
    1250: {spaceBetween: 30},
    1350: {spaceBetween: 40},
  },
};

const FEEDBACKSETTINGS = {
  slidesPerView: 1,
  spaceBetween: 100,
  effect: 'creative',
  creativeEffect: {
    prev: {translate: [0, 0, -400]},
    next: {translate: ['125%', 0, 0]},
  },
};

// const TABLET = {
//   coach: {class: 'swiper--coach', settings: COACHSETTINGS},
//   feedback: {class: 'swiper--feedback', settings: FEEDBACKSETTINGS},
// };

// const findClassIndex = (element) => {
//   element.classList.findIndex((item) => item.includes('--coach'));
// };


export const initSwipers = () => {

  // const coachSwiper = new Swiper('.swiper--coach', {...SWIPERSETTINGS, ...COACHSETTINGS});
  // const feedbackSwiper = new Swiper('.swiper--feedback', {...SWIPERSETTINGS, ...FEEDBACKSETTINGS});

  // return [coachSwiper, feedbackSwiper];


  let swipersArray = [];
  if (swipers.length) {
    const set = [Object.assign(SWIPERSETTINGS, COACHSETTINGS), Object.assign(SWIPERSETTINGS, FEEDBACKSETTINGS)];
    swipers.forEach((item, index) => {
      swipersArray[index] = new Swiper(`.${item.classList[2]}`, set[index]);

    });
  }
  return swipersArray;
};

