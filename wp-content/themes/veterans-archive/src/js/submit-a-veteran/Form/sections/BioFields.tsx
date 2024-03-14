import React from 'react';
import { useFormContext } from 'react-hook-form';

import BootstrapInput from '../ui/BootstrapInput';
import BootstrapSelect from '../ui/BootstrapSelect';
import NameSuffix from '../components/Bio/NameSuffix';
import ErrorMessage from '../components/ErrorMessage';
import HomeAreas from '../components/Bio/HomeAreas';
import Heading from '../ui/Heading';

const dateFields = [
	{
		id: 'year_of_birth',
		label: 'Year of Birth',
		type: 'number',
	},
	{ id: 'year_of_death', label: 'Year of Death', type: 'number' },
];
const nameFields = [
	{
		id: 'first_name',
		label: 'First Name',
		required: true,
		autoComplete: 'given-name',
	},
	{
		id: 'middle_name',
		autoComplete: 'additional-name',
		label: 'Middle Name or Initial',
	},
	{
		id: 'last_name',
		label: 'Last Name',
		autoComplete: 'family-name',
		required: true,
	},
];

export default function BioFields() {
	const { watch, formState } = useFormContext();
	const { errors } = formState;
	const gender = watch( 'bio.gender' );
	return (
		<div className="bio">
			<Heading text="Bio" />
			<div className="row g-2 my-3">
				<div className="col-auto flex-grow-1">
					<BootstrapSelect
						args={ {
							ariaLabel: 'Gender',
							registration: 'bio.gender',
							autoComplete: 'sex',
							registrationArgs: {
								required: 'This field is required',
							},
							additionalClasses: 'text-dark',
						} }
						fields={ [
							{
								label: 'Gender',
								value: '',
							},
							{
								label: 'Male',
								value: 'Male',
							},
							{
								label: 'Female',
								value: 'Female',
							},
						] }
					/>
					{ errors?.bio?.gender && (
						<ErrorMessage>
							{ errors.bio.gender.message }
						</ErrorMessage>
					) }
				</div>
				{ nameFields.map( ( field, i ) => (
					<div className="col-auto flex-grow-1" key={ i }>
						<BootstrapInput
							id={ field.id }
							label={ field.label }
							args={ {
								required: field.required || false,
								autoComplete: field.autoComplete,
							} }
							registration={ `bio.${ field.id }` }
						/>
					</div>
				) ) }
			</div>
			<div className="row my-3 g-2">
				<div className="col-auto flex-grow-1">
					<NameSuffix />
				</div>
			</div>
			<div className="row my-3 g-2">
				<div className="col-auto flex-grow-1 d-flex flex-column">
					<HomeAreas />
				</div>
			</div>
			<div className="row g-2 my-3">
				{ gender === 'female' && (
					<div className="col-auto flex-grow-1">
						<BootstrapInput
							id="maidenName"
							label="Maiden Name"
							registration="bio.maiden_name"
						/>
					</div>
				) }
				<div className="col-auto flex-grow-1">
					<BootstrapInput
						id="nickname"
						label="Nickname"
						args={ { autoComplete: 'nickname' } }
						registration="bio.nickname"
					/>
				</div>
			</div>
			<div className="row g-2 my-3">
				{ dateFields.map( ( field ) => (
					<div key={ field.id } className="col-auto flex-grow-1">
						<BootstrapInput
							args={ { type: field.type } }
							id={ field.id }
							label={ field.label }
							registration={ `bio.${ field.id }` }
						/>
					</div>
				) ) }
			</div>
		</div>
	);
}
