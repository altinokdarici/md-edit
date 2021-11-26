import { ThemeProvider } from '@fluentui/react';
import React, { PropsWithChildren } from 'react';
import { useRecoilState } from 'recoil';

import { uxState } from '../../state';
import { lightTheme, darkTheme } from '../../themes';

export const AppThemeProvider = ({ children }: PropsWithChildren<unknown>) => {
	const [{ isDarkModeEnabled }] = useRecoilState(uxState);

	return (
		<ThemeProvider theme={isDarkModeEnabled ? darkTheme : lightTheme} applyTo="body">
			{children}
		</ThemeProvider>
	);
};
