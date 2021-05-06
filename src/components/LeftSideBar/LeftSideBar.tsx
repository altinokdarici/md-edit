import React from 'react';
import { IconButton } from '@fluentui/react';

import { DocumentLibrary } from '../DocumentLibrary';
import { LefSideBarProps } from './LeftSideBar.Props';
import { getIconButtonStyles, useLeftSideBarStyles } from './LeftSideBar.Styles';
import { localization } from '../../localization';

export const LeftSideBar = ({ toggleIsDocumentLibraryVisible, isDocumentLibraryVisible }: LefSideBarProps) => {
	const classNames = useLeftSideBarStyles();
	return (
		<>
			<div className={classNames.container}>
				<IconButton
					iconProps={{ iconName: 'CollapseMenu' }}
					styles={getIconButtonStyles()}
					checked={isDocumentLibraryVisible}
					onClick={toggleIsDocumentLibraryVisible}
					title={localization.documents}
					ariaLabel="Navigation"
				/>
			</div>
			<DocumentLibrary />
		</>
	);
};
