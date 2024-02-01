import React from 'react';
import { useFormContext } from 'react-hook-form';
import ButtonWrapper from '../../ui/ButtonWrapper';

export default function NameSuffix() {
	const { register, watch, resetField } = useFormContext();
	const watchedValue = watch( 'bio.name_suffix' );
	const isChecked = 'other' === watchedValue;

	return (
		<fieldset className="row">
			<legend className="col-form-label col-sm-2 fw-semibold fs-4">
				Name Suffix:
			</legend>
			<div className="col-auto flex-grow-1">
				<div className="form-check">
					<input
						type="radio"
						className="form-check-input fs-5"
						id="nameSuffix1"
						autoComplete="honorific-suffix"
						value="Jr."
						{ ...register( 'bio.name_suffix' ) }
					/>
					<label
						htmlFor="nameSuffix1"
						className="form-check-label fs-5"
					>
						Jr.
					</label>
				</div>
				<div className="form-check">
					<input
						type="radio"
						className="form-check-input fs-5"
						id="nameSuffix2"
						value="Sr."
						autoComplete="honorific-suffix"
						{ ...register( 'bio.name_suffix' ) }
					/>
					<label
						htmlFor="nameSuffix2"
						className="form-check-label fs-5"
					>
						Sr.
					</label>
				</div>
				<div className="form-check d-flex">
					<input
						type="radio"
						className="form-check-input fs-5"
						id="nameSuffixOther"
						value="other"
						{ ...register( 'bio.name_suffix' ) }
					/>
					<label
						htmlFor="nameSuffixOther"
						className="form-check-label ms-1 fs-5"
					>
						Other
					</label>
					{ isChecked && (
						<input
							type="text"
							id="nameSuffixOtherValue"
							className="form-control ms-2 fs-5"
							autoComplete="honorific-suffix"
							placeholder="Add Name Suffix"
							aria-label="Add Name Suffix"
							{ ...register( 'bio.name_suffixOther' ) }
						/>
					) }
				</div>
				{ watchedValue && (
					<div className="d-flex">
						<ButtonWrapper
							classes="mt-3"
							innerClass="btn-outline-secondary"
						>
							<button
								type="button"
								className="btn btn-outline-secondary border-0 text-uppercase"
								onClick={ ( ev ) => {
									ev.preventDefault();
									resetField( 'bio.name_suffix', {
										defaultValue: undefined,
									} );
								} }
							>
								Clear Selection
							</button>
						</ButtonWrapper>
					</div>
				) }
			</div>
		</fieldset>
	);
}
