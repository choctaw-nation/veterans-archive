import React from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import StateSelect from './StateSelect';
import { ButtonWrapper } from '../../ui/ButtonWrapper';

const fieldGroupName = 'bio.home_areas';
export default function HomeAreas() {
	const { register } = useFormContext();
	const { fields, append, remove } = useFieldArray( {
		name: fieldGroupName,
	} );
	return (
		<>
			<div className="row">
				<div className="col">
					<span className="fw-semibold fs-4 display-6 text-uppercase text-dark-blue">
						Home Areas
					</span>
					<br />
					<small className="fs-6 mb-2 d-block" id="description">
						Current or last known location of the veteran.
					</small>
				</div>
			</div>
			<div className="row g-2">
				{ fields.length === 0 && (
					<div className="col d-flex">
						<ButtonWrapper
							classes="my-2"
							innerClass="btn-outline-green"
						>
							<button
								type="button"
								onClick={ () =>
									append( {
										city: '',
										county: '',
										state: '',
									} )
								}
								className="btn btn-outline-green border-0 z-2 text-dark-blue text-uppercase"
							>
								Add Home Area
							</button>
						</ButtonWrapper>
					</div>
				) }
				{ fields.map( ( field, i ) => (
					<div key={ field.id }>
						<div className="input-group">
							<input
								type="text"
								className="form-control fs-5"
								id="city"
								placeholder="City"
								{ ...register(
									`${ fieldGroupName }.${ i }.city`
								) }
							/>
							<input
								type="text"
								className="form-control fs-5"
								id="county"
								autoComplete="off"
								placeholder="County"
								{ ...register(
									`${ fieldGroupName }.${ i }.county`
								) }
							/>
							<StateSelect
								registration={ `${ fieldGroupName }.${ i }.state` }
							/>
							<div
								className="btn-group"
								role="group"
								aria-label={
									'a pair of buttons that adds or removes a set of location fields'
								}
							>
								<button
									type="button"
									className="btn btn-secondary btn-sm"
									onClick={ () =>
										append( {
											city: '',
											county: '',
											state: '',
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
					</div>
				) ) }
			</div>
		</>
	);
}
