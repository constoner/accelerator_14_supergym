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

  const photoSwiper = new Swiper('.swiper', {
    wrapperClass: 'swiper__wrapper',
    slideClass: 'swiper__slide',
    direction: 'horizontal',
    slidesPerView: SLIDESPERVIEW,
    loop: isContinious,

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

  return photoSwiper;

  // const swiperReview = new Swiper('.swiper--coach', {
  //   direction: 'horizontal',
  //   loop: true,
  //   centeredSlides: true,
  //   navigation: {
  //     nextEl: '.swiper-button-next',
  //     prevEl: '.swiper-button-prev',
  //   },
  // });

  // return [swiperCoach, swiperReview];
};
