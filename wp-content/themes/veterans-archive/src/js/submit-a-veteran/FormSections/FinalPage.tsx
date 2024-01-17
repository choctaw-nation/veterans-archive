import React from 'react';
import { useFormContext } from 'react-hook-form';
import ErrorMessage from '../FormUI/ErrorMessage';
import AdditionalLinks from './AdditionalLinks';
export default function FinalPage() {
	const {
		register,
		formState: { errors },
	} = useFormContext();

	return (
		<div>
			<h2>Additional Material</h2>
			<div className="additional-material">
				<AdditionalLinks />
				<p className="fw-semibold mt-3">Additional Media Material</p>
				<div className="form-check">
					<label
						htmlFor="media-material"
						className="form-check-label"
					>
						Check this box if you would like to submit additional
						media materials to the archive (e.g. photos, audio,
						video).
					</label>
					<input
						type="checkbox"
						className="form-check-input"
						id="media-material"
						{ ...register( 'additionalMaterial.mediaMaterial' ) }
					/>
				</div>
			</div>
			<div className="consent my-5">
				<h2>Consent</h2>
				<p>
					By filling out this form, you understand and agree to this
					data being publicly available. Filling out this form is not
					a guarantee that the veteran will be added to the archive,
					and we reserve the right to remove any submissions at any
					time.
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
						className="form-check-label"
					>
						I understand and agree
					</label>
					{ errors?.consentCheckbox && (
						<ErrorMessage>
							{ errors.consentCheckbox.message }
						</ErrorMessage>
					) }
				</div>
			</div>
		</div>
	);
}
