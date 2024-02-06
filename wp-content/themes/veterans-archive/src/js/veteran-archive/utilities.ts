import apiFetch from '@wordpress/api-fetch';
import { VeteranData } from './types';

/**
 * Get veterans data from the Rest Endpoint
 */
export async function getVeteransData(): Promise< VeteranData[] > {
	const response: VeteranData[] = await apiFetch( {
		path: 'veterans-archive/v1/veterans',
		headers: {
			'Content-Type': 'application/json',
		},
	} );
	if ( ! response ) {
		throw new Error( 'No response' );
	} else {
		return response;
	}
}

/**
 * Get the search query from the URL
 */
export function getSearchParams() {
	const urlSearchParams = new URLSearchParams( window.location.search );
	return urlSearchParams.has( 's' ) ? urlSearchParams.get( 's' ) : '';
}
