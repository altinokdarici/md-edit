import { makeStyles, memoizeFunction } from '@fluentui/react';

export const useLeftSideBarStyles = makeStyles((theme) => ({
	container: {
		backgroundColor: theme.semanticColors.bodyBackground,
		width: 48,
	},
}));

export const getIconButtonStyles = memoizeFunction(() => ({
	root: {
		width: 48,
		height: 48,
	},
	icon: {
		fontSize: 16,
	},
}));
