import { ThemeProvider } from '@fluentui/react';
import React, { PropsWithChildren } from 'react';

import { lightTheme, darkTheme } from '../../themes';
import { AppThemeProviderProps } from './AppThemeProvider.Props';

export const AppThemeProvider = ({ isDarkModeEnabled, children }: PropsWithChildren<AppThemeProviderProps>) => (
	<ThemeProvider theme={isDarkModeEnabled ? darkTheme : lightTheme} applyTo="body">
		{children}
	</ThemeProvider>
);
