import React, { useState, useRef, useEffect } from 'react';
import { createRoot } from 'react-dom/client';

import { SearchBar } from './components/SearchBar';
import { VeteranPreview } from './components/VeteranPreview';
import { getSearchParams, getVeteransData } from './utilities';
import useFuzzySearch from './hooks/useFuzzySearch';
import BootstrapSpinner from '../submit-a-veteran/Form/ui/BootstrapSpinner';
import { SearchFilters } from './components/SearchFilters';

import { SelectedFiltersState } from './types';
import PaginationBar from './components/PaginationBar';

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
	const [ results, setResults ] = useState( [] );
	const [ currentPage, setCurrentPage ] = useState( 1 );
	const [ resultsPerPage, setResultsPerPage ] = useState( 9 );
	const [ totalPages, setTotalPages ] = useState( 0 );
	function handleSearch( ev ) {
		setSearchTerm( ev.target.value );
		const searchParams = new URLSearchParams( window.location.search );
		searchParams.set( 's', ev.target.value );
		window.history.pushState(
			{},
			'',
			`${ window.location.pathname }?${ searchParams.toString() }`
		);
		if ( ev.target.value === '' ) {
			window.history.pushState( {}, '', `${ window.location.pathname }` );
			document.title = 'All Veterans | Choctaw Nation Veterans Archive';
			return;
		}
		document.title = `Search Results for "${ ev.target.value }"`;
	}

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

	useEffect( () => {
		if ( searchTerm ) {
			setCurrentPage( 1 );
		}
	}, [ searchTerm ] );

	useEffect( () => {
		if ( searchResults ) {
			currentPage === 1
				? setResults( searchResults.slice( 0, resultsPerPage ) )
				: setResults(
						searchResults.slice(
							( currentPage - 1 ) * resultsPerPage,
							currentPage * resultsPerPage
						)
				  );

			setTotalPages( Math.ceil( searchResults.length / resultsPerPage ) );
		}
	}, [ searchResults, currentPage, resultsPerPage ] );

	return (
		<>
			<section className="bg-dark-blue py-3">
				<div className="container">
					<SearchBar
						isLoading={ initialLoad || isLoading }
						searchTerm={ searchTerm }
						handleSearch={ handleSearch }
						searchInputRef={ searchInput }
						children={ undefined }
					>
						<SearchFilters
							setSelected={ setSelectedFilters }
							selected={ selectedFilters }
							searchInputRef={ searchInput }
						/>
					</SearchBar>
				</div>
			</section>
			<div className="container my-5">
				{ isLoading || initialLoad ? (
					<BootstrapSpinner />
				) : searchResults?.length === 0 || ! searchResults ? (
					<p>No veterans found</p>
				) : (
					<>
						<PaginationBar
							currentPage={ currentPage }
							searchResults={ searchResults }
							setCurrentPage={ setCurrentPage }
							resultsPerPage={ resultsPerPage }
							setResultsPerPage={ setResultsPerPage }
							totalPages={ totalPages }
						/>
						<div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-gap-4 my-4">
							{ searchResults.length > 0 &&
								results.map( ( veteran ) => (
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
						{ totalPages > 1 && (
							<PaginationBar
								inFooter={ true }
								currentPage={ currentPage }
								searchResults={ searchResults }
								setCurrentPage={ setCurrentPage }
								setResultsPerPage={ setResultsPerPage }
								resultsPerPage={ resultsPerPage }
								totalPages={ totalPages }
							/>
						) }
					</>
				) }
			</div>
		</>
	);
}
