import React, { useState, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

export type RadioButtonField = {
	label: string;
	value: string;
	type?: 'text' | 'radio';
};

export type Args = {
	registerField: string;
	required?: string | boolean;
	custom?: true;
	multipleCustomValues?: true;
	clearable?: true;
	type?: 'radio' | 'checkbox';
};

export default function BootstrapRadioCheckbox( {
	args,
	label,
	fields,
}: {
	args: Args;
	label: string;
	fields: Array< RadioButtonField >;
} ) {
	const [ otherIsSelected, setOtherIsSelected ] = useState( false );
	const { register, watch, resetField } = useFormContext();

	// If required is a string, use that as the error message. Otherwise, use the default message.
	const required = args.required
		? `${
				'string' === typeof args.required
					? args.required
					: 'This field is required'
		  }`
		: false;

	const watchedValue = watch( args.registerField );
	const isChecked = watchedValue?.other?.checked;

	useEffect( () => {
		if ( 'Other' === watchedValue ) {
			setOtherIsSelected( true );
		} else if (
			watchedValue &&
			'string' !== typeof watchedValue &&
			'other' in watchedValue
		) {
			setOtherIsSelected( isChecked );
		} else {
			setOtherIsSelected( false );
		}
	}, [ watchedValue, isChecked ] );

	return (
		<div className="form-check">
			<div className="row align-items-center flex-shrink-1">
				<span className="d-block fw-semibold">{ label }:</span>
				{ fields.map( ( field, i ) => {
					const registrationField =
						'radio' === args.type
							? args.registerField
							: `${ args.registerField }.${ i }`;
					return (
						<div
							className="d-flex align-content-center column-gap-1"
							key={ i }
						>
							<input
								className="form-check-input"
								type={ args.type || 'radio' }
								{ ...register( registrationField, {
									required,
								} ) }
								value={ field.value }
							/>{ ' ' }
							<label
								htmlFor={ args.registerField }
								className="form-check-label d-block"
							>
								{ field.label }
							</label>
						</div>
					);
				} ) }
				{ args.custom && (
					<>
						<div className="d-flex align-content-center column-gap-1">
							<input
								className="form-check-input"
								type={ args.type || 'radio' }
								{ ...register(
									`${
										'radio' === args.type
											? args.registerField
											: `${ args.registerField }.other.checked`
									}`,
									{
										required,
									}
								) }
								value="Other"
							/>{ ' ' }
							<span className="d-block">Other</span>
						</div>
						{ otherIsSelected && (
							<input
								type="text"
								{ ...register(
									`${
										'radio' === args.type
											? args.registerField
											: `${ args.registerField }.other.value`
									}`
								) }
								placeholder="Please specify"
							/>
						) }
					</>
				) }
				{ args.clearable && watchedValue && (
					<div className="d-flex align-content-center column-gap-1">
						<button
							className="btn btn-outline-secondary"
							onClick={ () => resetField( args.registerField ) }
						>
							Clear Selection
						</button>
					</div>
				) }
			</div>
		</div>
	);
}
