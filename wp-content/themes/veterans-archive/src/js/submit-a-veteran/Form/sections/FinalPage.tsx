import React from 'react';
import { useFormContext } from 'react-hook-form';
export default function FinalPage() {
	const { getValues } = useFormContext();
	const userName = getValues( 'contactInfo.name' );
	const userEmail = getValues( 'contactInfo.email' );
	return (
		<>
			<div className="row">
				<div className="col">
					<h2>Yakoke!</h2>
					<p>
						Yakoke for your submission, { userName }. We will review
						your submission and contact you at { userEmail } if we
						have any questions.
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
