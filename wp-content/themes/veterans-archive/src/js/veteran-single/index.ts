import Modal from 'bootstrap/js/dist/modal';
import { newSlider } from '../swiper';
import '../../styles/components/veteran-photo-gallery.scss';

new ( class ModalHandler {
	private modalElement: HTMLElement;
	private modalBody: HTMLElement;
	private type: string;
	private title: string;
	private src: Array< { url: string; alt: string; srcset: string } > | string;
	private swiper: HTMLDivElement;
	private swiperThumbs: HTMLDivElement;

	constructor() {
		const modal = document.getElementById( 'additional-materials-modal' );
		if ( modal ) {
			this.modalElement = modal;
			this.modalBody = modal.querySelector( '.modal-body' )!;
			try {
				this.init();
				modal.addEventListener( 'show.bs.modal', ( ev ) =>
					this.handleModal( ev, 'show' )
				);
				modal.addEventListener( 'hide.bs.modal', ( ev ) =>
					this.handleModal( ev, 'hide' )
				);
			} catch ( err ) {
				console.error( err );
			}
		}
	}

	/**
	 * Wire up the modal
	 */
	private init() {
		new Modal( this.modalElement );
	}

	/**
	 * Handles the modal show event
	 * @param ev the event that triggered the modal
	 */
	private handleModal( ev, type: 'show' | 'hide' ) {
		if ( 'show' === type ) {
			const button = ev?.relatedTarget as HTMLButtonElement;
			this.setModalData( button );
			document.getElementById(
				'additional-materials-modal-label'
			)!.innerText = this.title;
			let innerElement;
			switch ( this.type ) {
				case 'audio':
					innerElement = this.initAudioPlayer();
					break;
				case 'photo-gallery':
					this.modalBody.classList.add( 'photo-gallery' );
					innerElement = this.initGallery();
					break;
				case 'video':
					innerElement = this.initVideoPlayer();
					break;
			}
			if ( innerElement ) {
				this.modalBody.insertAdjacentElement(
					'afterbegin',
					innerElement
				);
				if ( 'photo-gallery' === this.type ) {
					this.initSwipers();
				}
			}
		} else {
			this.modalBody.innerHTML = '';
			this.modalBody.classList.remove( 'photo-gallery' );
		}
	}

	/**
	 * Sets the modal data based on the button that was clicked
	 * @param ev the event that triggered the modal
	 */
	private setModalData( btn: HTMLButtonElement ) {
		this.type = btn.dataset.cnoType!;
		this.title = btn.dataset.cnoTitle!;
		this.src = JSON.parse( btn.dataset.cnoSrc! );
	}

	/**
	 * Initializes the audio player
	 */
	private initAudioPlayer(): HTMLAudioElement {
		const audioPlayer = document.createElement( 'audio' );
		audioPlayer.classList.add( 'm-5' );
		audioPlayer.src = this.src as string;
		audioPlayer.controls = true;
		audioPlayer.load();
		return audioPlayer;
	}

	/**
	 * Builds the Swiper HTML nested inside a `container` el
	 * @returns HTMLDivElement
	 */
	private initGallery() {
		try {
			this.swiper = this.createSwiper();
			this.swiperThumbs = this.createSwiper( 'swiper-thumbs' );
			const container = document.createElement( 'div' );
			container.classList.add( 'container', 'my-3' );
			container.appendChild( this.swiper );
			container.appendChild( this.swiperThumbs );
			return container;
		} catch ( err ) {
			console.error( err );
		}
	}

	/**
	 * Creates the Swiper Element
	 * @param className Optional class name to add to the swiper
	 */
	private createSwiper( className?: string ): HTMLDivElement {
		if ( ! Array.isArray( this.src ) ) {
			throw new Error( 'src is not an array!' );
		}
		const swiperEl = document.createElement( 'div' );
		let classes = [ 'swiper', className ? className : '' ];
		swiperEl.classList.add( ...classes.filter( ( c ) => c !== '' ) );
		swiperEl.style.setProperty(
			'--swiper-navigation-color',
			'var(--bs-green)'
		);
		const wrapper = document.createElement( 'div' );
		wrapper.classList.add( 'swiper-wrapper' );
		this.src.forEach( ( { url, alt, srcset } ) => {
			const slide = document.createElement( 'img' );
			slide.src = url;
			slide.srcset = srcset;
			slide.alt = alt;
			slide.loading = 'lazy';
			slide.classList.add( 'swiper-slide' );
			wrapper.appendChild( slide );
		} );
		swiperEl.appendChild( wrapper );
		if ( ! className ) {
			const nextBtn = document.createElement( 'div' );
			nextBtn.classList.add( 'swiper-button-next' );
			const prevBtn = document.createElement( 'div' );
			prevBtn.classList.add( 'swiper-button-prev' );
			swiperEl.appendChild( nextBtn );
			swiperEl.appendChild( prevBtn );
		}

		return swiperEl;
	}

	/**
	 * Initializes the Photo Gallery Swipers
	 */
	private initSwipers() {
		const swiper = this.modalBody.querySelector( '.swiper' ) as
			| HTMLElement
			| undefined;
		const swiperThumbs = this.modalBody.querySelector(
			'.swiper-thumbs'
		) as HTMLElement | undefined;
		if ( swiper && swiperThumbs ) {
			newSlider( swiper, {
				grabCursor: false,
				thumbs: {
					swiper: newSlider( swiperThumbs, {
						slidesPerView: 4,
						freeMode: true,
						watchSlidesProgress: true,
					} ),
					multipleActiveThumbs: false,
				},
			} );
		}
	}

	/**
	 * Initializes the video player
	 */
	private initVideoPlayer() {
		const parser = new DOMParser();
		const video = parser.parseFromString( this.src as string, 'text/html' );
		const videoContainer = document.createElement( 'div' );
		videoContainer.classList.add( 'ratio', 'ratio-16x9' );
		videoContainer.appendChild( video.body.firstChild! );
		return videoContainer;
	}
} )();
