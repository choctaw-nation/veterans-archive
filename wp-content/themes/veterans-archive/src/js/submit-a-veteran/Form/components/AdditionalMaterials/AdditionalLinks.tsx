import React from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import ButtonWrapper from '../../ui/ButtonWrapper';

const FIELD_NAME = 'additional_materials.links';
export default function AdditionalLinks() {
	const { register } = useFormContext();
	const { fields, append, remove } = useFieldArray( {
		name: FIELD_NAME,
	} );
	if ( 0 === fields.length ) {
		return (
			<ButtonWrapper classes="my-2">
				<button
					type="button"
					onClick={ () =>
						append( {
							material_type: 'link',
							description_of_material: '',
							material_link: '',
						} )
					}
					className="btn btn-outline-green text-dark-blue text-uppercase w-100"
				>
					Add Additional Links
				</button>
			</ButtonWrapper>
		);
	} else {
		return (
			<div className="my-3">
				<span className="d-block fw-semibold fs-5">
					Additional Links
				</span>
				<p className="mb-3 fs-6 fst-italic">
					All links must start with <code>https://</code>
				</p>
				{ fields.map( ( field, i ) => (
					<div key={ field.id } className="input-group mb-3">
						<input
							type="text"
							className="form-control"
							id={ `link-${ i }-name` }
							{ ...register(
								`${ FIELD_NAME }.${ i }.description_of_material`
							) }
							placeholder={ `Insert link name` }
						/>
						<input
							type="url"
							className="form-control"
							id={ `link-${ i }-url` }
							{ ...register(
								`${ FIELD_NAME }.${ i }.material_link`
							) }
							placeholder={ `Insert url` }
						/>
						<input
							type="hidden"
							{ ...register(
								`${ FIELD_NAME }.${ i }.material_type`,
								{
									value: 'link',
								}
							) }
						/>
						<div
							className="btn-group"
							role="group"
							aria-label="A pair of buttons that adds or removes a set of input fields"
						>
							<button
								type="button"
								className="btn btn-secondary btn-sm"
								onClick={ () =>
									append( {
										material_type: 'link',
										description_of_material: '',
										material_link: '',
									} )
								}
							>
								+
							</button>
							<button
								type="button"
								className="btn btn-secondary btn-sm"
								onClick={ () => remove( i ) }
							>
								&minus;
							</button>
						</div>
					</div>
				) ) }
			</div>
		);
	}
}
