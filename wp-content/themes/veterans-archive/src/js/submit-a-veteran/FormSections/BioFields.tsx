import React from 'react';
import { useFormContext } from 'react-hook-form';

import ErrorMessage from '../FormUI/ErrorMessage';
import BootstrapInput from '../FormUI/BootstrapInput';
import BootstrapRadioCheckbox from '../FormUI/BootstrapRadioCheckbox';

const fields = {
	section1: [
		{
			id: 'firstName',
			label: 'First Name',
			required: true,
		},
		{
			id: 'middleName',
			label: 'Middle Name or Initial',
		},
		{
			id: 'lastName',
			label: 'Last Name',
			required: true,
		},
	],
	section2: [
		{ id: 'nickname', label: 'Nickname' },
		{ id: 'homeTown', label: 'Home Town(s)' },
		{ id: 'dateOfBirth', label: 'Year of Birth', type: 'number' },
		{ id: 'dateOfDeath', label: 'Year of Death', type: 'number' },
	],
};

export default function BioFields() {
	const { watch, formState } = useFormContext();
	const { errors } = formState;
	const gender = watch( 'bio.gender', 'male' );
	return (
		<div className="bio">
			<h2>Bio</h2>
			<div className="row row-cols-1 row-cols-md-3">
				{ fields.section1.map( ( field ) => (
					<div className="col d-flex flex-wrap" key={ field.id }>
						<BootstrapInput
							id={ field.id }
							label={ field.label }
							registration={ `bio.${ field.id }` }
							required={ field.required }
						/>
						{ field.required && errors?.bio?.[ field.id ] && (
							<ErrorMessage>
								{ errors.bio[ field.id ].message }
							</ErrorMessage>
						) }
					</div>
				) ) }
			</div>
			<div className="row row-cols-1 row-cols-sm-2">
				<div className="col">
					<BootstrapRadioCheckbox
						label="Gender"
						fields={ [
							{
								label: 'Male',
								value: 'male',
							},
							{
								label: 'Female',
								value: 'female',
							},
						] }
						args={ {
							registerField: 'bio.gender',
							required: true,
						} }
					/>
					{ errors?.bio?.gender && (
						<ErrorMessage>
							{ errors.bio.gender.message }
						</ErrorMessage>
					) }
				</div>
				<div className="col">
					<BootstrapRadioCheckbox
						label="Name Suffix"
						args={ {
							registerField: 'bio.nameSuffix',
							custom: true,
							clearable: true,
						} }
						fields={ [
							{
								label: 'Jr.',
								value: 'Jr.',
							},
							{
								label: 'Sr.',
								value: 'Sr.',
							},
						] }
					/>
				</div>
			</div>

			{ gender === 'female' && (
				<div className="">
					<BootstrapInput
						id="maidenName"
						label="Maiden Name"
						registration="bio.maidenName"
					/>
				</div>
			) }
			{ fields.section2.map( ( field ) => (
				<div key={ field.id }>
					<BootstrapInput
						type={ `${ field.type || 'text' }` }
						id={ field.id }
						label={ field.label }
						registration={ `bio.${ field.id }` }
					/>
				</div>
			) ) }
		</div>
	);
}
