import React from 'react';

export default function ErrorMessage( { children }: { children: string } ) {
	return <div className="invalid-feedback">{ children }</div>;
}
