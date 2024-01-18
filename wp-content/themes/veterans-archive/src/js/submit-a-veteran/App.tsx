import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { FormProvider, useForm } from 'react-hook-form';
import apiFetch from '@wordpress/api-fetch';

import { defaultFormData } from './utilities';
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

function onError( errors ) {
	// console.log( errors );
}
function App() {
	const [ currentPage, setCurrentPage ] = useState( 3 );
	const [ isLoading, setIsLoading ] = useState( false );
	const methods = useForm( { defaultValues: defaultFormData } );

	function onSubmit( formData ) {
		setIsLoading( true );
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
		console.log( formData );
		setIsLoading( false );
		setCurrentPage( 4 );

		// setTimeout( () => {
		// 	try {
		// 		submitData();
		// 	} catch ( err ) {
		// 		console.error( err );
		// 	} finally {
		// 		setIsLoading( false );
		// 	}
		// }, 2000 );
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
						onSubmit={ methods.handleSubmit( onSubmit, onError ) }
					>
						{ 1 === currentPage && <BioFields /> }
						{ 2 === currentPage && <ServiceInfo /> }
						{ 3 === currentPage && <AdditionalMaterials /> }
						{ 4 === currentPage && <FinalPage /> }
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
