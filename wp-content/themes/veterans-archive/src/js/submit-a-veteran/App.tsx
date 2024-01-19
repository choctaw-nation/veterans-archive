import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { FormProvider, useForm } from 'react-hook-form';
import apiFetch from '@wordpress/api-fetch';

import { defaultFormData, veteranRestResponseSuccess } from './utilities';
import AppContainer from './AppContainer';
import BootstrapSpinner from './Form/ui/BootstrapSpinner';
import BioFields from './Form/sections/BioFields';
import ServiceInfo from './Form/sections/ServiceInformation';
import FinalPage from './Form/sections/FinalPage';
import Pagination from './Form/components/Pagination';
import AdditionalMaterials from './Form/sections/AdditionalMaterials';

const root = document.getElementById( 'root' );
createRoot( root ).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);

function App() {
	const [ currentPage, setCurrentPage ] = useState( 1 );
	const [ isLoading, setIsLoading ] = useState( false );
	const [ formResponse, setFormResponse ] = useState( null );
	const methods = useForm();

	async function onSubmit( formData ) {
		setIsLoading( true );
		async function submitData() {
			const response: veteranRestResponseSuccess = await apiFetch( {
				path: 'veterans-archive/v1/veterans',
				method: 'POST',
				body: JSON.stringify( formData ),
				headers: {
					'Content-Type': 'application/json',
				},
			} );
			return response;
		}
		try {
			const response = await submitData();
			setFormResponse( response.data );
			setCurrentPage( 4 );
		} catch ( err ) {
			console.error( err );
		} finally {
			setIsLoading( false );
		}
	}

	if ( isLoading ) {
		return (
			<AppContainer>
				<div className="border-3 bg-white p-3 d-flex flex-column justify-content-center align-items-center shadow">
					<BootstrapSpinner />
				</div>
			</AppContainer>
		);
	} else
		return (
			<AppContainer>
				<FormProvider { ...methods }>
					<form
						className="border rounded-5 border-3 bg-white p-3 shadow needs-validation"
						noValidate
						onSubmit={ methods.handleSubmit( onSubmit ) }
					>
						{ 1 === currentPage && <BioFields /> }
						{ 2 === currentPage && <ServiceInfo /> }
						{ 3 === currentPage && <AdditionalMaterials /> }
						{ 4 === currentPage && (
							<FinalPage data={ formResponse } />
						) }
						{ 4 !== currentPage && (
							<Pagination
								currentPage={ currentPage }
								setCurrentPage={ setCurrentPage }
							/>
						) }
					</form>
				</FormProvider>
			</AppContainer>
		);
}
