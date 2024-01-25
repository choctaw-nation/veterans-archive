import React from 'react';
import BootstrapSelect from '../../ui/BootstrapSelect';

const states = [
	'Select a state',
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

export default function StateSelect( { registration } ) {
	return (
		<BootstrapSelect
			fields={ states.map( ( state ) => ( {
				value: 'Select a state' === state ? '' : state,
				label: state,
			} ) ) }
			args={ {
				ariaLabel: 'Select a state',
				registration,
			} }
		/>
	);
}
