import { makeStyles } from '@fluentui/react';

export const useMeControlClassNames = makeStyles(() => ({
	container: {
		width: 48,
		color: 'white',
		fontSize: 12,
		textAlign: 'center',
	},
	circle: {
		height: 30,
		width: 30,
		border: '1px solid white',
		borderRadius: '50%',
		margin: 8,
		lineHeight: '32px',
	},
	button: {
		border: 'unset',
		padding: 'unset',
		width: 48,
		minWidth: 'unset',
		height: 48,
	},
}));
