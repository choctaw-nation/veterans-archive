import React, { useState, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { ButtonWrapper } from './ButtonWrapper';

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
		<div className="row">
			<div className="col">
				<span className="d-block fw-semibold fs-4 display-6 text-uppercase text-dark-blue">
					{ label }
				</span>
				{ fields.map( ( field, i ) => {
					const registrationField =
						'radio' === args.type
							? args.registerField
							: `${ args.registerField }.${ i }`;
					return (
						<div className="form-check" key={ i }>
							<input
								className="form-check-input fs-5"
								type={ args.type || 'radio' }
								{ ...register( registrationField, {
									required,
								} ) }
								value={ field.value }
							/>{ ' ' }
							<label
								htmlFor={ args.registerField }
								className="form-check-label fs-5"
							>
								{ field.label }
							</label>
						</div>
					);
				} ) }
				{ args.custom && (
					<>
						<div className="form-check d-flex">
							<input
								className="form-check-input fs-5"
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
							<label className="form-check-label ms-2 fs-5">
								Other
							</label>
							{ otherIsSelected && (
								<input
									type="text"
									className="form-control ms-2 fs-5"
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
						</div>
					</>
				) }
				{ args.clearable && watchedValue && (
					<div className="mt-3 d-flex align-content-center column-gap-1">
						<ButtonWrapper>
							<button
								className="btn btn-outline-secondary"
								onClick={ () =>
									resetField( args.registerField )
								}
							>
								Clear Selection
							</button>
						</ButtonWrapper>
					</div>
				) }
			</div>
		</div>
	);
}
