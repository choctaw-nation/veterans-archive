import React from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { ButtonWrapper } from '../../ui/ButtonWrapper';
import ErrorMessage from '../ErrorMessage';

const FIELD_NAME: string = 'service_information.choctaw_veteran_of_the_month';
export default function ChoctawVeteranOfTheMonth() {
	const { fields, append, remove } = useFieldArray( {
		name: FIELD_NAME,
	} );
	const {
		register,
		formState: { errors },
	} = useFormContext();

	if ( fields.length === 0 ) {
		return (
			<ButtonWrapper classes="my-2">
				<button
					type="button"
					onClick={ () =>
						append( {
							year_received: null,
							district: null,
						} )
					}
					className="btn btn-outline-green text-dark-blue text-uppercase w-100"
				>
					Add Choctaw Veteran of the Month Date Received
				</button>
			</ButtonWrapper>
		);
	} else {
		return (
			<>
				<label className="d-block fw-semibold form-label display-6 text-uppercase text-dark-blue">
					Choctaw Veteran of the Month
				</label>
				{ fields.map( ( field, i ) => (
					<div key={ field.id } className="input-group mb-3">
						<input
							type="number"
							className="form-control"
							id={ `year-received-${ i }` }
							{ ...register(
								`${ FIELD_NAME }.${ i }.year_received`,
								{
									valueAsNumber: true,
									min: {
										value: 1800,
										message:
											'Year must be at least 4 digits',
									},
								}
							) }
							aria-label="Year Received"
							aria-describedby="label.form-label"
							placeholder="Year Received"
						/>
						{ errors?.service_information
							?.choctaw_veteran_of_the_month[ i ]
							.year_received && (
							<ErrorMessage>
								{
									errors.service_information
										.choctaw_veteran_of_the_month[ i ]
										.year_received.message
								}
							</ErrorMessage>
						) }
						<input
							type="number"
							className="form-control"
							id={ `district-${ i }` }
							aria-label="District"
							{ ...register( `${ FIELD_NAME }.${ i }.district`, {
								valueAsNumber: true,
								min: {
									value: 1,
									message:
										'District must be between 1 and 12',
								},
								max: {
									value: 12,
									message:
										'District must be between 1 and 12',
								},
							} ) }
							placeholder="District"
						/>
						{ errors?.service_information
							?.choctaw_veteran_of_the_month[ i ].district && (
							<ErrorMessage>
								{
									errors.service_information
										.choctaw_veteran_of_the_month[ i ]
										.district.message
								}
							</ErrorMessage>
						) }
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
										year_received: null,
										district: null,
									} )
								}
							>
								+
							</button>
							<button
								type="button"
								className="btn btn-secondary btn-sm"
								onClick={ () => remove( i ) }
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
