import { IButtonStyles, makeStyles } from '@fluentui/react';

export const useLoginClassNames = makeStyles((theme) => ({
	container: {
		width: 600,
		padding: 200,
		marginLeft: 'auto',
		marginRight: 'auto',
		backgroundColor: theme.semanticColors.bodyBackground,
	},
	highLight: {
		color: 'white',
	},
	title: {
		color: 'grey',
	},
	loginButtonContainer: {
		width: 213,
		display: 'flex',
		flexDirection: 'column',
	},
}));

export const useMicrosoftLoginButtonStyles = (): IButtonStyles => ({
	root: {
		height: 41,
		paddingLeft: 12,
		paddingRight: 12,
		font: 'Segoe UI Regular',
		fontSize: '15px',
		fontWeight: 600,
		marginBottom: 10,
	},
	icon: {
		marginRight: 12,
		width: 21,
		height: 21,
	},
	label: {
		margin: 0,
	},
});
