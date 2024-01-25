import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import BootstrapButtonGroup from '../../ui/BootstrapButtonGroup';
import StateSelect from './StateSelect';
import ButtonWrapper from '../../ui/ButtonWrapper';

export default function HomeAreas() {
	const [ numFields, setNumFields ] = useState( 0 );
	const { register } = useFormContext();
	return (
		<>
			<div className="row">
				<div className="col">
					<span className="fw-semibold">Home Areas</span>
					<br />
					<small className="mb-0" id="description">
						Current or last known location of the veteran.
					</small>
				</div>
			</div>
			<div className="row g-2">
				{ numFields === 0 && (
					<div className="col d-flex">
						<ButtonWrapper classes="my-2">
							<button
								type="button"
								onClick={ () => setNumFields( 1 ) }
								className="btn btn-outline-green text-dark-blue text-uppercase"
							>
								Add Home Area
							</button>
						</ButtonWrapper>
					</div>
				) }
				{ [ ...Array( numFields ) ].map( ( _, i ) => (
					<div className="input-group" key={ i }>
						<input
							type="text"
							className="form-control"
							id="city"
							placeholder="City"
							{ ...register( `bio.home_areas.${ i }.city` ) }
						/>
						<input
							type="text"
							className="form-control"
							id="county"
							autoComplete="off"
							placeholder="County"
							{ ...register( `bio.home_areas.${ i }.county` ) }
						/>
						<StateSelect
							registration={ `bio.home_areas.${ i }.state` }
						/>
						<BootstrapButtonGroup onClick={ setNumFields } />
					</div>
				) ) }
			</div>
		</>
	);
}
