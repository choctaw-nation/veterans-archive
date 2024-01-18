import React, { useEffect } from 'react';
import { RegisterOptions, useFormContext } from 'react-hook-form';

export type BootstrapSelectProps = {
	fields: Array< {
		value: string;
		label: string;
	} >;
	args: {
		defaultValue?: string;
		registration: string;
		ariaLabel: string;
		additionalClasses?: string;
		registrationArgs?: RegisterOptions;
	};
};
export default function BootstrapSelect( {
	fields,
	args,
}: BootstrapSelectProps ) {
	const { register, setValue } = useFormContext();
	const {
		ariaLabel,
		additionalClasses,
		registration,
		registrationArgs,
		defaultValue,
	} = args;
	useEffect( () => {
		if ( defaultValue ) {
			setValue( registration, defaultValue );
		}
	}, [ setValue, registration, defaultValue ] );
	return (
		<select
			className={ `form-select ${ additionalClasses }` }
			aria-label={ ariaLabel }
			{ ...register( registration, registrationArgs ) }
		>
			{ fields.map( ( { value, label }, i ) => (
				<option value={ value } key={ i }>
					{ label }
				</option>
			) ) }
		</select>
	);
}
