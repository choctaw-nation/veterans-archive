import React from 'react';
import BootstrapRadioCheckbox from '../../ui/BootstrapRadioCheckbox';
import Repeater from '../Repeater';

export default function Decorations() {
	return (
		<>
			<div className="col-auto flex-shrink-1">
				<BootstrapRadioCheckbox
					args={ {
						registerField:
							'service_information.decorations.decorations',
						type: 'checkbox',
					} }
					fields={ [
						{ label: 'Bronze Star', value: 'Bronze Star' },
						{
							label: 'Distinguished Flying Cross',
							value: 'Distinguished Flying Cross',
						},
						{
							label: 'Distinguished Service Cross',
							value: 'Distinguished Service Cross',
						},
						{
							label: 'Distinguished Service Medal',
							value: 'Distinguished Service Medal',
						},
						{
							label: 'Legion of Merit',
							value: 'Legion of Merit',
						},
						{
							label: 'Medal of Honor',
							value: 'Medal of Honor',
						},
						{ label: 'Purple Heart', value: 'Purple Heart' },
						{ label: 'Silver Star', value: 'Silver Star' },
					] }
					label="Major Decorations"
				/>
			</div>
			<div className="col-auto flex-grow-1">
				<Repeater
					label="Additional Decoration"
					id="decorations"
					registration="service_information.decorations.additional_decorations"
				/>
			</div>
		</>
	);
}
