import React from 'react';
import BootstrapRadioCheckbox from '../../ui/BootstrapRadioCheckbox';
export default function Wars() {
	return (
		<BootstrapRadioCheckbox
			args={ {
				registerField: 'service.war',
				type: 'checkbox',
				custom: true,
			} }
			fields={ [
				{ label: 'WWII', value: 'WWII' },
				{ label: 'Korea', value: 'Korea' },
				{ label: 'Vietnam', value: 'Vietnam' },
				{ label: 'Desert Storm', value: 'Desert Storm' },
				{ label: 'Afghanistan', value: 'Afghanistan' },
				{ label: 'Iraq', value: 'Iraq' },
			] }
			label="War"
		/>
	);
}
