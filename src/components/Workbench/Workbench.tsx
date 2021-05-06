import { FontIcon, FontSizes } from '@fluentui/react';
import React from 'react';

import { Editor } from '../Editor';
import { Toolbar } from '../Toolbar';
import { Viewer } from '../Viewer';
import { useWorkbenchClassNames } from './Workbench.Styles';

export const NoDoc = ({ isHidden }: { isHidden: boolean }) => {
	return (
		<div
			style={{
				width: '100%',
				display: isHidden ? 'none' : 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				flexDirection: 'column',
			}}
		>
			<FontIcon iconName="Document" style={{ fontSize: FontSizes.mega }} />
			<span>No document selected</span>
		</div>
	);
};
export interface WorkbenchProps {
	showNoDocument: boolean;
}

export const Workbench = ({ showNoDocument }: WorkbenchProps) => {
	const classNames = useWorkbenchClassNames(showNoDocument)();

	return (
		<>
			<NoDoc isHidden={!showNoDocument} />
			<div className={classNames.container}>
				<Toolbar />
				<div className={classNames.main}>
					<Editor />
					<Viewer />
				</div>
			</div>
		</>
	);
};
