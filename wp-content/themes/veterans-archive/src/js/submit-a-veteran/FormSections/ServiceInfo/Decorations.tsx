import React from 'react';
import BootstrapRadioCheckbox from '../../FormUI/BootstrapRadioCheckbox';
import Repeater from '../../FormUI/Repeater';

export default function Decorations() {
	return (
		<>
			<div className="col">
				<BootstrapRadioCheckbox
					args={ {
						registerField: 'service.majorDecorations',
						type: 'checkbox',
					} }
					fields={ [
						{ label: 'Bronze Star', value: 'Bronze Star' },
						{
							label: 'Medal of Honor',
							value: 'Medal of Honor',
						},
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
						{ label: 'Purple Heart', value: 'Purple Heart' },
						{ label: 'Silver Star', value: 'Silver Star' },
					] }
					label="Major Decorations"
				/>
			</div>
			<div className="col d-flex flex-column">
				<Repeater
					label="Additional Decoration"
					id="decorations"
					registration="service.additionalDecorations"
				/>
			</div>
		</>
	);
}
