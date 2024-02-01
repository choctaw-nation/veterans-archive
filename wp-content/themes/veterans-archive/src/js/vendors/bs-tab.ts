import Tab from 'bootstrap/js/dist/tab';

new ( class TabHandler {
	constructor() {
		const triggerTabList = document.querySelectorAll( '#myTab button' );
		triggerTabList.forEach( ( triggerEl ) => {
			// initialize tab
			const tabTrigger = new Tab( triggerEl );

			// add event listener to trigger
			triggerEl.addEventListener( 'click', ( ev ) => {
				ev.preventDefault();
				tabTrigger.show();
			} );

			triggerEl.addEventListener( 'hide.bs.tab', ( ev ) => {
				const { target } = ev;
				console.log( target );
				const btnBorder = this.getSibling( target as HTMLElement );
				btnBorder?.classList.remove( 'border-dark-blue' );
			} );

			triggerEl.addEventListener( 'show.bs.tab', ( ev ) => {
				const { target } = ev;
				console.log( target );
				const btnBorder = this.getSibling( target as HTMLElement );
				btnBorder?.classList.add( 'border-dark-blue' );
			} );
		} );
	}

	private getSibling( el: HTMLElement ) {
		return el?.closest( '.btn-container' )?.querySelector( '.btn-lower' );
	}
} )();
