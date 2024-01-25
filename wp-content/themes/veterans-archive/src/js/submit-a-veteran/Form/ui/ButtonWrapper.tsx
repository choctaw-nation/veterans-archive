import React from 'react';

export default function ButtonWrapper( {
	children,
	bgColor = 'white',
	classes,
}: {
	children: any;
	bgColor?: string;
	classes?: string;
} ) {
	const classList = `btn-container position-relative ${ classes }`;
	const style = bgColor ? { color: bgColor } : {};

	return (
		<div className={ classList } style={ style }>
			<div className="btn-lower position-absolute top-0 w-100 h-100 z-1" />
			{ children }
		</div>
	);
}
