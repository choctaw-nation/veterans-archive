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
	const { searchResults, isLoading, totalPages } = useFuzzySearch(
		searchTerm,
		selectedFilters,
		vetData
	);
	const searchInput = useRef( null );
	const [ results, setResults ] = useState( searchResults.slice( 0, 9 ) );
	const [ currentPage, setCurrentPage ] = useState( 1 );

	const viewMore = useRef( null );

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
		if ( searchResults ) {
			setResults( searchResults.slice( 0, currentPage * 9 ) );
		}
	}, [ searchResults, currentPage ] );

	useEffect( () => {
		const viewMoreDiv = viewMore.current;
		const observer = new IntersectionObserver(
			( entries ) => {
				if ( entries[ 0 ].isIntersecting ) {
					setCurrentPage( ( prevPage ) => {
						return prevPage > totalPages ? prevPage : prevPage + 1;
					} );
				}
			},
			{ threshold: 0.5 }
		);

		if ( viewMoreDiv ) {
			observer.observe( viewMoreDiv );
		}

		return () => {
			if ( viewMoreDiv ) {
				observer.disconnect();
			}
		};
	}, [] );

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
				{ initialLoad ? (
					<BootstrapSpinner />
				) : searchResults?.length === 0 || ! searchResults ? (
					<p>No veterans found</p>
				) : (
					<>
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
						<div id="more" ref={ viewMore }></div>
					</>
				) }
			</div>
		</>
	);
}
