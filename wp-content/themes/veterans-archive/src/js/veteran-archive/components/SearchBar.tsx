import React from 'react';
import { ButtonWrapper } from '../../submit-a-veteran/Form/ui/ButtonWrapper';

export function SearchBar( {
	searchTerm,
	setSearchTerm,
	isLoading,
	children,
} ) {
	return (
		<form className="col" action="/veterans">
			<div className="row">
				<div className="col">
					<label htmlFor="search" className="form-label">
						<h1 className="fw-light display-1 text-uppercase text-light-green">
							Find a veteran
						</h1>
					</label>
				</div>
			</div>
			<div className="row align-items-center row-gap-2">
				<div className="col-lg-auto flex-grow-1">
					<input
						type="text"
						className="form-control flex-grow-1 flex-shrink-0"
						id="search"
						name="s"
						value={ searchTerm }
						onChange={ ( e ) => setSearchTerm( e.target.value ) }
						placeholder="Try searching by name, rank, hometown, or more"
					/>
				</div>
				<div className="col-lg-auto d-flex flex-wrap flex-sm-nowrap gap-2">
					<ButtonWrapper innerClass="btn-outline-light">
						<input
							type="submit"
							value="Search"
							disabled={ isLoading }
							className="btn text-light btn-outline-light text-uppercase display-6 fs-5 z-2 w-100 border-0"
						/>
					</ButtonWrapper>
				</div>
			</div>
			<div className="row my-3 row-gap-3">{ children }</div>
		</form>
	);
}
