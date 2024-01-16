import React from 'react';
import { useFormContext } from 'react-hook-form';
import BootstrapRadioCheckbox from './BootstrapRadioCheckbox';

export default function ServiceBranches() {
	const { register } = useFormContext();
	return (
		<div className="d-flex flex-wrap">
			<BootstrapRadioCheckbox
				args={ {
					custom: true,
					registerField: 'service.branchOfService',
					type: 'checkbox',
				} }
				label="Branch of Service"
				fields={ [
					{ label: 'Army', value: 'Army' },
					{ label: 'Navy', value: 'Navy' },
					{ label: 'Marines', value: 'Marines' },
					{ label: 'Air Force', value: 'Air Force' },
					{ label: 'Coast Guard', value: 'Coast Guard' },
				] }
			/>
		</div>
	);
}
