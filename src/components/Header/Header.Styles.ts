import { FontSizes, makeStyles } from '@fluentui/react';

import { noSelectStyle } from '../../styles';

export const useHeaderClassNames = makeStyles((theme) => ({
	container: {
		display: 'flex',
		backgroundColor: theme.semanticColors.bodyBackground,
		color: 'white',
		justifyContent: 'space-between',
		alignItems: 'center',
		...noSelectStyle,
	},

	leftRegion: {
		flexGrow: 0,
		flexShrink: 1,
		minWidth: 159,
		flexBasis: 'auto',
		display: 'flex',
		alignItems: 'center',
	},
	centerRegion: {
		display: 'flex',
		justifyContent: 'center',
		flex: '1 1 auto',
		minWidth: 75,
		alignItems: 'center',
	},
	rightRegion: {
		display: 'flex',
		flex: '1 1 auto',
		justifyContent: 'flex-end',
		alignItems: 'center',
	},
	waffleIcon: {
		fontSize: FontSizes.large,
		marginLeft: 16,
		marginRight: 16,
	},
	appName: {
		fontWeight: 600,
		fontSize: '16px',
		padding: '0 16px 0 8px',
		color: theme.palette.themePrimary,
	},
	documentName: {
		marginLeft: 12,
		fontWeight: 400,
		fontSize: '14px',
	},
}));
