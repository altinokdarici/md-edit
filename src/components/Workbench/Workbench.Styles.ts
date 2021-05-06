import { makeStyles } from '@fluentui/react';

export const useWorkbenchClassNames = (isHidden: boolean) =>
	makeStyles((theme) => ({
		container: {
			display: isHidden ? 'none' : 'flex',
			backgroundColor: theme.semanticColors.bodyBackground,
			width: '100%',
			flexDirection: 'column',
		},
		main: {
			overflow: 'hidden',
			width: '100%',
			display: 'flex',
			flex: 'auto',
		},
	}));
