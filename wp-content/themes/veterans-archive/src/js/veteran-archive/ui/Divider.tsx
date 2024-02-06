import React, { memo } from 'react';
export const Divider = memo( function Divider( {
	direction = 'start',
	color,
	classes,
}: {
	direction: 'start' | 'end';
	color: string;
	classes?: string;
} ) {
	return (
		<div
			className={ `divider divider-${ color } ${
				classes ? classes : ''
			}` }
		>
			<div
				className={ `divider__line ${
					'end' === direction ? `order-last` : ''
				}` }
			/>
			<div className="divider__dots-container">
				<div className="divider__dot" />
				<div className="divider__dot" />
			</div>
		</div>
	);
} );
