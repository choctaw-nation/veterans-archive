import React from 'react';
import ButtonWrapper from '../../submit-a-veteran/Form/ui/ButtonWrapper';
import Divider from '../ui/Divider';

export default function VeteranPreview( { post } ) {
	const {
		featuredImage,
		title,
		permalink,
		vetData: {
			wars,
			dates_of_service: serviceDates,
			highest_achieved_rank: rank,
		},
		vetIcon: icon,
	} = post;

	const meta: Array< { label: string | null; value: string | null } > = [
		{
			label: wars && wars.length > 1 ? 'Wars' : 'War',
			value: wars?.map( ( war ) => war.name )?.join( ', ' ),
		},
		{
			label: 'Dates of Service',
			value: serviceDates
				?.map(
					( date ) =>
						`${ date.service_start } — ${ date.service_end }`
				)
				.join( ', ' ),
		},
		{
			label: 'Highest Achieved Rank',
			value: rank,
		},
	];

	return (
		<div className="card shadow h-100">
			{ post.featuredImage && (
				<div
					className="ratio ratio-1x1 card-img-top"
					dangerouslySetInnerHTML={ {
						__html: featuredImage,
					} }
				></div>
			) }
			<div className="card-body d-flex flex-column">
				<Divider direction="end" color="green" classes="mb-3" />
				<span className="card-title h4 text-uppercase text-dark-blue mb-4">
					{ title }
				</span>
				<div className="card-text-py-2 mb-2">
					<div className="ms-4 at-a-glance">
						{ meta.map( ( item, index ) => {
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
						} ) }
					</div>
				</div>
			</div>
			<div className="card-footer bg-dark-blue ">
				<div className="row row-cols-auto justify-content-between align-items-center row-gap-3">
					<div className="col">
						<ButtonWrapper
							classes="btn-outline-primary"
							innerClass="btn-outline-primary"
						>
							<a
								href={ permalink }
								className="btn btn-outline-primary text-uppercase text-white display-6 fs-5 border-0 z-2"
							>
								Read More
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
}
