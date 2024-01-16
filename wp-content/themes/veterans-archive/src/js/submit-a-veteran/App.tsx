import React, { createRoot } from '@wordpress/element';
import Form from './Form';
const root = document.getElementById( 'root' );
createRoot( root ).render(
	<div className="container my-5 py-5">
		<Form />
	</div>,
	root
);
