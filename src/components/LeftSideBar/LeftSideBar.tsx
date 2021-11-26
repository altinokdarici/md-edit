import React from 'react';
import { IconButton } from '@fluentui/react';
import { useRecoilState } from 'recoil';

import { DocumentLibrary } from '../DocumentLibrary';
import { getIconButtonStyles, useLeftSideBarStyles } from './LeftSideBar.Styles';
import { localization } from '../../localization';
import { uxState } from '../../state';

export const LeftSideBar = () => {
	const [ux, setUx] = useRecoilState(uxState);

	const classNames = useLeftSideBarStyles();

	const onIconButtonClick = React.useCallback(() => {
		setUx({
			...ux,
			isDocumentLibraryVisible: !ux.isDocumentLibraryVisible,
		});
	}, [setUx, ux]);

	return (
		<>
			<div className={classNames.container}>
				<IconButton
					iconProps={{ iconName: 'CollapseMenu' }}
					styles={getIconButtonStyles()}
					checked={ux.isDocumentLibraryVisible}
					onClick={onIconButtonClick}
					title={localization.documents}
					ariaLabel="Navigation"
				/>
			</div>
			<DocumentLibrary />
		</>
	);
};
