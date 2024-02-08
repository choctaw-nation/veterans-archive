import React from 'react';
import BootstrapRadioCheckbox from '../../ui/BootstrapRadioCheckbox';
export default function Wars() {
	return (
		<BootstrapRadioCheckbox
			args={ {
				registerField: 'service_information.war',
				type: 'checkbox',
				custom: true,
			} }
			fields={ [
				{ label: 'Afghanistan', value: 'Afghanistan' },
				{ label: 'Desert Storm', value: 'Desert Storm' },
				{ label: 'Iraq', value: 'Iraq' },
				{ label: 'Korea', value: 'Korea' },
				{ label: 'Vietnam', value: 'Vietnam' },
				{ label: 'WWII', value: 'WWII' },
			] }
			label="Conflicts"
		/>
	);
}
