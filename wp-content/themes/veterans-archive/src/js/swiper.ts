import Swiper from 'swiper';
import { Navigation, A11y, Thumbs } from 'swiper/modules';

import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/a11y';
import 'swiper/scss/thumbs';
import { SwiperOptions } from 'swiper/types/swiper-options';

const defaultArgs = {
	modules: [ Navigation, A11y, Thumbs ],
	direction: 'horizontal',
	loop: false,
	grabCursor: true,

	// Navigation arrows
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	},
	spaceBetween: 10,
} as SwiperOptions;

/**
 * Simple API to init new Swiper object with default and overridable args
 *
 * @param {HTMLElement} el the element to create a slider on
 * @param {SwiperOptions} args the Swiper Options arg to override
 * @returns swiper instance
 */
export function newSlider( el: HTMLElement, args: SwiperOptions = {} ): Swiper {
	const newArgs = Object.assign( {}, defaultArgs, args );
	const swiper = new Swiper( el, newArgs );
	return swiper;
}
