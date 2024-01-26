import React from 'react';

export default function BootstrapButtonGroup( {
	onClick,
	ariaLabel,
}: {
	onClick: any;
	ariaLabel?: string;
} ) {
	const label =
		ariaLabel ||
		'a pair of buttons that adds or removes a pair of input fields';
	return (
		<div className="btn-group" role="group" aria-label={ label }>
			<button
				type="button"
				className="btn btn-secondary btn-sm"
				onClick={ () => onClick( ( numFields ) => numFields + 1 ) }
			>
				+
			</button>
			<button
				type="button"
				className="btn btn-secondary btn-sm"
				onClick={ () =>
					onClick( ( numFields ) =>
						numFields > 0 ? numFields - 1 : 0
					)
				}
			>
				&minus;
			</button>
		</div>
	);
}
