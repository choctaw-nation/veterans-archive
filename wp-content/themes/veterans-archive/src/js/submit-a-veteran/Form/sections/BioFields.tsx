import React from 'react';
import { useFormContext } from 'react-hook-form';

import BootstrapInput from '../ui/BootstrapInput';
import BootstrapSelect from '../ui/BootstrapSelect';
import Repeater from '../components/Repeater';
import NameSuffix from '../components/Bio/NameSuffix';
import ErrorMessage from '../components/ErrorMessage';
import HomeAreas from '../components/Bio/HomeAreas';

const dateFields = [
	{ id: 'dateOfBirth', label: 'Year of Birth', type: 'number' },
	{ id: 'dateOfDeath', label: 'Year of Death', type: 'number' },
];
const nameFields = [
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
];

export default function BioFields() {
	const { watch, formState } = useFormContext();
	const { errors } = formState;
	const gender = watch( 'bio.gender' );
	return (
		<div className="bio">
			<h2>Bio</h2>
			<div className="row g-2 my-3">
				<div className="col-auto flex-grow-1">
					<BootstrapSelect
						args={ {
							ariaLabel: 'Gender',
							registration: 'bio.gender',
						} }
						fields={ [
							{
								label: 'Gender',
								value: '',
							},
							{
								label: 'Male',
								value: 'male',
							},
							{
								label: 'Female',
								value: 'female',
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
							registration="bio.maidenName"
						/>
					</div>
				) }
				<div className="col-auto flex-grow-1">
					<BootstrapInput
						id="nickname"
						label="Nickname"
						registration="bio.nickname"
					/>
				</div>
			</div>
			<div className="row g-2 my-3">
				{ dateFields.map( ( field ) => (
					<div key={ field.id } className="col-auto flex-grow-1">
						<BootstrapInput
							id={ field.id }
							label={ field.label }
							registration={ `bio.${ field.id }` }
							args={ {
								type: 'number',
							} }
						/>
					</div>
				) ) }
			</div>
		</div>
	);
}
