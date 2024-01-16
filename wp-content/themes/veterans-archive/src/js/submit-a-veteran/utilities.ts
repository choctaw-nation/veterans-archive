export function prepareFormData( formData: {} ): {} {
	const data = {
		title: `${ formData.firstName } ${ formData.lastName }`,
	};
	return data;
}
