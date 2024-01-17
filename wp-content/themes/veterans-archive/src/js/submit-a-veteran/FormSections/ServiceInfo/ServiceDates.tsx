import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';

export default function ServiceDates() {
	const [ numFields, setNumFields ] = useState( 1 );
	const { register } = useFormContext();
	return (
		<>
			<label className="d-block fw-semibold form-label">
				Dates of Service
			</label>
			{ [ ...Array( numFields ) ].map( ( _, i ) => (
				<div key={ i } className="input-group">
					<input
						type="number"
						className="form-control"
						id={ `service-date-start-${ i }` }
						{ ...register( 'service.serviceDate', {
							valueAsNumber: true,
							min: 1800,
						} ) }
						placeholder="Insert Start Date"
					/>
					<input
						type="number"
						className="form-control"
						id={ `service-date-end-${ i }` }
						{ ...register( 'service.serviceDate', {
							valueAsNumber: true,
							min: 1800,
						} ) }
						placeholder="Insert End Date"
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
