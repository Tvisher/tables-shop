'use strict';
import * as baseFunction from './modules/functions.js';
import './vendors/vendors.js';
import Swiper, {
    Navigation,
    Pagination,
    Thumbs,
    EffectFade,
    Mousewheel
} from 'swiper';

import AOS from 'aos';


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
// Анимация отрисовки svg на главном экране
const mainSvgAnimationElement = document.querySelector('.main-screen__image svg');
window.addEventListener('load', (e) => {

    mainSvgAnimationElement && mainSvgAnimationElement.classList.add('active');
});


// Слайдеры
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
const reviewsSlider = new Swiper('.reviews__slider', {
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
const swiperGaleryThumbs = new Swiper(".galery__thumbs", {
    modules: [Navigation, Thumbs, Mousewheel],
    spaceBetween: 10,
    slidesPerView: 4,
    speed: 400,
    watchSlidesProgress: true,
    direction: 'horizontal',
    mousewheel: {
        enabled: true,
    },
    breakpoints: {
        768: {
            spaceBetween: 10,
        },
    }
});
const swiperGalery = new Swiper(".galery__slider", {
    modules: [Navigation, Thumbs, EffectFade],
    speed: 900,
    effect: 'fade',
    fadeEffect: {
        crossFade: true
    },
    thumbs: {
        swiper: swiperGaleryThumbs,
    },
});


//анимации
AOS.init({
    // Global settings:
    disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
    startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
    initClassName: 'aos-init', // class applied after initialization
    animatedClassName: 'aos-animate', // class applied on animation
    useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
    disableMutationObserver: false, // disables automatic mutations' detections (advanced)
    debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
    throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)
    // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
    offset: 30, // offset (in px) from the original trigger point
    delay: 0, // values from 0 to 3000, with step 50ms
    duration: 1400, // values from 0 to 3000, with step 50ms
    easing: 'ease', // default easing for AOS animations
    once: true, // whether animation should happen only once - while scrolling down
    mirror: false, // whether elements should animate out while scrolling past them
    anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation

});
// Акардеоны секции faq
$(document).ready(function () {
    $("[data-togle]").click(function () {
        $(this).toggleClass('show');
        $(this).siblings().slideToggle("slow", function () {
        });
    });
});


// Кнопка промотать к началу страницы
const scrollToTop = document.querySelector('#scroll-to-top');
const flyingMenu = document.querySelector('#flying-menu');

window.addEventListener("scroll", (e) => {
    if (window.pageYOffset > 150) {
        scrollToTop.classList.add('show');
        flyingMenu.classList.add('show');
    } else {
        scrollToTop.classList.remove('show');
        flyingMenu.classList.remove('show');
    }
});
$(scrollToTop).click(function () {
    $("html, body").animate({ scrollTop: 0 }, "fast");
    return false;
});



// логика работы меню(открытие,закрытие, нажатие на ссылки)
(function () {
    const burgerBtn = document.querySelector('[data-open-menu]');
    const mobileMenu = document.querySelector('#mobile-menu');
    burgerBtn.addEventListener("click", (e) => {
        mobileMenu.classList.toggle('active');
        burgerBtn.classList.toggle('active');
        document.body.classList.toggle('hidden');
    });
    const menuLinks = mobileMenu.querySelectorAll('a');
    menuLinks.forEach(link => {
        link.onclick = (e) => {
            if (mobileMenu.classList.contains('active')) {
                setTimeout(() => {
                    mobileMenu.classList.remove('active');
                    burgerBtn.classList.remove('active');
                    document.body.classList.remove('hidden');
                }, 0);
            }
        };
    });
}());


// Функция делящая заголовок на спаны с анимацией
(function () {
    const mainTitle = document.querySelector('.main-screen__title');
    if (mainTitle) {
        let textToArray = mainTitle.textContent.trim().split(' ');
        mainTitle.innerHTML = '';
        textToArray
            .map((word, index) => `<span data-aos="fade-in" data-aos-delay="${index * 2 * 150}" >${word}</span>`)
            .forEach(item => mainTitle.innerHTML += item);
    }
}());

