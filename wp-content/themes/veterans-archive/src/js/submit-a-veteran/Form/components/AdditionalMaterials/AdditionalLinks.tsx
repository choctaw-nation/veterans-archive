import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import BootstrapButtonGroup from '../../ui/BootstrapButtonGroup';

export default function AdditionalLinks() {
	const [ numFields, setNumFields ] = useState( 1 );
	const { register } = useFormContext();
	return (
		<div className="my-3">
			<span className="d-block fw-semibold fs-5">Additional Links</span>
			{ [ ...Array( numFields ) ].map( ( _, i ) => (
				<div key={ i } className="input-group mb-3">
					<input
						type="text"
						className="form-control"
						id={ `link-${ i }-name` }
						{ ...register(
							`additional_materials.${ i }.description_of_material`
						) }
						placeholder={ `Insert link name` }
					/>
					<input
						type="url"
						className="form-control"
						id={ `link-${ i }-url` }
						{ ...register(
							`additional_materials.${ i }.material_link`
						) }
						placeholder={ `Insert url` }
					/>
					<BootstrapButtonGroup onClick={ setNumFields } />
				</div>
			) ) }
		</div>
	);
}
