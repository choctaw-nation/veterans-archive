import { WP_Term } from 'wp-types';
import { VeteranData } from './veteran-archive/types';

declare global {
	interface Window {
		cnoSiteData: {
			vetData: {
				veterans: VeteranData[] | null;
				searchFilters: {
					branches: WP_Term[];
					wars: WP_Term[];
					decorations: WP_Term[];
				};
			};
		};
		rootUrl: string;
	}
}
