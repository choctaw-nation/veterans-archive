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
	service: {
		branchOfService: [
			'Air Force',
			'Army',
			false,
			'Army National Guard',
			false,
			false,
			false,
			false,
			false,
			false,
			false,
			false,
		],
		serviceDate: [
			{
				start: 1995,
				end: 1999,
			},
			{
				start: 2012,
				end: 2018,
			},
		],
		war: [ false, 'Korea', false, false, false, 'Iraq' ],
		highestAchievedRank: 'Master Chief',
		majorDecorations: [
			false,
			false,
			'Distinguished Flying Cross',
			false,
			'Distinguished Service Medal',
			false,
			false,
			false,
		],
		additionalDecorations: [
			'Army Achievement Medal',
			'Awesome Work Do-er',
		],
		overseasDuty: [ 'Japan', 'Korea' ],
		statesideAssignment: [ 'Texas', 'D.C.', 'Alabama' ],
		job: [
			'Battle Watch Commander at Nuclear Command and Control',
			"Weapons System Officer for F-18's",
		],
		advancedTraining: [
			'Warfighting Skills Program',
			'Cold Weather Survival Course',
		],
		militaryUnit: [ 'Tuskegee Air', 'Green Berets' ],
	},
	bio: {
		firstName: 'Kaleb',
		middleName: 'Joon-tae',
		lastName: 'Roelke',
		gender: 'male',
		nameSuffix: 'Sr.',
		nickname: 'KJ',
		homeArea: [
			{
				city: 'Dallas',
				county: '',
				state: 'Texas',
			},
			{
				city: 'Springfield',
				county: 'Greene',
				state: 'Missouri',
			},
		],
		dateOfBirth: '1993',
		dateOfDeath: '2093',
		maidenName: '',
	},
	additionalMaterial: {
		mediaMaterial: true,
	},
	consentCheckbox: true,
	additionalMaterials: [
		{
			linkName: 'Obituary',
			link: 'https://google.com',
		},
	],
	contactInfo: {
		name: 'KJ Roelke',
		email: 'kroelke@choctawnation.com',
	},
};
