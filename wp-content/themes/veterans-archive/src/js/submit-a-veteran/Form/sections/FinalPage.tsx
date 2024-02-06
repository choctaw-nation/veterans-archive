import React from 'react';
import { ButtonWrapper } from '../ui/ButtonWrapper';

export default function FinalPage( { data } ) {
	if ( ! data ) {
		return;
	}
	const { user_name, user_email, first_name, last_name } = data;

	return (
		<>
			<div className="row">
				<div className="col">
					<h2 className="display-4 text-uppercase text-dark-blue">
						Yakoke!
					</h2>
					<p>
						Yakoke for submitting{ ' ' }
						{ `${ first_name } ${ last_name }` } to our database{ ' ' }
						{ user_name }! We will review your submission and
						contact you at { user_email } if we have any questions.
					</p>
				</div>
			</div>
			<div className="row row-cols-2 my-3">
				<div className="col d-flex">
					<ButtonWrapper>
						<a
							className="btn btn-outline-dark-blue text-uppercase"
							href="/submit-a-veteran"
						>
							Submit Another Veteran
						</a>
					</ButtonWrapper>
				</div>
				<div className="col d-flex">
					<ButtonWrapper>
						<a
							className="btn btn-green text-uppercase"
							href="/veterans"
						>
							Browse the Archive
						</a>
					</ButtonWrapper>
				</div>
			</div>
		</>
	);
}
