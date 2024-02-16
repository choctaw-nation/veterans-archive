import Fuse, { IFuseOptions } from 'fuse.js';
import { useState, useEffect } from 'react';
import { getVeteransData } from '../utilities';
import { VeteranData, SelectedFiltersState } from '../types';

const fuzzySearchKeys: IFuseOptions< VeteranData >[ 'keys' ] = [
	{
		name: 'title',
		getFn: ( veteran ) => veteran.title,
		weight: 2,
	},
	{
		name: 'datesOfService',
		getFn: ( veteran ) => {
			if ( veteran.vetData?.dates_of_service ) {
				return veteran.vetData.dates_of_service
					.map( ( date ) => {
						const dates: string[] = [];
						dates.push( date.service_end.toString() );
						dates.push( date.service_start.toString() );
						return dates;
					} )
					.flat();
			} else return '';
		},
	},
	{
		name: 'rank',
		getFn: ( veteran ) => veteran.vetData?.highest_achieved_rank,
	},
	{
		name: 'home',
		getFn: ( veteran ) => {
			if ( veteran.vetData?.home_areas ) {
				return [
					...veteran.vetData?.home_areas
						.map( ( home ) => [ ...Object.values( home ) ] )
						.flat(),
				];
			} else return '';
		},
	},
	{
		name: 'decorations',
		getFn: ( veteran ) => {
			if ( veteran.vetData?.decorations?.decorations ) {
				return veteran.vetData?.decorations?.decorations.map(
					( decoration ) => decoration.name
				);
			} else {
				return '';
			}
		},
	},
	{
		name: 'statesideAssignment',
		getFn: ( veteran ) => veteran.vetData?.stateside_assignments,
		weight: 0.3,
	},
	{
		name: 'jobs',
		getFn: ( veteran ) => veteran.vetData?.jobs,
		weight: 0.3,
	},
	{
		name: 'overseasDuty',
		getFn: ( veteran ) => veteran.vetData?.overseas_duty,
		weight: 0.3,
	},
	{
		name: 'militaryUnits',
		getFn: ( veteran ) => veteran.vetData?.military_units,
		weight: 0.5,
	},
	{
		name: 'nickname',
		getFn: ( veteran ) => veteran.vetData?.nickname,
		weight: 0.7,
	},
	{
		name: 'maidanName',
		getFn: ( veteran ) => veteran.vetData?.maiden_name,
		weight: 0.7,
	},
	{
		name: 'advancedTraining',
		getFn: ( veteran ) => veteran.vetData?.advanced_training,
		weight: 0.3,
	},
];

export default function useFuzzySearch(
	searchTerm: string,
	selectedFilters: SelectedFiltersState
) {
	const [ veterans ]: VeteranData[][] = useState< VeteranData[] >( () => {
		let vets: VeteranData[] = window.cnoSiteData.vetData.veterans;
		if ( ! vets || 0 === vets.length ) {
			getVeteransData()
				.then( ( response ) => {
					vets = response;
				} )
				.catch( ( err ) => console.error( err ) );
		}
		return vets;
	} );
	const [ searchResults, setSearchResults ] = useState( veterans );
	const [ isLoading, setIsLoading ] = useState( false );
	useEffect( () => {
		let results: VeteranData[] = [];
		const hasFilters = Object.values( selectedFilters ).some(
			( val ) => val !== ''
		);
		if ( ! searchTerm && ! hasFilters ) {
			setSearchResults( veterans );
			return;
		}
		if ( ! searchTerm && hasFilters ) {
			setSearchResults( filterResults( veterans, selectedFilters ) );
			return;
		}
		if ( searchTerm ) {
			setIsLoading( true );
			const timeoutId = setTimeout( () => {
				const fuse = new Fuse< VeteranData >( veterans, {
					minMatchCharLength: 3,
					keys: fuzzySearchKeys,
					threshold: 0.3,
				} );

				const result = fuse.search( searchTerm );
				results = result.map( ( { item } ) => item );
				if ( hasFilters ) {
					const filteredSearchResults = filterResults(
						results,
						selectedFilters
					);
					setSearchResults( filteredSearchResults );
				} else {
					setSearchResults( results );
				}
				setIsLoading( false );
			}, 750 );
			return () => {
				clearTimeout( timeoutId );
			};
		}
	}, [ searchTerm, veterans, selectedFilters ] );

	return { searchResults, isLoading, veterans, setSearchResults };
}

/**
 * Filters Results based on selected filters
 * @param results the results to filter
 * @param selectedFilters the selected filters
 * @returns the filtered results
 */
function filterResults(
	results: VeteranData[],
	selectedFilters: SelectedFiltersState
): VeteranData[] {
	return results.filter( ( result ) => {
		if (
			'' !== selectedFilters.branches &&
			( ! result.vetData?.branches_of_service ||
				result.vetData?.branches_of_service?.every(
					( val ) => val.slug !== selectedFilters.branches
				) )
		) {
			return false;
		}

		if (
			'' !== selectedFilters.wars &&
			( ! result.vetData?.wars ||
				result.vetData?.wars?.every(
					( val ) => val.slug !== selectedFilters.wars
				) )
		) {
			return false;
		}

		if (
			'' !== selectedFilters.decorations &&
			( ! result.vetData?.decorations?.decorations ||
				result.vetData?.decorations?.decorations?.every(
					( val ) => val.slug !== selectedFilters.decorations
				) )
		) {
			return false;
		}
		return true;
	} );
}
