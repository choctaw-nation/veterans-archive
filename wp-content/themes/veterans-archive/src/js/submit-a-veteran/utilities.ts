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
		first_name: 'KJ',
		middle_name: '',
		last_name: 'Roelke',
		name_suffix: null,
		home_areas: [
			{
				city: '',
				county: '',
				state: '',
			},
		],
		nickname: '',
		year_of_birth: '',
		year_of_death: '',
	},
	service_information: {
		military_branch: [
			false,
			false,
			false,
			false,
			false,
			false,
			false,
			false,
			false,
			false,
			false,
			false,
		],
		war: [ false, false, false, false, false, false ],
		decorations: {
			decorations: [
				false,
				false,
				false,
				false,
				false,
				false,
				false,
				false,
			],
			additional_decorations: [ '' ],
		},
		highest_rank_achieved: '',
		choctaw_veteran_of_the_month: [
			{
				year_received: null,
				district: null,
			},
		],
		dates_of_service: [
			{
				service_start: null,
				service_end: null,
			},
		],
		overseas_duty: [ '' ],
		stateside_assignments: [ '' ],
		jobs: [ '' ],
		advanced_training: [ '' ],
		military_units: [ '' ],
	},
	additional_materials: {
		media_material: false,
		links: [
			{
				description_of_material: '',
				material_link: '',
				material_type: 'link',
			},
		],
	},
	consentCheckbox: true,
	contactInfo: {
		name: 'KJ',
		email: 'kj@kj.co',
	},
};
