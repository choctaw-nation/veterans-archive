import '../../styles/pages/front-page.scss';
import { newSlider } from '../swiper';

const slider = newSlider( document.querySelector( '.swiper' ), {
	breakpoints: undefined,
	loop: true,
	centeredSlides: true,
	slidesPerView: 1,
	slidesPerGroup: 1,
	grabCursor: true,
	autoHeight: true,
} );
