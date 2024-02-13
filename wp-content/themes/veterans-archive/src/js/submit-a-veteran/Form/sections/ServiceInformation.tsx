import React from 'react';
import { useFormContext } from 'react-hook-form';
import BootstrapInput from '../ui/BootstrapInput';
import Repeater from '../components/Repeater';
import Decorations from '../components/ServiceInfo/Decorations';
import Wars from '../components/ServiceInfo/Wars';
import ServiceDates from '../components/ServiceInfo/ServiceDates';
import BootstrapRadioCheckbox from '../ui/BootstrapRadioCheckbox';
import ChoctawVeteranOfTheMonth from '../components/ServiceInfo/ChoctawVeteran';
import Heading from '../ui/Heading';

const serviceBranches = [
	{ label: 'Air Force', value: 'Air Force' },
	{ label: 'Army', value: 'Army' },
	{ label: 'Army Air Corps', value: 'Army Air Corps' },
	{
		label: 'Army National Guard',
		value: 'Army National Guard',
	},
	{ label: 'Army Reserves', value: 'Army Reserves' },
	{ label: 'Coast Guard', value: 'Coast Guard' },
	{ label: 'Marines', value: 'Marine Corps' },
	{ label: 'National Guard', value: 'National Guard' },
	{ label: 'Navy', value: 'Navy' },
	{ label: 'Navy Reserves', value: 'Navy Reserves' },
	{ label: 'Seabees', value: 'Seabees' },
	{
		label: "Women's Army Corps",
		value: "Women's Army Corps",
	},
];

export default function ServiceInfo() {
	const { getValues } = useFormContext();
	const name = getValues( 'bio.first_name' );
	return (
		<div className="service-info">
			<Heading text={ `Service Info for ${ name }` } />
			<div className="row g-2 my-3">
				<div className="col col-md-6">
					<BootstrapRadioCheckbox
						args={ {
							custom: true,
							registerField:
								'service_information.military_branch',
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
					<div className="col-12 my-3">
						<BootstrapInput
							id="highestAchievedRank"
							label="Highest Achieved Rank"
							registration="service_information.highest_rank_achieved"
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
							registration="service_information.overseas_duty"
						/>
					</div>
					<div className="col">
						<Repeater
							label="Stateside Assignment"
							id="stateside-assignment"
							registration="service_information.stateside_assignments"
						/>
					</div>
					<div className="col">
						<Repeater
							label="Job"
							id="job"
							registration="service_information.jobs"
						/>
					</div>
					<div className="col">
						<Repeater
							label="Advanced Training"
							id="advanced-training"
							registration="service_information.advanced_training"
						/>
					</div>
					<div className="col">
						<Repeater
							label="Military Unit"
							id="military-unit"
							registration="service_information.military_units"
						/>
					</div>
				</div>
				<div className="row">
					<div className="col">
						<ChoctawVeteranOfTheMonth />
					</div>
				</div>
			</div>
		</div>
	);
}
