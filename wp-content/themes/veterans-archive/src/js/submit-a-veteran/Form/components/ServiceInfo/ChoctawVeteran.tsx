import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import BootstrapButtonGroup from '../../ui/BootstrapButtonGroup';
import ButtonWrapper from '../../ui/ButtonWrapper';

export default function ChoctawVeteranOfTheMonth() {
	const [ numFields, setNumFields ] = useState( 0 );
	const { register } = useFormContext();
	if ( numFields === 0 ) {
		return (
			<ButtonWrapper classes="my-2">
				<button
					type="button"
					onClick={ () => setNumFields( 1 ) }
					className="btn btn-outline-green text-dark-blue text-uppercase w-100"
				>
					Add Choctaw Veteran of the Month Date Received
				</button>
			</ButtonWrapper>
		);
	} else {
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
}
