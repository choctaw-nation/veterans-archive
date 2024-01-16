import React from 'react';

export default function ErrorMessage( { children }: { children: string } ) {
	return (
		<div className="alert alert-warning flex-grow-1 ms-3 mb-0" role="alert">
			{ children }
		</div>
	);
}
