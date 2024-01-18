import React from 'react';
import { RegisterOptions, useFormContext } from 'react-hook-form';
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
	},
}: {
	id: string;
	label: string;
	registration: string;
	args?: {
		type?: string;
		required?: boolean | string;
		registrationArgs?: RegisterOptions;
	};
} ) {
	const { register } = useFormContext();

	const { type = 'text', required, registrationArgs } = args;
	const requiredText =
		required && 'boolean' === typeof required
			? 'This field is required'
			: false;
	return (
		<input
			type={ type }
			className="form-control"
			id={ id }
			required={ required }
			placeholder={ label }
			aria-label={ label }
			{ ...register( registration, {
				required: requiredText,
				...registrationArgs,
			} ) }
		/>
	);
}
