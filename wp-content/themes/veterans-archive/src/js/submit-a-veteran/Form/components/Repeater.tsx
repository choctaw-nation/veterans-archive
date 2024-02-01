import React from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import ButtonWrapper from '../ui/ButtonWrapper';

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
	const { fields, append, remove } = useFieldArray( {
		name: registration,
	} );
	const { register } = useFormContext();

	if ( fields.length === 0 ) {
		return (
			<ButtonWrapper classes="my-2" innerClass="btn-outline-green">
				<button
					type="button"
					onClick={ () =>
						append( {
							[ label ]: '',
						} )
					}
					className="btn btn-outline-green border-0 z-2 text-dark-blue text-uppercase w-100"
				>
					Add { label }
				</button>
			</ButtonWrapper>
		);
	} else {
		return (
			<>
				<span className="d-block fw-semibold fs-5">
					{ makePlural( label ) }
				</span>
				{ fields.map( ( field, index ) => (
					<div key={ field.id } className="d-flex mb-3">
						<input
							type={ type }
							className="form-control fs-5"
							id={ `${ id }-${ index }` }
							{ ...register(
								`${ registration }.${ index }.${ label }`
							) }
							placeholder={ `Insert ${ label }` }
						/>
						<div
							className="btn-group"
							role="group"
							aria-label="A pair of buttons that adds or removes a set of input fields"
						>
							<button
								type="button"
								className="btn btn-secondary btn-sm"
								onClick={ () =>
									append( {
										[ label ]: '',
									} )
								}
							>
								+
							</button>
							<button
								type="button"
								className="btn btn-secondary btn-sm"
								onClick={ () => remove( index ) }
							>
								&minus;
							</button>
						</div>
					</div>
				) ) }
			</>
		);
	}
}
