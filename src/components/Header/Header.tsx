import React from 'react';
import { Icon } from '@fluentui/react';
import { useRecoilValue } from 'recoil';

import { MeControl } from '../MeControl';
import { useHeaderClassNames } from './Header.Styles';
import { DarkModeToggle } from '../DarkModeToggle';
import { DocumentStatus } from '../../models';
import { selectedDocumentSelector, selectedDocumentStatusesSelector } from '../../state';

const getStatusIconName = (status: DocumentStatus) => {
	switch (status) {
		case DocumentStatus.Downloading:
			return 'CloudDownload';
		case DocumentStatus.Saving:
			return 'CloudUpload';
		case DocumentStatus.Saved:
			return 'CheckMark';
		default:
			return undefined;
	}
};

export const Header = () => {
	const documentName = useRecoilValue(selectedDocumentSelector)?.name;
	const documentStatus = useRecoilValue(selectedDocumentStatusesSelector);
	const headerClassNames = useHeaderClassNames();
	const statusIconName = documentStatus ? getStatusIconName(documentStatus) : undefined;

	return (
		<header className={headerClassNames.container}>
			<div className={headerClassNames.leftRegion}>
				<div className={headerClassNames.appName}>Markdown Editor</div>
				<div className={headerClassNames.documentName}>{documentName}</div>
				{statusIconName && <Icon iconName={statusIconName} className={headerClassNames.waffleIcon} />}
			</div>
			<div className={headerClassNames.centerRegion} />
			<div className={headerClassNames.rightRegion}>
				<DarkModeToggle />
				<MeControl />
			</div>
		</header>
	);
};
