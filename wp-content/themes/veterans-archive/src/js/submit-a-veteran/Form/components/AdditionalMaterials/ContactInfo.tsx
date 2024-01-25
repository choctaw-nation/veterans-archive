import React from 'react';
import { useFormContext } from 'react-hook-form';
import ErrorMessage from '../ErrorMessage';
export default function ContactInfo() {
	const {
		register,
		formState: { errors },
	} = useFormContext();
	console.log( errors );
	return (
		<div className="input-group my-2">
			<input
				type="text"
				className="form-control"
				{ ...register( 'contactInfo.name', {
					required: 'This field is required',
				} ) }
				required
				id="your-name"
				placeholder="Your name"
				autoComplete="name"
			/>
			{ errors?.contactInfo?.name && (
				<ErrorMessage>{ errors.contactInfo.name.message }</ErrorMessage>
			) }
			<input
				type="email"
				className="form-control"
				{ ...register( 'contactInfo.email', {
					required: 'This field is required',
				} ) }
				required
				id="email"
				placeholder="Your email"
			/>
			{ errors?.contactInfo?.email && (
				<ErrorMessage>
					{ errors.contactInfo.email.message }
				</ErrorMessage>
			) }
		</div>
	);
}
