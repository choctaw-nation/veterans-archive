import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';

function makePlural( word: string ): string {
	if ( word.endsWith( 'y' ) ) {
		return word.slice( 0, -1 ) + 'ies';
	} else {
		return word + 's';
	}
}

/**
 * ACF Repeater
 * @param {string} label - The label for the repeater (singular, not plural)
 * @param {string} id - The id for the repeater
 * @param {string} registration - The registration for the repeater
 */
export default function Repeater( {
	label,
	id,
	registration,
	type = 'text',
}: {
	label: string;
	id: string;
	registration: string;
	type?: 'text' | 'url';
} ) {
	const [ numFields, setNumFields ] = useState( 1 );
	const { register } = useFormContext();

	return (
		<>
			<span className="d-block fw-semibold">{ makePlural( label ) }</span>
			{ [ ...Array( numFields ) ].map( ( _, i ) => (
				<div key={ i } className="d-flex">
					<input
						type={ type }
						className="form-control"
						id={ `${ id }-${ i }` }
						{ ...register( registration ) }
						placeholder={ `Insert ${ label }` }
					/>
					<button
						type="button"
						className="input-group-text text-bg-secondary d-flex align-items-center"
						onClick={ () => setNumFields( numFields + 1 ) }
					>
						+
					</button>
					<button
						type="button"
						className="input-group-text text-bg-secondary d-flex align-items-center"
						onClick={ () =>
							setNumFields( numFields > 1 ? numFields - 1 : 1 )
						}
					>
						&minus;
					</button>
				</div>
			) ) }
		</>
	);
}
