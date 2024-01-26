import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { FormProvider, useForm } from 'react-hook-form';
import apiFetch from '@wordpress/api-fetch';

import { emptyFormData, veteranRestResponseSuccess } from './utilities';
import AppContainer from './AppContainer';
import BootstrapSpinner from './Form/ui/BootstrapSpinner';
import BioFields from './Form/sections/BioFields';
import ServiceInfo from './Form/sections/ServiceInformation';
import FinalPage from './Form/sections/FinalPage';
import Pagination from './Form/components/Pagination';
import AdditionalMaterials from './Form/sections/AdditionalMaterials';

const root = document.getElementById( 'root' );
createRoot( root ).render( <App /> );

function App() {
	const [ currentPage, setCurrentPage ] = useState( 1 );
	const [ isLoading, setIsLoading ] = useState( false );
	const [ formResponse, setFormResponse ] = useState( null );
	const [ formValues, setFormValues ] = useState( emptyFormData );
	const methods = useForm( { defaultValues: formValues } );

	async function onSubmit( formData ) {
		setFormValues( formData );
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
			setFormValues( null );
		} catch ( err ) {
			console.error( err );
		} finally {
			setIsLoading( false );
		}
	}
	function onError( errors ) {
		const formValues = methods.getValues();
		setFormValues( formValues );
	}

	const baseStyles = ``;

	if ( isLoading ) {
		return (
			<AppContainer>
				<div
					className={ `${ baseStyles } d-flex flex-column justify-content-center align-items-center` }
				>
					<BootstrapSpinner />
				</div>
			</AppContainer>
		);
	} else
		return (
			<AppContainer>
				<FormProvider { ...methods }>
					<form
						className={ `${ baseStyles } needs-validation` }
						noValidate
						onSubmit={ methods.handleSubmit( onSubmit, onError ) }
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
