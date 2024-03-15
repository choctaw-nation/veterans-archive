import apiFetch from '@wordpress/api-fetch';
import { VeteranData } from './types';
import { WP_Term } from 'wp-types';

/**
 * Get veterans data from the Rest Endpoint
 */
export async function getVeteransData(): Promise< {
	searchFilters: {
		branches: WP_Term[];
		wars: WP_Term[];
		decorations: WP_Term[];
	};
	veterans: VeteranData[];
} > {
	const response: {
		searchFilters: {
			branches: WP_Term[];
			wars: WP_Term[];
			decorations: WP_Term[];
		};
		veterans: VeteranData[];
	} = await apiFetch( {
		path: 'veterans-archive/v1/veterans',
		headers: {
			'Content-Type': 'application/json',
		},
	} );
	console.log( response );
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
