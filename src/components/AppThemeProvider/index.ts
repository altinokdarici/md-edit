import { connect } from 'react-redux';

import { AppState } from '../../store';
import { AppThemeProvider as AppThemeProviderInternal } from './AppThemeProvider';
import { AppThemeProviderProps } from './AppThemeProvider.Props';

const mapStateToProps = ({ ux }: AppState): AppThemeProviderProps => ({
	isDarkModeEnabled: !!ux.isDarkModeEnabled,
});

export const AppThemeProvider = connect(mapStateToProps)(AppThemeProviderInternal);
