import React from 'react';
import { CommandBar } from '@fluentui/react';

import { items } from './items';
import { ToolbarProps } from './Toolbar.Props';
import { localization } from '../../localization';

export const Toolbar = ({ toggleViewer, isViewerVisible }: ToolbarProps) => {
	return (
		<CommandBar
			items={items}
			farItems={[
				{
					text: localization.pdf,
					key: 'PDF',
					iconProps: {
						iconName: 'PDF',
					},
				},
				{
					text: localization.preview,
					key: 'Preview',
					onClick: () => toggleViewer(),
					checked: isViewerVisible,
					iconProps: {
						iconName: 'Preview',
					},
				},
			]}
		/>
	);
};
