type formData = {
	bio: {
		birthDate?: number;
		deathDate?: number;
		firstName: string;
		lastName: string;
		middleName?: string;
		nickname?: string;
		gender: 'male' | 'female';
		maidenName?: string;
		nameSuffix?: 'Jr.' | 'Sr.' | 'Other';
		nameSuffixOther?: string;
	};
};

export function prepareFormData( formData: formData ): {} {
	const data = {
		title: `${ formData.bio.firstName } ${ formData.bio.lastName }`,
		acf: {
			bio: {},
		},
	};
	return data;
}

export const defaultFormData = {
	bio: {
		gender: 'Male',
		first_name: 'Kaleb',
		middle_name: 'Joon-tae',
		last_name: 'Roelke',
		name_suffix: 'other',
		home_areas: [
			{
				city: 'Dallas',
				county: '',
				state: 'Texas',
			},
			{
				city: '',
				county: 'Greene',
				state: 'Missouri',
			},
		],
		nickname: 'KJ',
		year_of_birth: '1993',
		year_of_death: '2093',
		name_suffixOther: 'III',
	},
	service_information: {
		military_branch: [
			'Air Force',
			false,
			false,
			false,
			false,
			false,
			'Marine Corps',
			false,
			false,
			false,
			false,
			false,
		],
		highest_rank_achieved: 'Master Chief',
		choctaw_veteran_of_the_month: [
			{
				year_received: 2012,
				district: 1,
			},
			{
				year_received: null,
				district: null,
			},
		],
		overseas_duty: [ 'Japan', 'Korea', 'Italy' ],
		stateside_assignments: [ 'Texas', 'Rhode Island' ],
		jobs: [
			'Battle Watch Commander at Nuclear Command and Control',
			"Weapons System Officer for F-18's",
		],
		advanced_training: [
			'Warfighting Skills Program',
			'Cold Weather Survival Course',
		],
		military_units: [ 'Tuskegee Airmen', 'Green Berets' ],
		war: [ false, false, 'Vietnam', 'Desert Storm', false, false ],
		decorations: {
			decorations: [
				false,
				'Medal of Honor',
				false,
				false,
				false,
				false,
				'Purple Heart',
				false,
			],
			additional_decorations: [
				'Army Achievement Medal',
				'Awesome Work Do-er',
			],
		},
		dates_of_service: [
			{
				service_start: 1993,
				service_end: 1998,
			},
			{
				service_start: 2012,
				service_end: 2022,
			},
		],
	},

	additional_materials: {
		'0': {
			description_of_material: 'Obituary',
			material_link: 'https://google.com',
		},
		media_material: true,
	},
	consentCheckbox: true,
	contactInfo: {
		name: 'KJ Roelke',
		email: 'kroelke@choctawnation.com',
	},
};
