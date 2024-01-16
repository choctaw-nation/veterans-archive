import React from 'react';
import { useFormContext } from 'react-hook-form';
import BootstrapInput from '../FormUI/BootstrapInput';
import ServiceBranches from '../FormUI/ServiceBranches';

export default function ServiceInfo() {
	const { getValues } = useFormContext();
	const name = getValues( 'bio.firstName' );
	return (
		<div className="service-info">
			<h2>Service Info for { name }</h2>
			<div className="row row-cols-1 row-cols-md-3">
				<ServiceBranches />
				<div className="d-flex flex-wrap">
					<BootstrapInput
						id="highestAchievedRank"
						label="Highest Achieved Rank"
						registration="service.highestAchievedRank"
					/>
				</div>
			</div>
		</div>
	);
}
