import React, { useState, useRef } from 'react';
import { createRoot } from 'react-dom/client';

import { SearchBar } from './components/SearchBar';
import { VeteranPreview } from './components/VeteranPreview';
import { getSearchParams } from './utilities';
import useFuzzySearch from './hooks/useFuzzySearch';
import BootstrapSpinner from '../submit-a-veteran/Form/ui/BootstrapSpinner';
import { SearchFilters } from './components/SearchFilters';

import { SelectedFiltersState } from './types';

const root = document.getElementById( 'search' );
if ( root ) {
	createRoot( root ).render( <App /> );
}

function App() {
	const [ selectedFilters, setSelectedFilters ] =
		useState< SelectedFiltersState >( {
			branches: '',
			wars: '',
			decorations: '',
		} );
	const [ searchTerm, setSearchTerm ] = useState( getSearchParams() );
	const { searchResults, isLoading } = useFuzzySearch(
		searchTerm,
		selectedFilters
	);
	const searchInput = useRef( null );

	return (
		<>
			<section className="bg-dark-blue py-3">
				<div className="container">
					<SearchBar
						isLoading={ isLoading }
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
				{ isLoading && <BootstrapSpinner /> }
				{ ! isLoading && (
					<div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-gap-4">
						{ searchResults.length > 0 &&
							searchResults.map( ( veteran ) => (
								<div
									className="col"
									key={ veteran.vetData.post_id }
								>
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
