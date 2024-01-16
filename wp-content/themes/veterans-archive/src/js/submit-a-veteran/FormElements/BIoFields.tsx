import React from 'react';

export default function BioFields( { watch, register } ) {
	const gender = watch( 'gender', 'male' );
	return (
		<>
			<div>
				<label>
					Gender:
					<input
						type="radio"
						{ ...register( 'gender' ) }
						value="male"
					/>{ ' ' }
					Male
					<input
						type="radio"
						{ ...register( 'gender' ) }
						value="female"
					/>{ ' ' }
					Female
				</label>
			</div>

			<div>
				<label>
					Middle Name or Initial:
					<input type="text" { ...register( 'middleName' ) } />
				</label>
			</div>

			<div>
				<label>
					Name Suffix:
					<input type="text" { ...register( 'nameSuffix' ) } />
				</label>
			</div>

			<div>
				<label>
					Nickname:
					<input type="text" { ...register( 'nickname' ) } />
				</label>
			</div>

			{ gender === 'female' && (
				<div>
					<label>
						Maiden Name:
						<input type="text" { ...register( 'maidenName' ) } />
					</label>
				</div>
			) }

			<div>
				<label>
					Home Town(s):
					<input type="text" { ...register( 'homeTown' ) } />
				</label>
			</div>

			<div>
				<label>
					Date of Birth:
					<input type="date" { ...register( 'dateOfBirth' ) } />
				</label>
			</div>

			<div>
				<label>
					Date of Death:
					<input type="date" { ...register( 'dateOfDeath' ) } />
				</label>
			</div>
		</>
	);
}
