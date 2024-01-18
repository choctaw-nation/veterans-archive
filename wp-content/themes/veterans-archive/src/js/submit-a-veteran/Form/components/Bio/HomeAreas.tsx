import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import BootstrapButtonGroup from '../../ui/BootstrapButtonGroup';
import StateSelect from './StateSelect';

export default function HomeAreas() {
	const [ numFields, setNumFields ] = useState( 1 );
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
				{ [ ...Array( numFields ) ].map( ( _, i ) => (
					<div className="input-group" key={ i }>
						<input
							type="text"
							className="form-control"
							id="city"
							placeholder="City"
							{ ...register( `bio.homeArea.${ i }.city` ) }
						/>
						<input
							type="text"
							className="form-control"
							id="county"
							placeholder="County"
							{ ...register( `bio.homeArea.${ i }.county` ) }
						/>
						<StateSelect
							registration={ `bio.homeArea.${ i }.state` }
						/>
						<BootstrapButtonGroup onClick={ setNumFields } />
					</div>
				) ) }
			</div>
		</>
	);
}
