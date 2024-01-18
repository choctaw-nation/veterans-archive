import React from 'react';
import { useFormContext } from 'react-hook-form';
import BootstrapInput from '../ui/BootstrapInput';
import Repeater from '../components/Repeater';
import Decorations from '../components/ServiceInfo/Decorations';
import Wars from '../components/ServiceInfo/Wars';
import ServiceDates from '../components/ServiceInfo/ServiceDates';
import BootstrapRadioCheckbox from '../ui/BootstrapRadioCheckbox';

const serviceBranches = [
	{ label: 'Air Force', value: 'Air Force' },
	{ label: 'Army', value: 'Army' },
	{ label: 'Army Reserves', value: 'Army Reserves' },
	{
		label: 'Army National Guard',
		value: 'Army National Guard',
	},
	{ label: 'Army Air Corps', value: 'Army Air Corps' },
	{ label: 'Coast Guard', value: 'Coast Guard' },
	{ label: 'Marines', value: 'Marines' },
	{ label: 'National Guard', value: 'National Guard' },
	{ label: 'Navy', value: 'Navy' },
	{ label: 'Seabees', value: 'Seabees' },
	{ label: 'Navy Reserves', value: 'Navy Reserves' },
	{
		label: "Women's Army Corps",
		value: "Women's Army Corps",
	},
];

export default function ServiceInfo() {
	const { getValues } = useFormContext();
	const name = getValues( 'bio.firstName' );
	return (
		<div className="service-info">
			<h2>Service Info for { name }</h2>
			<div className="row g-2 my-3">
				<div className="col col-md-6">
					<BootstrapRadioCheckbox
						args={ {
							custom: true,
							registerField: 'service.branchOfService',
							type: 'checkbox',
						} }
						label="Branch of Service"
						fields={ serviceBranches }
					/>
				</div>
				<div className="col-12 col-md-6">
					<Wars />
				</div>
				<Decorations />
				<div className="row g-2 my-3">
					<div className="col d-flex flex-wrap flex-column">
						<BootstrapInput
							id="highestAchievedRank"
							label="Highest Achieved Rank"
							registration="service.highestAchievedRank"
						/>
					</div>
				</div>
				<div className="row row-cols-auto row-cols-sm-2 g-3 my-3">
					<div className="col">
						<ServiceDates />
					</div>
					<div className="col">
						<Repeater
							label="Overseas Duty"
							id="overseas-duty"
							registration="service.overseasDuty"
						/>
					</div>
					<div className="col">
						<Repeater
							label="Stateside Assignment"
							id="stateside-assignment"
							registration="service.statesideAssignment"
						/>
					</div>
					<div className="col">
						<Repeater
							label="Job"
							id="job"
							registration="service.job"
						/>
					</div>
					<div className="col">
						<Repeater
							label="Advanced Training"
							id="advanced-training"
							registration="service.advancedTraining"
						/>
					</div>
					<div className="col">
						<Repeater
							label="Military Unit"
							id="military-unit"
							registration="service.militaryUnit"
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
