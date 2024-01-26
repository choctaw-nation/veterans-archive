import React from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import ButtonWrapper from '../../ui/ButtonWrapper';
import ErrorMessage from '../ErrorMessage';

const FIELD_NAME: string = 'service_information.dates_of_service';
export default function ServiceDates() {
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
							service_start: '',
							service_end: '',
						} )
					}
					className="btn btn-outline-green text-dark-blue text-uppercase w-100"
				>
					Add Service Dates
				</button>
			</ButtonWrapper>
		);
	} else {
		return (
			<>
				<label className="d-block fw-semibold form-label">
					Dates of Service
				</label>
				{ fields.map( ( field, i ) => (
					<div key={ field.id } className="input-group mb-3">
						<input
							type="number"
							className="form-control"
							id={ `service-date-start-${ i }` }
							{ ...register(
								`${ FIELD_NAME }.${ i }.service_start`,
								{
									valueAsNumber: true,
									min: {
										value: 1800,
										message:
											'Year must be at least 4 digits',
									},
								}
							) }
							placeholder="Insert Start Date"
						/>
						{ errors?.service_information?.dates_of_service?.[ i ]
							?.service_start && (
							<ErrorMessage>
								{
									errors.service_information.dates_of_service[
										i
									].service_start.message
								}
							</ErrorMessage>
						) }
						<input
							type="number"
							className="form-control"
							id={ `service-date-end-${ i }` }
							{ ...register(
								`${ FIELD_NAME }.${ i }.service_end`,
								{
									valueAsNumber: true,
									min: {
										value: 1800,
										message:
											'Year must be at least 4 digits',
									},
								}
							) }
							placeholder="Insert End Date"
						/>
						{ errors?.service_information?.dates_of_service?.[ i ]
							?.service_end && (
							<ErrorMessage>
								{
									errors.service_information.dates_of_service[
										i
									].service_end.message
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
										service_start: '',
										service_end: '',
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
