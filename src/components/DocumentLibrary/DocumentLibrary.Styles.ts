import { ICommandBarStyles, INavStyles, ISearchBoxStyles, makeStyles } from '@fluentui/react';

import { noSelectStyle } from '../../styles';

export const useDocumentLibraryClassNames = makeStyles((theme) => ({
	container: {
		backgroundColor: theme.semanticColors.bodyBackground,
		height: '100%',
		borderRight: '3px solid',
		borderRightColor: theme.semanticColors.menuDivider,
	},
	header: {
		height: 44,
		lineHeight: 44,
		color: theme.semanticColors.buttonText,
		marginLeft: 10,
		...noSelectStyle,
	},
	commandBarContainer: {
		position: 'absolute',
		bottom: 0,
	},
}));

export const navStyles: Partial<INavStyles> = {
	root: {
		overflowY: 'auto',
	},
};

export const searchBoxStyles: ISearchBoxStyles = {
	root: {
		border: 0,
		marginLeft: 1,
		marginRight: 1,
	},
};

export const commandBarStyles: ICommandBarStyles = {
	root: {
		paddingLeft: 10,
	},
};
