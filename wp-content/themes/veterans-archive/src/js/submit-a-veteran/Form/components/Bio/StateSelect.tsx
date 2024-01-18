import React from 'react';
import BootstrapSelect from '../../ui/BootstrapSelect';

const states = [
	'Oklahoma',
	'Alabama',
	'Alaska',
	'Arizona',
	'Arkansas',
	'California',
	'Colorado',
	'Connecticut',
	'Delaware',
	'Florida',
	'Georgia',
	'Hawaii',
	'Idaho',
	'Illinois',
	'Indiana',
	'Iowa',
	'Kansas',
	'Kentucky',
	'Louisiana',
	'Maine',
	'Maryland',
	'Massachusetts',
	'Michigan',
	'Minnesota',
	'Mississippi',
	'Missouri',
	'Montana',
	'Nebraska',
	'Nevada',
	'New Hampshire',
	'New Jersey',
	'New Mexico',
	'New York',
	'North Carolina',
	'North Dakota',
	'Ohio',
	'Oregon',
	'Pennsylvania',
	'Rhode Island',
	'South Carolina',
	'South Dakota',
	'Tennessee',
	'Texas',
	'Utah',
	'Vermont',
	'Virginia',
	'Washington',
	'Washington DC',
	'West Virginia',
	'Wisconsin',
	'Wyoming',
];

const stateFields = states.map( ( state ) => ( {
	value: state,
	label: state,
} ) );

export default function StateSelect( { registration } ) {
	return (
		<BootstrapSelect
			fields={ stateFields }
			args={ {
				ariaLabel: 'Select a state',
				registration,
				defaultValue: 'Oklahoma',
			} }
		/>
	);
}
