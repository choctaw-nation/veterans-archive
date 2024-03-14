import React, { useState, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { FormProvider, set, useForm } from 'react-hook-form';
import apiFetch from '@wordpress/api-fetch';

import { emptyFormData, veteranRestResponseSuccess } from './utilities';
import AppContainer from './AppContainer';
import BootstrapSpinner from './Form/ui/BootstrapSpinner';
import BioFields from './Form/sections/BioFields';
import ServiceInfo from './Form/sections/ServiceInformation';
import FinalPage from './Form/sections/FinalPage';
import { Pagination } from './Form/components/Pagination';
import { AdditionalMaterials } from './Form/sections/AdditionalMaterials';
import useRecaptcha from './useRecaptcha';

const root = document.getElementById( 'root' );
createRoot( root ).render( <App /> );

function App() {
	const [ currentPage, setCurrentPage ] = useState( 1 );
	const [ errorMessage, setErrorMessage ] = useState( undefined );
	const [ isLoading, setIsLoading ] = useState( false );
	const [ formResponse, setFormResponse ] = useState( null );
	const [ formValues, setFormValues ] = useState( emptyFormData );
	const methods = useForm( { defaultValues: formValues } );

	const executeRecaptcha = useRecaptcha(
		'6Lda0JgpAAAAANti-9-trPbq4MH2tuMrn2sMSpc3'
	);

	async function onSubmit( formData ) {
		setFormValues( formData );
		setIsLoading( true );
		async function submitData( token ) {
			const response: veteranRestResponseSuccess = await apiFetch( {
				path: 'veterans-archive/v1/veterans',
				method: 'POST',
				body: JSON.stringify( {
					data: formData,
					recaptcha: token,
				} ),
				headers: {
					'Content-Type': 'application/json',
				},
			} );
			return response;
		}
		try {
			const token = await executeRecaptcha( 'submit' );
			const response = await submitData( token );
			setFormResponse( response );
			setCurrentPage( 4 );
			setFormValues( null );
		} catch ( err ) {
			setErrorMessage( err.message );
		} finally {
			setIsLoading( false );
		}
	}

	function onError( errors ) {
		const formValues = methods.getValues();
		setFormValues( formValues );
	}
	const formRef = useRef( null );

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
	} else if ( errorMessage ) {
		return (
			<AppContainer>
				<div className="alert alert-danger">
					<p>{ errorMessage }</p>
					<p>
						If you believe you are seeing this message in error,
						please{ ' ' }
						<a
							href="/contact-us"
							className="fw-medium text-dark text-decoration-underline link-underline-dark link-offset-2"
						>
							contact us.
						</a>
					</p>
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
						{ 3 === currentPage && (
							<AdditionalMaterials ref={ formRef } />
						) }
						{ 4 === currentPage && (
							<FinalPage data={ formResponse } />
						) }
						{ 4 !== currentPage && (
							<Pagination
								currentPage={ currentPage }
								setCurrentPage={ setCurrentPage }
								ref={ formRef }
							/>
						) }
					</form>
				</FormProvider>
			</AppContainer>
		);
}
