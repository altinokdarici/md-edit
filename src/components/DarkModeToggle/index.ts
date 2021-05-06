import { connect } from 'react-redux';

import { actions, AppState } from '../../store';
import { DarkModeToggle as DarkModeToggleInternal } from './DarkModeToggle';
import { DarkModeToggleDispatchProps, DarkModeToggleStateProps } from './DarkModeToggle.Props';

const mapStateToProps = ({ ux }: AppState): DarkModeToggleStateProps => ({
	isDarkModeEnabled: !!ux.isDarkModeEnabled,
});

const mapDispatchToProps: DarkModeToggleDispatchProps = {
	toggleDarkMode: actions.ux.toggleDarkMode,
};

export const DarkModeToggle = connect(mapStateToProps, mapDispatchToProps)(DarkModeToggleInternal);
