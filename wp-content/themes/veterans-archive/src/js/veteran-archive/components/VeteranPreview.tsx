import React, { memo } from 'react';
import { ButtonWrapper } from '../../submit-a-veteran/Form/ui/ButtonWrapper';
import { Divider } from '../ui/Divider';
import { VeteranData } from '../types';
import VeteranPreviewMeta from './VeteranPreviewMeta';

export const VeteranPreview = memo( function VeteranPreview( {
	post,
}: {
	post: VeteranData;
} ) {
	const {
		featuredImage,
		permalink,
		vetData: { home_areas: homeAreas, dates_of_service: serviceDates },
		vetIcon: icon,
	} = post;

	const fullName = setTheFullName( post );

	return (
		<div className="card shadow h-100">
			{ post.featuredImage && (
				<a href={ permalink }>
					<div
						className="ratio ratio-1x1 card-img-top"
						dangerouslySetInnerHTML={ {
							__html: featuredImage,
						} }
					/>
				</a>
			) }
			<div className="card-body d-flex flex-column">
				<Divider direction="end" color="green" classes="mb-3" />
				<a
					href={ permalink }
					className="card-title h4 text-uppercase text-dark-blue mb-4"
				>
					{ fullName }
				</a>
				<div className="card-text-py-2 mb-2">
					<div className="ms-4 at-a-glance">
						<VeteranPreviewMeta
							serviceDates={ serviceDates }
							homeAreas={ homeAreas }
						/>
					</div>
				</div>
			</div>
			<div className="card-footer bg-dark-blue ">
				<div
					className="row row-cols-auto justify-content-between align-items-center row-gap-3"
					style={ { minHeight: 75 } }
				>
					<div className="col">
						<ButtonWrapper
							classes="btn-outline-primary"
							innerClass="btn-outline-primary"
						>
							<a
								href={ permalink }
								className="btn btn-outline-primary text-uppercase text-white display-6 fs-5 border-0 z-2"
							>
								More Info
							</a>
						</ButtonWrapper>
					</div>
					{ icon && (
						<div
							className="col"
							dangerouslySetInnerHTML={ { __html: icon } }
						/>
					) }
				</div>
			</div>
		</div>
	);
} );

/**
 * Takes the VeteranData object and returns the full name
 * @param post the VeteranData object
 * @returns the full name
 */
function setTheFullName( post: VeteranData ): string {
	const {
		title,
		vetData: { middle_name, nickname, maiden_name, suffix },
	} = post;
	const names: string[] = title.split( ' ' );
	const fullNameArray = [ names[ 0 ] ];
	if ( nickname ) {
		fullNameArray.push( `"${ nickname }"` );
	}
	if ( middle_name ) {
		fullNameArray.push( middle_name );
	}
	if ( maiden_name ) {
		fullNameArray.push( `(${ maiden_name })` );
	}
	fullNameArray.push( names[ 1 ] );
	if ( suffix ) {
		fullNameArray.push( suffix );
	}
	return fullNameArray.filter( ( name ) => name ).join( ' ' );
}
