import Swiper from '../../vendor/swiper-bundle';

const SlidesPerView = {
  MOBILE: 1,
  TABLET: 2,
  DESKTOP: 4,
};

const slides = document.querySelectorAll('.swiper__slide');
const width = window.innerWidth;

let SLIDESPERVIEW;
if (width < 768) {
  SLIDESPERVIEW = SlidesPerView.MOBILE;
} else if (width < 1200) {
  SLIDESPERVIEW = SlidesPerView.TABLET;
} else {
  SLIDESPERVIEW = SlidesPerView.DESKTOP;
}
let isContinious = false;
if (SLIDESPERVIEW * 2 <= slides.length) {
  isContinious = true;
}

export const initSwipers = () => {

  const coachSwiper = new Swiper('.swiper--coach', {
    wrapperClass: 'swiper__wrapper',
    slideClass: 'swiper__slide',
    direction: 'horizontal',
    slidesPerView: SLIDESPERVIEW,
    loop: isContinious,
    grabCursor: true,
    preventInteractionOnTransition: true,

    breakpoints: {
      320: {
        spaceBetween: 20,
      },
      768: {
        spaceBetween: 30,
      },
      950: {
        spaceBetween: 60,
      },
      1200: {
        spaceBetween: 15,
      },
      1250: {
        spaceBetween: 30,
      },
      1350: {
        spaceBetween: 40,
      },
    },
    navigation: {
      nextEl: '.swiper__button--next',
      prevEl: '.swiper__button--prev',
    },
  });

  const feedbackSwiper = new Swiper('.swiper--feedback', {
    wrapperClass: 'swiper__wrapper',
    slideClass: 'swiper__slide',
    direction: 'horizontal',
    slidesPerView: 1,
    spaceBetween: 100,
    grabCursor: true,
    preventInteractionOnTransition: true,

    effect: 'creative',
    creativeEffect: {
      prev: {
        // will set `translateZ(-400px)` on previous slides
        translate: [0, 0, -400],
      },
      next: {
        // will set `translateX(100%)` on next slides
        translate: ['125%', 0, 0],
      },
    },

    navigation: {
      nextEl: '.swiper__button--next',
      prevEl: '.swiper__button--prev',
    },
  });

  return [coachSwiper, feedbackSwiper];
};
