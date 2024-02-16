import React, { memo } from 'react';
import BSSelect from '../ui/BSSelect';
import { ButtonWrapper } from '../../submit-a-veteran/Form/ui/ButtonWrapper';

export const SearchFilters = memo( function SearchFilters( {
	selected,
	setSelected,
	searchInputRef,
} ) {
	const { branches, wars, decorations } =
		window.cnoSiteData.vetData.searchFilters;

	const filters = [
		{
			id: 'branches',
			label: 'Select a branch',
			values: [
				{ label: 'SERVICE BRANCH', value: '' },
				...branches.map( ( wpTerm ) => {
					return {
						label: wpTerm.name,
						value: wpTerm.slug,
					};
				} ),
			],
		},
		{
			id: 'decorations',
			label: 'Select a decoration',
			values: [
				{ label: 'SELECT A DECORATION', value: '' },
				...decorations.map( ( wpTerm ) => {
					return {
						label: wpTerm.name,
						value: wpTerm.slug,
					};
				} ),
			],
		},
		{
			id: 'wars',
			label: 'Select a conflict',
			values: [
				{ label: 'CONFLICTS', value: '' },
				...wars.map( ( wpTerm ) => {
					return {
						label: wpTerm.name,
						value: wpTerm.slug,
					};
				} ),
			],
		},
	];

	function handleSelection( choice, filter ) {
		setSelected( ( prev ) => {
			return { ...prev, [ filter ]: choice };
		} );
	}

	const hasSelected = Object.values( selected ).some( ( value ) => value );
	return (
		<>
			{ filters.map( ( filter, i ) => (
				<div className="col-auto flex-grow-0" key={ i }>
					<BSSelect
						options={ filter.values }
						selected={ selected[ filter.id ] }
						setSelected={ ( choice: string ) => {
							handleSelection( choice, filter.id );
						} }
						ariaLabel={ filter.label }
					/>
				</div>
			) ) }
			<div className="col-auto flex-grow-0">
				{ hasSelected && (
					<ButtonWrapper
						classes="btn-outline-light"
						innerClass="btn-outline-light"
					>
						<button
							className="btn btn-outline-light z-2 border-0 w-100 text-uppercase fs-5"
							onClick={ ( ev ) => {
								ev.preventDefault();
								setSelected( {
									branches: '',
									wars: '',
									decorations: '',
								} );
								searchInputRef.current.focus();
							} }
						>
							Reset Filters
						</button>
					</ButtonWrapper>
				) }
			</div>
		</>
	);
} );
