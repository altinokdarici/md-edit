import { makeStyles } from '@fluentui/react';

export const useViewerClassNames = makeStyles((theme) => ({
	container: {
		width: '100%',
		backgroundColor: theme.semanticColors.bodyBackground,
		color: theme.palette.black,
		height: '100%',
		overflow: 'auto',
		borderLeft: '1px solid',
		borderLeftColor: theme.semanticColors.menuDivider,

		flex: 1,
	},
	viewer: {
		flex: 1,
		width: '80%',
		paddingLeft: 15,
		marginLeft: 'auto',
		marginRight: 'auto',
		paddingBottom: 50,
		selectors: {
			h1: {
				paddingBottom: '.3em',
				borderBottom: '1px solid',
				borderBottomColor: theme.semanticColors.menuDivider,
			},
			h2: {
				paddingBottom: '.3em',
				borderBottom: '1px solid',
				borderBottomColor: theme.semanticColors.menuDivider,
			},
			code: {
				fontSize: '90%',
				color: theme.semanticColors.errorText,
				backgroundColor: theme.semanticColors.errorBackground,
				borderRadius: 4,
				padding: 2,
			},
			pre: {
				padding: 4,
				backgroundColor: theme.semanticColors.errorBackground,
				borderRadius: 4,
			},
		},
	},
}));
