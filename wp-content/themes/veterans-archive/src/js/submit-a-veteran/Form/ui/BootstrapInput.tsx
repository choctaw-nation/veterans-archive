import React, { useState, useEffect } from 'react';
import { RegisterOptions, useFormContext } from 'react-hook-form';
import ErrorMessage from '../components/ErrorMessage';

/**
 * Bootstrap Input. Defaults to "Text" type.
 *
 */
export default function BootstrapInput( {
	id,
	label,
	registration,
	args = {
		type: 'text',
		required: false,
		autoComplete: 'off',
	},
}: {
	id: string;
	label: string;
	registration: string;
	args?: {
		type?: string;
		required?: boolean | string;
		registrationArgs?: RegisterOptions;
		autoComplete?: string;
	};
} ) {
	const [ errorMessage, setErrorMessage ] = useState( null );
	const {
		register,
		formState: { errors },
	} = useFormContext();

	const { type = 'text', required, registrationArgs } = args;
	const requiredText =
		required && 'boolean' === typeof required
			? 'This field is required'
			: false;

	useEffect( () => {
		const errorKeys = registration.split( '.' );
		if ( Object.keys( errors ).length !== 0 ) {
			if ( Array.isArray( errorKeys ) && errorKeys.length === 2 ) {
				setErrorMessage(
					errors[ errorKeys[ 0 ] ][ errorKeys[ 1 ] ]?.message
				);
			}
		}
	}, [ errors, registration ] );

	return (
		<>
			<input
				type={ type }
				className="form-control"
				id={ id }
				required={ required }
				placeholder={ label }
				autoComplete={ args.autoComplete || 'off' }
				aria-label={ label }
				{ ...register( registration, {
					required: requiredText,
					...registrationArgs,
				} ) }
			/>
			{ errorMessage && <ErrorMessage>{ errorMessage }</ErrorMessage> }
		</>
	);
}
