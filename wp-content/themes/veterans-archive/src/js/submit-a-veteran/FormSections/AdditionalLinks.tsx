import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import BootstrapButtonGroup from '../FormUI/BootstrapButtonGroup';

export default function AdditionalLinks() {
	const [ numFields, setNumFields ] = useState( 1 );
	const { register } = useFormContext();
	return (
		<div>
			<span className="d-block fw-semibold">Additional Links</span>
			{ [ ...Array( numFields ) ].map( ( _, i ) => (
				<div key={ i } className="d-flex mb-3">
					<input
						type="text"
						className="form-control"
						id={ `link-${ i }-name` }
						{ ...register( `additionalMaterials.${ i }.linkName` ) }
						placeholder={ `Insert link name` }
					/>
					<input
						type="url"
						className="form-control"
						id={ `link-${ i }-url` }
						{ ...register( `additionalMaterials.${ i }.link` ) }
						placeholder={ `Insert url` }
					/>
					<BootstrapButtonGroup onClick={ setNumFields } />
				</div>
			) ) }
		</div>
	);
}
