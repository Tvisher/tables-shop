'use strict';
import * as baseFunction from './modules/functions.js';
import './vendors/vendors.js';
import Swiper, {
    Navigation,
    Pagination,
} from 'swiper';



// Проверка поддержки webP
baseFunction.testWebP();

//получаем ширину полоски скрола
const scrollLineWigth = baseFunction.scrollbarWidth();

// Маска для инпутов с номером телефона
const phoneInputs = document.querySelectorAll('input[type=tel]');
if (phoneInputs) {
    phoneInputs.forEach(input => {
        $(input).mask("+7 (999) 999-99-99");
    });
}
// Анимауия отрисовки svg на главном экране
const mainSvgAnimationElement = document.querySelector('.main-screen__image svg');
window.addEventListener('load', (e) => {
    mainSvgAnimationElement.classList.add('active');
});

const tableSentenceSlider = new Swiper('.products__slider', {
    modules: [Navigation],
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    speed: 900,
    noSwipingClass: 'product__head',
    slidesPerView: 1,
    spaceBetween: 10,
    breakpoints: {
        768: {
            slidesPerView: 2,
            spaceBetween: 10
        },
        1124: {
            slidesPerView: 3,
            spaceBetween: 20
        },
        1600: {
            slidesPerView: 4,
            spaceBetween: 30
        }
    }
});
const productCardSlider = new Swiper('.product__head', {
    modules: [Pagination],
    slidesPerView: 1,
    speed: 600,
    pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true,
    },
    grabCursor: true
});


