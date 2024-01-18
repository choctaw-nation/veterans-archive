import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import BootstrapButtonGroup from '../../ui/BootstrapButtonGroup';

export default function ChoctawVeteranOfTheMonth() {
	const [ numFields, setNumFields ] = useState( 1 );
	const { register } = useFormContext();
	return (
		<>
			<label className="d-block fw-semibold form-label">
				Choctaw Veteran of the Month
			</label>
			{ [ ...Array( numFields ) ].map( ( _, i ) => (
				<div key={ i } className="input-group mb-3">
					<input
						type="number"
						className="form-control"
						id={ `year-received-${ i }` }
						{ ...register(
							`service_information.choctaw_veteran_of_the_month.${ i }.year_received`,
							{
								valueAsNumber: true,
								min: 1800,
							}
						) }
						aria-label="Year Received"
						aria-describedby="label.form-label"
						placeholder="Year Received"
					/>
					<input
						type="number"
						className="form-control"
						id={ `district-${ i }` }
						aria-label="District"
						{ ...register(
							`service_information.choctaw_veteran_of_the_month.${ i }.district`,
							{
								valueAsNumber: true,
								min: 1,
								max: 12,
							}
						) }
						placeholder="District"
					/>
					<BootstrapButtonGroup onClick={ setNumFields } />
				</div>
			) ) }
		</>
	);
}
