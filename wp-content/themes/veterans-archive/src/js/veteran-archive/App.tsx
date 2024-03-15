import React, { useState, useRef, useEffect } from 'react';
import { createRoot } from 'react-dom/client';

import { SearchBar } from './components/SearchBar';
import { VeteranPreview } from './components/VeteranPreview';
import { getSearchParams, getVeteransData } from './utilities';
import useFuzzySearch from './hooks/useFuzzySearch';
import BootstrapSpinner from '../submit-a-veteran/Form/ui/BootstrapSpinner';
import { SearchFilters } from './components/SearchFilters';

import { SelectedFiltersState } from './types';

const root = document.getElementById( 'search' );
if ( root ) {
	createRoot( root ).render(
		<App appLoad={ ! window.cnoSiteData?.vetData ? true : false } />
	);
}

function App( { appLoad }: { appLoad: boolean } ) {
	const [ initialLoad, setInitialLoad ] = useState( appLoad );
	const [ vetData, setVetData ] = useState(
		! appLoad ? window.cnoSiteData.vetData : null
	);
	const [ selectedFilters, setSelectedFilters ] =
		useState< SelectedFiltersState >( {
			branches: '',
			wars: '',
			decorations: '',
		} );
	const [ searchTerm, setSearchTerm ] = useState( getSearchParams() );
	const { searchResults, isLoading } = useFuzzySearch(
		searchTerm,
		selectedFilters,
		vetData
	);
	const searchInput = useRef( null );
	console.log( appLoad, initialLoad, searchResults );
	useEffect( () => {
		if ( ! vetData ) {
			setInitialLoad( true );
			getVeteransData()
				.then( ( response ) => {
					setVetData( response );
					setInitialLoad( false );
				} )
				.finally( () => setInitialLoad( false ) );
		}
	}, [ initialLoad, vetData ] );

	return (
		<>
			<section className="bg-dark-blue py-3">
				<div className="container">
					<SearchBar
						isLoading={ initialLoad || isLoading }
						searchTerm={ searchTerm }
						setSearchTerm={ setSearchTerm }
						searchInputRef={ searchInput }
					>
						<SearchFilters
							setSelected={ setSelectedFilters }
							selected={ selectedFilters }
							searchInputRef={ searchInput }
						/>
					</SearchBar>
				</div>
			</section>
			<div className="container my-5 py-5">
				{ isLoading || initialLoad ? (
					<BootstrapSpinner />
				) : searchResults?.length === 0 || ! searchResults ? (
					<p>No veterans found</p>
				) : (
					<div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-gap-4">
						{ searchResults.length > 0 &&
							searchResults.map( ( veteran ) => (
								<div className="col" key={ veteran.id }>
									<VeteranPreview post={ veteran } />
								</div>
							) ) }
						{ searchResults.length === 0 && (
							<div className="col flex-grow-1">
								<p>
									No results found. Trying searching for
									something else or changing your filters.
								</p>
							</div>
						) }
					</div>
				) }
			</div>
		</>
	);
}
