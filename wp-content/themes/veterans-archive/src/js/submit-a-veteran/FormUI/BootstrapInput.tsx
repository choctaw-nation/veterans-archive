import React from 'react';
import { RegisterOptions, useFormContext } from 'react-hook-form';
/**
 * Bootstrap Input. Defaults to "Text" type.
 *
 */
export default function BootstrapInput( {
	type = 'text',
	id,
	label,
	registration,
	required = false,
	registrationArgs,
}: {
	type?: string;
	id: string;
	label: string;
	registration: string;
	required?: boolean | string;
	registrationArgs?: RegisterOptions;
} ) {
	const { register } = useFormContext();
	const requiredText =
		required && 'boolean' === typeof required
			? 'This field is required'
			: false;
	const args = {
		required: requiredText,
		...registrationArgs,
	};
	return (
		<>
			<label htmlFor={ id } className="form-label">
				{ label }
			</label>
			<input
				type={ type }
				className="form-control"
				id={ id }
				{ ...register( registration, args ) }
			/>
		</>
	);
}
