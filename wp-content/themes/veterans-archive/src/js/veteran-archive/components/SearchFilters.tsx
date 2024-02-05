import React from 'react';
import BSSelect from '../ui/BSSelect';

export default function SearchFilters( { selected, setSelected } ) {
	const { branches, wars, decorations } = cnoSiteData.vetData.searchFilters;
	const filters = [
		{ label: 'Select a Branch', values: branches },
		{ label: 'Select a Conflict', values: wars },
		{ label: 'Select a Decoration', values: decorations },
	];
	return (
		<>
			{ filters.map( ( filter, i ) => (
				<div className="col" key={ i }>
					<BSSelect
						options={ [
							{ label: filter.label, value: '' },
							...filter.values.map( ( wpTerm ) => {
								return {
									label: wpTerm.name,
									value: wpTerm.slug,
								};
							} ),
						] }
						selected={ selected }
						setSelected={ setSelected }
					/>
				</div>
			) ) }
		</>
	);
}
