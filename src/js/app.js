import * as jquery3 from './jquery-3.6.1.min.js';
import Swiper, { Navigation, Pagination, Autoplay } from 'swiper';
import Inputmask from './inputmask.es6.js';

//--- InputMask -----//
let selector = document.querySelector('.inputmasked');
let im = new Inputmask("+7(999)999-99-99");
im.mask(selector);

//------Navbar Show-----//

const toggleList = document.querySelectorAll('.menu-toggle');
const navContainer = document.querySelector('.nav-container');

let showNavbar = function(e) {
	if (!navContainer.classList.contains('nav-container--show')) {
		navContainer.classList.add('nav-container--show');
	} else {
		navContainer.classList.remove('nav-container--show');
	};
};
console.log(toggleList);
toggleList.forEach(function(i) {
	console.log(i);
	i.addEventListener('click', showNavbar);
});


// ---- SLIDER --------- //
const slider = document.querySelector('.slider');
const sliderValue = slider.querySelector('.slider__value');
const sliderRange = slider.querySelector('.slider__range');
const sliderControl = slider.querySelector('.slider__control');

let positionCord = sliderValue.value.replace(/[^0-9]/g, "");
let maxRange = Number(sliderRange.ariaValueMax);
let minRange = Number(sliderRange.ariaValueMin);
let nowRange;

sliderRange.style.width = `${positionCord / (maxRange / 100)}%`;
sliderRange.ariaValueNow = maxRange * (sliderRange.style.width.replace(/[^0-9]/g, "") / 100);

let onSliderMouseDown = function(evt) {
	let startControlCoord = evt.target.offsetLeft;
	let startMouseCoord = evt.clientX;
	let coordPercent;

	let onSliderMouseMove = function(evt) {
		evt.preventDefault();
		let actualMouseCoord = evt.clientX;
		let newMouseCoord = actualMouseCoord - startMouseCoord;
		let actualControlCoord = startControlCoord + newMouseCoord;

		if (actualControlCoord <= 0) {
			actualControlCoord = 0;
		};

		if (actualControlCoord >= slider.offsetWidth) {
			actualControlCoord = slider.offsetWidth;
		};

		coordPercent = Math.floor(actualControlCoord / (slider.offsetWidth / 100));
		sliderRange.style.width = `${coordPercent}%`;

		sliderRange.ariaValueNow = Math.floor(maxRange * (coordPercent / 100));
		sliderValue.value = `${sliderRange.ariaValueNow} литров`;
	};
	let onSliderMouseUp = function() {
		document.removeEventListener('mousemove', onSliderMouseMove);
		document.removeEventListener('mousemove', onSliderMouseUp)
	};
	document.addEventListener('mousemove', onSliderMouseMove);
	document.addEventListener('mouseup', onSliderMouseUp);
};

let onSliderInput = function(e) {
	positionCord = e.target.value.replace(/[^0-9]/g, "");
	sliderRange.style.width = `${positionCord / (maxRange / 100)}%`;
	sliderRange.ariaValueNow = e.target.value.replace(/[^0-9]/g, "");

	let onSliderChange = function(e) {
		let newValue = e.target.value.replace(/[^0-9]/g, "");
		e.target.value = `${newValue} литров`;

		sliderValue.removeEventListener('change', onSliderChange);
	}

	sliderValue.addEventListener('change', onSliderChange);
};

sliderControl.addEventListener('mousedown', onSliderMouseDown);
sliderValue.addEventListener('input', onSliderInput);

let onSliderKeyDown = function(evt) {
	let stepValue = 100;
	let stepPercent = stepValue / (maxRange / 100);
	let startControlCoord = +sliderRange.style.width.replace(/[^0-9]/g, "");
	let newControlCoord;

	if (evt.keyCode == 39) {
		newControlCoord = startControlCoord + stepPercent;
		console.log(`${newControlCoord} < ${maxRange}`);
		if (newControlCoord > 100) {
			newControlCoord = 100;
		}
	}

	if (evt.keyCode == 37) {
		newControlCoord = startControlCoord - stepPercent;
		if (newControlCoord < 0) {
			newControlCoord = 0;
		}
	}

	sliderRange.style.width = `${newControlCoord}%`;
	sliderRange.ariaValueNow = Math.floor(maxRange * (newControlCoord / 100));
	sliderValue.value = `${sliderRange.ariaValueNow} литров`;
}

sliderRange.addEventListener('focus', function(evt) {
	sliderRange.addEventListener('keydown', onSliderKeyDown);
});
sliderRange.addEventListener('blur', function(evt) {
	sliderRange.removeEventListener('keydown', onSliderKeyDown);
});

// Swiper carousel

let certificatesCarousel = new Swiper('.certificates__carousel', {
	modules: [Navigation, Autoplay],
	loop: true,
	slidesPerView: 4,
	spaceBetween: 30,
	autoplay: {
		delay: 2500,
		disableOnInteraction: false,
	},
	navigation: {
		nextEl: '.certificates .slider-button--next',
		prevEl: '.certificates .slider-button--prev',
	}
});

let partnersCarousel = new Swiper('.partners__carousel', {
	modules: [Pagination, Autoplay],
	loop: true,
	slidesPerView: 4,
	spaceBetween: 30,
	autoplay: {
		delay: 2500,
		disableOnInteraction: false,
	},
	pagination: {
          el: '.slider-pagination',
          clickable: true,
          bulletActiveClass: 'slider-pagination__bullet--active',
          bulletClass: 'slider-pagination__bullet'
        }
});

let reviewsCarousel = new Swiper('.reviews__carousel', {
	modules: [Navigation, Autoplay],
	loop: true,
	slidesPerView: 2,
	autoHeight: true,
	autoplay: {
		delay: 255555500,
		disableOnInteraction: false,
	},
	navigation: {
		nextEl: '.reviews .slider-button--next',
		prevEl: '.reviews .slider-button--prev',
	}
});