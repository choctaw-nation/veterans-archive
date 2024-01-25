import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import ButtonWrapper from '../ui/ButtonWrapper';

interface PaginationProps {
	currentPage: number;
	setCurrentPage: ( currentPage: number ) => void;
}

export default function Pagination( {
	currentPage,
	setCurrentPage,
} ): React.FC< PaginationProps > {
	const { trigger } = useFormContext();
	async function handleClick() {
		const fieldsAreValidated = await trigger();
		if ( fieldsAreValidated ) {
			setCurrentPage( ( pageIndex ) => pageIndex + 1 );
		}
	}

	return (
		<div className="d-flex justify-content-between mt-5">
			{ 1 !== currentPage && (
				<ButtonWrapper>
					<button
						className="btn btn-outline-primary text-uppercase"
						type="button"
						onClick={ () => {
							setCurrentPage( ( pageIndex ) => pageIndex - 1 );
						} }
					>
						Previous
					</button>
				</ButtonWrapper>
			) }

			<span className="d-block">Page { currentPage } of 3</span>
			{ 3 !== currentPage && (
				<ButtonWrapper>
					<button
						className="btn btn-outline-dark-blue text-uppercase"
						type="button"
						onClick={ handleClick }
					>
						Next
					</button>
				</ButtonWrapper>
			) }

			{ 3 === currentPage && (
				<ButtonWrapper>
					<button
						type="submit"
						className="btn btn-dark-blue text-uppercase"
					>
						Submit
					</button>
				</ButtonWrapper>
			) }
		</div>
	);
}
