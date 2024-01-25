import React from 'react';

export default function ErrorMessage( props ) {
	return <div className="invalid-feedback d-block">{ props.children }</div>;
}
