import React from 'react';
import { useFormContext } from 'react-hook-form';
import apiFetch from '@wordpress/api-fetch';

import { prepareFormData } from './utilities';

function onSubmit( formData ) {
	console.log( 'submit' );
	return;
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
	}
	// submitData();
}

function onError( errors ) {
	// console.log( errors );
}
export default function Form( { children }: { children: any } ) {
	const { handleSubmit } = useFormContext();

	return (
		<form
			className="border rounded-5 border-3 bg-white p-3 shadow needs-validation"
			noValidate
			onSubmit={ handleSubmit( onSubmit, onError ) }
		>
			{ children }
		</form>
	);
}
