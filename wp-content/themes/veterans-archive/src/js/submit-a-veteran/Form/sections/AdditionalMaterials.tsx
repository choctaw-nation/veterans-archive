import React from 'react';
import { useFormContext } from 'react-hook-form';

import ErrorMessage from '../components/ErrorMessage';
import AdditionalLinks from '../components/AdditionalMaterials/AdditionalLinks';
import ContactInfo from '../components/AdditionalMaterials/ContactInfo';

export default function AdditionalMaterials() {
	const {
		register,
		getValues,
		formState: { errors },
	} = useFormContext();

	const veteran = {
		firstName: getValues( 'bio.first_name' ),
		lastName: getValues( 'bio.last_name' ),
		pronouns:
			'male' === getValues( 'bio.gender' )
				? [ 'he', 'him', 'his' ]
				: [ 'she', 'her', 'her' ],
	};

	return (
		<div>
			<h2>Additional Material</h2>
			<div className="additional-material">
				<AdditionalLinks />
				<p className="fw-semibold mt-3">Additional Media Material</p>
				<div className="form-check">
					<label
						htmlFor="media-material"
						className="form-check-label fs-5"
					>
						Check this box if you would like to submit additional
						media materials to the archive (e.g. photos, audio,
						video).
					</label>
					<input
						type="checkbox"
						className="form-check-input"
						id="media-material"
						{ ...register( 'additional_materials.media_material' ) }
					/>
				</div>
			</div>
			<div className="consent my-5">
				<h2>Consent</h2>
				<p>
					{ `By filling out this form, you understand and acknowledge that this
					data will be publicly available. You also acknowledge and affirm that you have the right to submit information about ${ veteran.firstName } ${ veteran.lastName } on ${ veteran.pronouns[ 2 ] } behalf. Filling out this form is not a guarantee that ${ veteran.pronouns[ 0 ] } will be added to the archive, and we reserve the right to remove any submissions at any
					time.` }
				</p>
				<div className="form-check">
					<input
						type="checkbox"
						id="consentCheckbox"
						className="form-check-input"
						required
						{ ...register( 'consentCheckbox', {
							required: 'Your consent is required',
						} ) }
					/>
					<label
						htmlFor="consentCheckbox"
						className="form-check-label fs-5"
					>
						I understand and agree
					</label>
					{ errors?.consentCheckbox && (
						<ErrorMessage>
							{ errors.consentCheckbox.message }
						</ErrorMessage>
					) }
				</div>
				<ContactInfo />
			</div>
		</div>
	);
}
