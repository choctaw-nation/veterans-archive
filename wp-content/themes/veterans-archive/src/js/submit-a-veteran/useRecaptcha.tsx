import { useEffect, useState, useCallback } from 'react';

/**
 * Uses the Google Recaptcha API to execute the recaptcha
 * @param sitekey the Site Key
 * @returns
 */
export default function useRecaptcha( sitekey: string ) {
	const [ isRecaptchaReady, setIsRecaptchaReady ] = useState( false );

	useEffect( () => {
		if ( ! window.grecaptcha ) {
			const script = document.createElement( 'script' );
			script.src = `https://www.google.com/recaptcha/api.js?render=${ sitekey }`;
			script.async = true;
			document.head.appendChild( script );
			script.onload = () => {
				setIsRecaptchaReady( true );
			};
		} else {
			setIsRecaptchaReady( true );
		}
	}, [ sitekey ] );

	const executeRecaptcha = useCallback(
		async ( action ) => {
			if ( isRecaptchaReady && window.grecaptcha ) {
				return await window.grecaptcha.execute( sitekey, { action } );
			}
		},
		[ isRecaptchaReady, sitekey ]
	);

	return executeRecaptcha;
}
