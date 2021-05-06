import { makeStyles } from '@fluentui/react';

const headerHeight = 48;

export const useLayoutClassNames = makeStyles((theme) => ({
	container: {
		backgroundColor: theme.semanticColors.bodyBackground,
		height: '100vh',
	},
	header: {
		height: headerHeight,
	},
	middleRegion: {
		borderTop: '1px solid',
		borderTopColor: theme.semanticColors.menuDivider,
		height: `calc(100% - ${headerHeight}px)`,
		display: 'flex',
	},
	rightSide: {
		height: '100%',
		width: '100%',
	},
}));
