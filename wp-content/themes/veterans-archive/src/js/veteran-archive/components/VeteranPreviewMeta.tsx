import React from 'react';
import { VeteranMeta } from '../types';

export default function VeteranPreviewMeta( { meta }: { meta: VeteranMeta } ) {
	return meta.map( ( item, index ) => {
		const { label, value } = item;
		if ( ! value || ! label ) {
			return null;
		}
		return (
			<div className="mb-3" key={ index }>
				<p className="text-uppercase text-dark-blue fs-5 mb-0 display-6">
					{ label }
				</p>
				<p>{ value }</p>
			</div>
		);
	} );
}
