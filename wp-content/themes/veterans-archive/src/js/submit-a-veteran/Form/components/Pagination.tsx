import React, { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { ButtonWrapper } from '../ui/ButtonWrapper';

interface PaginationProps {
	currentPage: number;
	setCurrentPage: ( currentPage: number ) => void;
}

export default function Pagination( {
	currentPage,
	setCurrentPage,
	ref,
} ): React.FC< PaginationProps > {
	const { trigger, setFocus } = useFormContext();

	useEffect( () => {
		if ( 2 === currentPage ) {
			setFocus( 'service_information.military_branch.0', {
				shouldSelect: true,
			} );
		}
		if ( 3 === currentPage && ref.current ) {
			ref.current.focus();
		}
	}, [ setFocus, currentPage, ref ] );

	async function handleClick() {
		const fieldsAreValidated = await trigger();
		if ( fieldsAreValidated ) {
			const nextPage = currentPage + 1;
			setCurrentPage( nextPage );
		}
	}

	return (
		<div className="d-flex justify-content-between mt-5">
			{ 1 !== currentPage && (
				<ButtonWrapper innerClass="btn-outline-primary">
					<button
						className="btn btn-lg btn-outline-primary border-0 text-uppercase z-2"
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
				<ButtonWrapper innerClass="btn-outline-dark-blue">
					<button
						className="btn btn-lg border-0 btn-outline-dark-blue text-uppercase"
						type="button"
						onClick={ handleClick }
					>
						Next
					</button>
				</ButtonWrapper>
			) }

			{ 3 === currentPage && (
				<ButtonWrapper innerClass="btn-outline-dark-blue">
					<button
						type="submit"
						className="btn btn-lg btn-outline-dark-blue text-uppercase border-0"
					>
						Submit
					</button>
				</ButtonWrapper>
			) }
		</div>
	);
}
