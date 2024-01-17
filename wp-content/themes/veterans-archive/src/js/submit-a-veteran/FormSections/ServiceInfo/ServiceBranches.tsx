import React from 'react';
import { useFormContext } from 'react-hook-form';
import BootstrapRadioCheckbox from '../../FormUI/BootstrapRadioCheckbox';

export default function ServiceBranches() {
	const { register } = useFormContext();
	return (
		<div className="col d-flex flex-wrap">
			<BootstrapRadioCheckbox
				args={ {
					custom: true,
					registerField: 'service.branchOfService',
					type: 'checkbox',
				} }
				label="Branch of Service"
				fields={ [
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
				] }
			/>
		</div>
	);
}
