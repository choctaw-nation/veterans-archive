import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { FormProvider, useForm } from 'react-hook-form';
import apiFetch from '@wordpress/api-fetch';

import BioFields from './FormSections/BioFields';
import ServiceInfo from './FormSections/ServiceInformation';
import Pagination from './FormUI/Pagination';
import FinalPage from './FormSections/FinalPage';
import { defaultFormData } from './utilities';
import BootstrapSpinner from './FormUI/BootstrapSpinner';
const root = document.getElementById( 'root' );
createRoot( root ).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);

function onError( errors ) {
	// console.log( errors );
}
function App() {
	const [ currentPage, setCurrentPage ] = useState( 3 );
	const [ isLoading, setIsLoading ] = useState( false );
	const methods = useForm();

	function onSubmit( formData ) {
		setIsLoading( true );
		setCurrentPage( 1 );
		async function submitData() {
			const response = await apiFetch( {
				path: 'veterans-archive/v1/veterans',
				method: 'POST',
				body: JSON.stringify( formData ),
				headers: {
					'Content-Type': 'application/json',
				},
			} );
			console.log( response );
		}
		setTimeout( () => {
			try {
				submitData();
			} catch ( err ) {
				console.error( err );
			} finally {
				setIsLoading( false );
			}
		}, 2000 );
	}
	console.log( isLoading );

	if ( isLoading ) {
		return (
			<div className="container my-5 py-5">
				<div className="row justify-content-center">
					<div className="col-12 col-md-8 border-3 bg-white p-3 d-flex flex-column justify-content-center align-items-center shadow">
						<BootstrapSpinner />
					</div>
				</div>
			</div>
		);
	} else
		return (
			<div className="container my-5 py-5">
				<div className="row justify-content-center">
					<div className="col-12 col-md-8">
						<FormProvider { ...methods }>
							<form
								className="border rounded-5 border-3 bg-white p-3 shadow needs-validation"
								noValidate
								onSubmit={ methods.handleSubmit(
									onSubmit,
									onError
								) }
							>
								{ 1 === currentPage && <BioFields /> }
								{ 2 === currentPage && <ServiceInfo /> }
								{ 3 === currentPage && <FinalPage /> }
								<Pagination
									currentPage={ currentPage }
									setCurrentPage={ setCurrentPage }
								/>
							</form>
						</FormProvider>
					</div>
				</div>
			</div>
		);
}
