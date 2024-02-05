import apiFetch from '@wordpress/api-fetch';

/**
 * Get veterans data from the Rest Endpoint
 */
export async function getVeteransData() {
	const response = await apiFetch( {
		path: 'veterans-archive/v1/veterans',
		headers: {
			'Content-Type': 'application/json',
		},
	} );
	if ( ! response ) {
		throw new Error( 'No response' );
	}
	console.log( response );
}

/**
 * Get the search query from the URL
 */
export function getSearchParams() {
	const urlSearchParams = new URLSearchParams( window.location.search );
	return urlSearchParams.has( 's' ) ? urlSearchParams.get( 's' ) : '';
}
