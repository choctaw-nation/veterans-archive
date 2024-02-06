import React, { memo } from 'react';

export const ButtonWrapper = memo( function ButtonWrapper( {
	children,
	classes,
	innerClass,
}: {
	children: any;
	classes?: string;
	innerClass?: string;
} ) {
	const classList = `btn-container position-relative justify-content-center align-items-center p-1 d-inline-flex ${
		classes ? `${ classes }` : ''
	}`;

	return (
		<div className={ classList }>
			<div
				className={ `btn btn-lower position-absolute top-0 w-100 h-100 z-1 ${
					innerClass ? `${ innerClass }` : ''
				}` }
			/>
			{ children }
		</div>
	);
} );
