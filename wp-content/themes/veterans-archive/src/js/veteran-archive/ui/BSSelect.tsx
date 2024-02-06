import React from 'react';
import { ButtonWrapper } from '../../submit-a-veteran/Form/ui/ButtonWrapper';

/**
 * Simple Bootstrap select. First option is selected by default.
 */
export default function BSSelect( {
	options,
	selected,
	setSelected,
	ariaLabel,
}: {
	options: Array< { value: string; label: string } >;
	selected: string;
	setSelected: CallableFunction;
	ariaLabel: string;
} ) {
	return (
		<ButtonWrapper
			classes="btn-ouline-light h-100"
			innerClass="btn-outline-light h-100"
		>
			<select
				className="form-select btn btn-outline-light text-uppercase h-100 fs-5 z-2 w-100 border-0"
				aria-label={ ariaLabel }
				value={ selected }
				onChange={ ( ev ) => {
					setSelected( ev.target.value );
				} }
			>
				{ options.map( ( { value, label }, i ) => {
					return (
						<option
							value={ value }
							key={ i }
							style={ { textTransform: 'none' } }
						>
							{ label }
						</option>
					);
				} ) }
			</select>
		</ButtonWrapper>
	);
}
