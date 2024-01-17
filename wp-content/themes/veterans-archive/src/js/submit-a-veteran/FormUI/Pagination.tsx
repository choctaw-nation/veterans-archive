import React from 'react';
import { useFormContext } from 'react-hook-form';

interface PaginationProps {
	currentPage: number;
	setCurrentPage: ( currentPage: number ) => void;
}

const Pagination: React.FC< PaginationProps > = ( {
	currentPage,
	setCurrentPage,
} ) => {
	const { trigger } = useFormContext();

	return (
		<div className="d-flex justify-content-between mt-5">
			<button
				className="btn btn-outline-primary"
				type="button"
				onClick={ () => {
					setCurrentPage( ( pageIndex ) => pageIndex - 1 );
				} }
				disabled={ 1 === currentPage }
			>
				Previous
			</button>
			<span className="d-block">Page { currentPage } of 3</span>
			{ 3 !== currentPage && (
				<button
					className="btn btn-primary"
					type="button"
					onClick={ () => {
						trigger().then( ( fieldsAreValidated ) => {
							if ( fieldsAreValidated ) {
								setCurrentPage(
									( pageIndex ) => pageIndex + 1
								);
							} else {
								document
									.querySelectorAll( '.invalid-feedback' )
									.forEach( ( el ) => {
										el.style.display = 'block';
									} );
							}
						} );
					} }
				>
					Next
				</button>
			) }

			{ 3 === currentPage && (
				<button type="submit" className="btn btn-primary">
					Submit
				</button>
			) }
		</div>
	);
};

export default Pagination;
