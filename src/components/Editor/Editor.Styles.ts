import { makeStyles } from '@fluentui/react';

export const useEditorClassNames = makeStyles((theme) => ({
	container: {
		borderRight: '3px solid',
		borderRightColor: theme.semanticColors.menuDivider,
	},
	editor: {
		height: '100%',
		boxSizing: 'border-box',
	},
}));
