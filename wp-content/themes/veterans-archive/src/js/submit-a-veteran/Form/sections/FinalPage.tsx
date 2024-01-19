import React from 'react';

export default function FinalPage( { data } ) {
	if ( ! data ) {
		return;
	}
	const { user_name, user_email, first_name, last_name } = data;
	return (
		<>
			<div className="row">
				<div className="col">
					<h2>Yakoke!</h2>
					<p>
						Yakoke for submitting{ ' ' }
						{ `${ first_name } ${ last_name }` } to our database{ ' ' }
						{ user_name }! We will review your submission and
						contact you at { user_email } if we have any questions.
					</p>
				</div>
			</div>
			<div className="row row-cols-2 my-3">
				<div className="col">
					<a
						className="btn btn-primary btn-lg"
						href="/submit-a-veteran"
					>
						Submit Another Veteran
					</a>
				</div>
				<div className="col">
					<a
						className="btn btn-outline-primary btn-lg"
						href="/veterans"
					>
						Browse the Archive
					</a>
				</div>
			</div>
		</>
	);
}
