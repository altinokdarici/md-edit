import { connect } from 'react-redux';

import { AppState } from '../../store';
import { Layout as LayoutInternal } from './Layout';
import { LayoutProps } from './Layout.Props';

const mapStateToProps = ({ ux }: AppState): LayoutProps => ({
	isDarkModeEnabled: !!ux.isDarkModeEnabled,
});

export const Layout = connect(mapStateToProps)(LayoutInternal);
