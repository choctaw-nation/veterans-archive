import React from 'react';
import { useForm } from 'react-hook-form';
import apiFetch from '@wordpress/api-fetch';
import { prepareFormData } from './utilities';
import BioFields from './FormElements/BIoFields';

export default function Form() {
	const { register, handleSubmit, watch } = useForm();

	const onSubmit = ( formData ) => {
		const preparedData = prepareFormData( formData );
		async function submitData() {
			const response = await apiFetch( {
				path: 'veterans-archive/v1/veterans',
				method: 'POST',
				body: JSON.stringify( preparedData ),
				headers: {
					'Content-Type': 'application/json',
				},
			} );
			console.log( response );
		}
		submitData();
	};

	return (
		<form onSubmit={ handleSubmit( onSubmit ) }>
			<BioFields register={ register } watch={ watch } />

			<button type="submit" className="btn btn-primary btn-lg">
				Submit
			</button>
		</form>
	);
}
