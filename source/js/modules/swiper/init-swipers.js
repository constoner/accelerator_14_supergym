import Swiper from '../../vendor/swiper';

export const initSwipers = () => {
  const swiperCoach = new Swiper('.swiper--coach', {
    direction: 'horizontal',
    loop: true,
    centeredSlides: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });

  const swiperReview = new Swiper('.swiper--coach', {
    direction: 'horizontal',
    loop: true,
    centeredSlides: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });

  return [swiperCoach, swiperReview];
};

