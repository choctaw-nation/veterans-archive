import React from 'react';
import { ButtonWrapper } from '../../submit-a-veteran/Form/ui/ButtonWrapper';

export default function PaginationBar( {
	currentPage,
	searchResults,
	setCurrentPage,
	setResultsPerPage,
	resultsPerPage,
	totalPages,
} ) {
	return (
		<div className="text-bg-light-green row row-cols-auto justify-content-between align-items-center shadow p-3 gx-0">
			<div className="col d-flex gap-2 align-items-center">
				<label
					className="fw-bold text-uppercase display-6 fs-5"
					for="results-per-page-select"
					id="results-per-page"
				>
					Results Per Page:
				</label>
				<ButtonWrapper
					classes="btn-outline-dark"
					innerClass="btn-outline-dark"
				>
					<select
						name="results"
						id="results-per-page-select"
						aria-labelledby="results-per-page"
						className="btn btn-outline-dark z-2 border-0 fs-6"
						value={ resultsPerPage }
						onChange={ ( ev ) =>
							setResultsPerPage( +ev.target.value )
						}
					>
						{ [ 9, 18, 27, 36 ].map( ( num ) => (
							<option key={ num } value={ num }>
								{ num }
							</option>
						) ) }
					</select>
				</ButtonWrapper>
			</div>
			<div className="col fw-bold fs-5">
				Page { currentPage } of { totalPages }
			</div>
			<div className="col d-flex flex-wrap justify-content-evenly align-items-center gap-3">
				{ currentPage > 1 && (
					<ButtonWrapper innerClass="btn-outline-dark">
						<button
							onClick={ () => setCurrentPage( currentPage - 1 ) }
							className="btn btn-outline-dark text-uppercase z-3 border-0"
						>
							Previous Page
						</button>
					</ButtonWrapper>
				) }
				{ currentPage <=
					Math.floor( searchResults.length / resultsPerPage ) && (
					<ButtonWrapper innerClass="btn-outline-dark">
						<button
							onClick={ () => setCurrentPage( currentPage + 1 ) }
							className="btn btn-outline-dark text-uppercase z-3 border-0"
						>
							Next Page
						</button>
					</ButtonWrapper>
				) }
			</div>
		</div>
	);
}
