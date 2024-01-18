import React from 'react';
export default function AppContainer( props ) {
	return (
		<div className="container my-5 pb-5">
			<div className="row justify-content-center">
				<div className="col-12 col-md-8">{ props.children }</div>
			</div>
		</div>
	);
}
