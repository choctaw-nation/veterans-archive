import React from 'react';

/**
 * Simple Bootstrap select. First option is selected by default.
 */
export default function BSSelect( {
	options,
	selected,
	setSelected,
}: {
	options: Array< { value: string; label: string } >;
} ) {
	return (
		<select
			className="form-select"
			aria-label="Default select example"
			defaultValue={ '' }
			onChange={ ( ev ) => setSelected( ev.target.value ) }
		>
			{ options.map( ( { value, label }, i ) => {
				return (
					<option value={ value } key={ i } selected={ selected }>
						{ label }
					</option>
				);
			} ) }
		</select>
	);
}
