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
