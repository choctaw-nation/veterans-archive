import React from 'react';
import { useFormContext } from 'react-hook-form';
import BootstrapInput from '../FormUI/BootstrapInput';
import ServiceBranches from './ServiceInfo/ServiceBranches';
import Repeater from '../FormUI/Repeater';
import Decorations from './ServiceInfo/Decorations';
import Wars from './ServiceInfo/Wars';
import ServiceDates from './ServiceInfo/ServiceDates';

export default function ServiceInfo() {
	const { getValues } = useFormContext();
	const name = getValues( 'bio.firstName' );
	return (
		<div className="service-info">
			<h2>Service Info for { name }</h2>
			<div className="row row-cols-1 row-cols-sm-2 row-cols-xl-3 row-gap-3">
				<ServiceBranches />
				<div className="col d-flex flex-column">
					<ServiceDates />
				</div>
				<div className="col">
					<Wars />
				</div>
				<div className="col d-flex flex-wrap flex-column">
					<BootstrapInput
						id="highestAchievedRank"
						label="Highest Achieved Rank"
						registration="service.highestAchievedRank"
					/>
				</div>
				<Decorations />
				<div className="col d-flex flex-column">
					<Repeater
						label="Overseas Duty"
						id="overseas-duty"
						registration="service.overseasDuty"
					/>
				</div>
				<div className="col d-flex flex-column">
					<Repeater
						label="Stateside Assignment"
						id="stateside-assignment"
						registration="service.statesideAssignment"
					/>
				</div>
				<div className="col d-flex flex-column">
					<Repeater label="Job" id="job" registration="service.job" />
				</div>
				<div className="col d-flex flex-column">
					<Repeater
						label="Advanced Training"
						id="advanced-training"
						registration="service.advancedTraining"
					/>
				</div>
				<div className="col d-flex flex-column">
					<Repeater
						label="Military Unit"
						id="military-unit"
						registration="service.militaryUnit"
					/>
				</div>
				<div className="col d-flex flex-column"></div>
			</div>
		</div>
	);
}
