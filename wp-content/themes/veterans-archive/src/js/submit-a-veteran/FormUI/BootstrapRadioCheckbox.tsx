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

	const required = args.required
		? `${
				'string' === typeof args.required
					? args.required
					: 'This field is required'
		  }`
		: false;

	const watchedValue = watch( args.registerField );
	useEffect( () => {
		if ( 'Other' === watchedValue ) {
			setOtherIsSelected( true );
		} else if (
			watchedValue &&
			'string' !== typeof watchedValue &&
			watchedValue.some( ( val ) => val === 'Other' )
		) {
			setOtherIsSelected( true );
		} else {
			setOtherIsSelected( false );
		}
	}, [ watchedValue ] );

	return (
		<div className="form-check">
			<div className="row align-items-center flex-shrink-1">
				<span className="d-block fw-semibold">{ label }:</span>
				{ fields.map( ( field, i ) => {
					return (
						<div
							className="d-flex align-content-center column-gap-1"
							key={ i }
						>
							<input
								className="form-check-input"
								type={ args.type || 'radio' }
								{ ...register( args.registerField, {
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
								{ ...register( args.registerField, {
									required,
								} ) }
								value="Other"
							/>{ ' ' }
							<span className="d-block">Other</span>
						</div>
						{ otherIsSelected && (
							<input
								type="text"
								{ ...register(
									`${ args.registerField }Other`
								) }
								placeholder="Please specify"
							/>
						) }
					</>
				) }
				{ args.clearable && watch( args.registerField ) && (
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
