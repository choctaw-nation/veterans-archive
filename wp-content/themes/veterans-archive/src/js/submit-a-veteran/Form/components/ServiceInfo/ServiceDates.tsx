import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import BootstrapButtonGroup from '../../ui/BootstrapButtonGroup';

export default function ServiceDates() {
	const [ numFields, setNumFields ] = useState( 1 );
	const { register } = useFormContext();
	return (
		<>
			<label className="d-block fw-semibold form-label">
				Dates of Service
			</label>
			{ [ ...Array( numFields ) ].map( ( _, i ) => (
				<div key={ i } className="input-group mb-3">
					<input
						type="number"
						className="form-control"
						id={ `service-date-start-${ i }` }
						{ ...register( `service.serviceDate.${ i }.start`, {
							valueAsNumber: true,
							min: 1800,
						} ) }
						placeholder="Insert Start Date"
					/>
					<input
						type="number"
						className="form-control"
						id={ `service-date-end-${ i }` }
						{ ...register( `service.serviceDate.${ i }.end`, {
							valueAsNumber: true,
							min: 1800,
						} ) }
						placeholder="Insert End Date"
					/>
					<BootstrapButtonGroup onClick={ setNumFields } />
				</div>
			) ) }
		</>
	);
}
