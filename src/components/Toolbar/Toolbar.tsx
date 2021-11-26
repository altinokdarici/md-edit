import React from 'react';
import { CommandBar } from '@fluentui/react';
import { useRecoilState } from 'recoil';

import { items } from './items';
import { localization } from '../../localization';
import { uxState } from '../../state';

export const Toolbar = () => {
	const [ux, setUx] = useRecoilState(uxState);

	const onPreviewClick = React.useCallback(() => {
		setUx({
			...ux,
			isViewerVisible: !ux.isViewerVisible,
		});
	}, [ux, setUx]);

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
					onClick: onPreviewClick,
					checked: ux.isViewerVisible,
					iconProps: {
						iconName: 'Preview',
					},
				},
			]}
		/>
	);
};
