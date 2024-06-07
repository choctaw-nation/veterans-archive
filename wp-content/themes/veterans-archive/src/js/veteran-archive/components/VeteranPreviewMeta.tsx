import React from 'react';
import { vetData } from '../types';

/**
 * Takes the home_areas object and returns the full area
 * @param homeAreas the home_areas object
 * @returns the full area
 */
function getTheHomeArea( homeAreas: vetData[ 'home_areas' ] ): string | null {
	let areas = homeAreas?.map( ( area ) => {
		const flatValues = Object.values( {
			city: area.city,
			county: area.county ? `${ area.county } County` : false,
			state: area.state,
		} );
		return flatValues;
	} );
	const area = areas?.flat();
	return area?.filter( ( value ) => value )?.join( ', ' ) || null;
}

export default function VeteranPreviewMeta( {
	serviceDates,
	homeAreas,
}: {
	serviceDates;
	homeAreas;
} ) {
	const meta = [
		{
			label: 'Dates of Service',
			value: serviceDates
				?.map( ( date ) => {
					const { service_start, service_end } = date;
					if ( ! service_start ) {
						return null;
					}
					return `${ service_start } ${
						service_end ? `– ${ service_end }` : ''
					}`;
				} )
				.join( ', ' ),
		},
		{
			label: 'Hometown',
			value: getTheHomeArea( homeAreas ),
		},
	];
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
