import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';

export default function AdditionalLinks( {} ) {
	const [ numFields, setNumFields ] = useState( 1 );
	const { register } = useFormContext();
	return (
		<div>
			<span className="d-block fw-semibold">Additional Links</span>
			{ [ ...Array( numFields ) ].map( ( _, i ) => (
				<div key={ i } className="d-flex">
					<input
						type="text"
						className="form-control"
						id={ `link-${ i }-name` }
						{ ...register( 'additionalMaterials.linkName' ) }
						placeholder={ `Insert link name` }
					/>
					<input
						type="url"
						className="form-control"
						id={ `link-${ i }-url` }
						{ ...register( 'additionalMaterials.link' ) }
						placeholder={ `Insert url` }
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
		</div>
	);
}
