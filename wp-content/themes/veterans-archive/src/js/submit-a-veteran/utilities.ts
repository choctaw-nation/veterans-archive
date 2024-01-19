import { WP_Term } from 'wp-types';

export interface veteranRestResponseSuccess {
	status: 200;
	message: string;
	data: {
		gender: 'male' | 'female';
		first_name: string;
		middle_name?: string;
		last_name: string;
		name_suffix?: 'Jr.' | 'Sr.' | string;
		name_suffixOther: string;
		home_areas?: Array< {
			city?: string;
			county?: string;
			state: string;
		} >;
		nickname?: string;
		year_of_birth?: number;
		year_of_death?: string;
		branches_of_service?: WP_Term[];
		highest_rank_achieved?: string;
		choctaw_veteran_of_the_month?: Array< {
			year_received: number;
			district: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
		} >;
		overseas_duty?: string[];
		stateside_assignments?: string[];
		jobs?: string[];
		advanced_training?: string[];
		military_units?: string[];
		war: WP_Term[];
		decorations: {
			decorations: WP_Term[];
			additional_decorations: string[];
		};
		dates_of_service: Array< {
			service_start?: number;
			service_end?: number;
		} >;

		additional_materials: {
			links: Array< {
				description_of_material: string;
				material_link: string;
				material_type: 'link';
			} >;
		};
		has_media_material?: true;
		consentCheckbox: true;
		user_name: string;
		user_email: string;
	};
}

export interface veteranRestResponseError {
	code: 'create_veteran_post';
	status: 500;
	message: 'Failed to create veteran post';
	data: { code: 500; data: any };
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
		links: [
			{
				description_of_material: 'Obituary',
				material_link: 'https://google.com',
				material_type: 'link',
			},
			{
				description_of_material: 'Interview',
				material_link: 'https://google.com',
				material_type: 'link',
			},
		],
		media_material: true,
	},
	consentCheckbox: true,
	contactInfo: {
		name: 'KJ Roelke',
		email: 'kroelke@choctawnation.com',
	},
};
