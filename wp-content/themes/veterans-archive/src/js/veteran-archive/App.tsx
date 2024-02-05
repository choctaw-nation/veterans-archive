import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';

import SearchBar from './components/SearchBar';
import VeteranPreview from './components/VeteranPreview';
import { getSearchParams } from './utilities';
import useFuzzySearch from './hooks/useFuzzySearch';
import BootstrapSpinner from '../submit-a-veteran/Form/ui/BootstrapSpinner';
import SearchFilters from './components/SearchFilters';

const root = document.getElementById( 'search' );
if ( root ) {
	createRoot( root ).render( <App /> );
}

function App() {
	const [ searchTerm, setSearchTerm ] = useState( getSearchParams() );
	const { searchResults, isLoading } = useFuzzySearch( searchTerm );
	const [ selected, setSelected ] = useState( '' );
	console.log( selected );

	return (
		<>
			<section className="bg-dark-blue py-3">
				<div className="container">
					<SearchBar
						searchTerm={ searchTerm }
						setSearchTerm={ setSearchTerm }
					>
						<SearchFilters
							setSelected={ setSelected }
							selected={ selected }
						/>
					</SearchBar>
				</div>
			</section>
			<div className="container my-5 py-5">
				{ isLoading && <BootstrapSpinner /> }
				{ ! isLoading && (
					<div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-gap-4">
						{ searchResults.map( ( veteran ) => (
							<div
								className="col"
								key={ veteran.vetData.post_id }
							>
								<VeteranPreview post={ veteran } />
							</div>
						) ) }
					</div>
				) }
			</div>
		</>
	);
}
