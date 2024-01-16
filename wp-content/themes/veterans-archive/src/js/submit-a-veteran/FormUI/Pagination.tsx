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
				className="btn btn-primary"
				type="button"
				onClick={ () => {
					setCurrentPage( ( pageIndex ) => pageIndex - 1 );
				} }
				disabled={ 1 === currentPage }
			>
				Previous
			</button>
			<span className="d-block">Page { currentPage } of 3</span>
			<button
				className="btn btn-primary"
				type="button"
				onClick={ () => {
					trigger().then(
						( fieldsAreValidated ) =>
							fieldsAreValidated &&
							setCurrentPage( ( pageIndex ) => pageIndex + 1 )
					);
				} }
			>
				Next
			</button>
		</div>
	);
};

export default Pagination;
