import { WP_Term } from 'wp-types';

export type SelectedFiltersState = {
	branches: string;
	wars: string;
	decorations: string;
};

export type VeteranData = {
	title: string;
	permalink: string;
	vetData: vetData;
	featuredImage: string;
	vetIcon: string | null;
};

export type vetData = {
	post_id: number;
	gender: 'Male' | 'Female';
	middle_name: string | null;
	nickname: string | null;
	maiden_name: string | null;
	suffix: string | null;
	home_areas: Array< {
		city: string | null;
		county: string | null;
		state: string;
	} > | null;
	birth: number | null;
	death: number | null;
	branches_of_service: WP_Term[];
	dates_of_service: Array< {
		service_start: number;
		service_end?: number;
	} > | null;
	wars: WP_Term[] | null;
	decorations: {
		decorations: WP_Term[] | null;
		additional_decorations: string[] | null;
	};
	overseas_duty: string[] | null;
	stateside_assignments: string[] | null;
	jobs: string[] | null;
	advanced_training: string[] | null;
	highest_achieved_rank: string | null;
	military_units: string[] | null;
	choctaw_veteran_of_the_month: Array< {
		year: number;
		district: number;
	} > | null;
	has_additional_materials: boolean;
	additional_materials: AdditionalMaterials[] | null;
};

type AdditionalMaterials = {
	description: string;
	type: {
		value: 'photo-gallery' | 'audio' | 'text' | 'video';
		label: 'Photo Gallery' | 'Audio' | 'PDF' | 'Video';
	};
	url: string | null;
	photo_gallery: Array< {
		url: string;
		alt: string;
		srcset: string;
	} > | null;
	video: string | null;
};
