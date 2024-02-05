import Fuse from 'fuse.js';
import { useState, useEffect } from 'react';
import { getVeteransData } from '../utilities';

export default function useFuzzySearch( searchTerm: string ) {
	const [ veterans, setVeterans ] = useState( cnoSiteData.vetData.veterans );
	const [ searchResults, setSearchResults ] = useState( veterans );
	const [ isLoading, setIsLoading ] = useState( false );

	useEffect( () => {
		if ( ! veterans || ! veterans.length ) {
			const data = getVeteransData();
			setVeterans( data );
		}
	}, [ veterans ] );

	useEffect( () => {
		if ( ! searchTerm ) {
			setSearchResults( veterans );
			return;
		}
		setIsLoading( true );
		const timeoutId = setTimeout( () => {
			const fuse = new Fuse( veterans, {
				keys: [
					'title',
					'branch',
					'rank',
					'location',
					'date_of_birth',
				],
				threshold: 0.3,
			} );

			const result = fuse.search( searchTerm );
			const results = result.map( ( { item } ) => item );
			setSearchResults( results );
			setIsLoading( false );
		}, 750 );
		return () => {
			console.log( 'timeout cleared' );
			clearTimeout( timeoutId );
		};
	}, [ searchTerm, veterans ] );

	return { searchResults, isLoading };
}
