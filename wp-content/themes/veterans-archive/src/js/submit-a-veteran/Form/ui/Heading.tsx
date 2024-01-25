import { createElement } from 'react';
export default function Heading( {
	level = 2,
	text,
	color = 'dark-blue',
}: {
	level?: 1 | 2 | 3 | 4 | 5 | 6;
	text: string;
	color?: 'dark-blue' | 'primary' | 'white' | 'green' | 'light-green';
} ) {
	return createElement(
		`h${ level }`,
		{ className: `display-4 text-uppercase text-${ color }` },
		text
	);
}
