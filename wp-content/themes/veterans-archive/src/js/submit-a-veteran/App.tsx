import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { FormProvider, useForm } from 'react-hook-form';

import Form from './Form';
import BioFields from './FormSections/BioFields';
import ServiceInfo from './FormSections/ServiceInformation';
import Pagination from './FormUI/Pagination';
import FinalPage from './FormSections/FinalPage';
const root = document.getElementById( 'root' );
createRoot( root ).render( <App /> );

function App() {
	const [ currentPage, setCurrentPage ] = useState( 1 );
	const methods = useForm();

	return (
		<div className="container my-5 py-5">
			<FormProvider { ...methods }>
				<Form>
					{ 1 === currentPage && <BioFields /> }
					{ 2 === currentPage && <ServiceInfo /> }
					{ 3 === currentPage && <FinalPage /> }
					<Pagination
						currentPage={ currentPage }
						setCurrentPage={ setCurrentPage }
					/>
					{ 3 === currentPage && (
						<button
							type="submit"
							className="btn btn-primary btn-lg mt-5"
						>
							Submit
						</button>
					) }
				</Form>
			</FormProvider>
		</div>
	);
}
