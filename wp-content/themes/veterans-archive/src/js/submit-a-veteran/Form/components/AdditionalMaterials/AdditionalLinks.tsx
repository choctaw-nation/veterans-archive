import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import BootstrapButtonGroup from '../../ui/BootstrapButtonGroup';
import ButtonWrapper from '../../ui/ButtonWrapper';

export default function AdditionalLinks() {
	const [ numFields, setNumFields ] = useState( 0 );
	const { register } = useFormContext();
	if ( 0 === numFields ) {
		return (
			<ButtonWrapper classes="my-2">
				<button
					type="button"
					onClick={ () => setNumFields( 1 ) }
					className="btn btn-outline-green text-dark-blue text-uppercase w-100"
				>
					Add Additional Links
				</button>
			</ButtonWrapper>
		);
	} else {
		return (
			<div className="my-3">
				<span className="d-block fw-semibold fs-5">
					Additional Links
				</span>
				{ [ ...Array( numFields ) ].map( ( _, i ) => (
					<div key={ i } className="input-group mb-3">
						<input
							type="text"
							className="form-control"
							id={ `link-${ i }-name` }
							{ ...register(
								`additional_materials.links.${ i }.description_of_material`
							) }
							placeholder={ `Insert link name` }
						/>
						<input
							type="url"
							className="form-control"
							id={ `link-${ i }-url` }
							{ ...register(
								`additional_materials.links.${ i }.material_link`
							) }
							placeholder={ `Insert url` }
						/>
						<input
							type="hidden"
							{ ...register(
								`additional_materials.links.${ i }.material_type`,
								{ value: 'link' }
							) }
						/>
						<BootstrapButtonGroup onClick={ setNumFields } />
					</div>
				) ) }
			</div>
		);
	}
}
