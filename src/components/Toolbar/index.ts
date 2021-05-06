import { connect } from 'react-redux';

import { Toolbar as ToolbarInternal } from './Toolbar';
import { ToolbarDispatchProps, ToolbarStateProps } from './Toolbar.Props';
import { actions, AppState } from '../../store';

const mapStateToProps = ({ ux }: AppState): ToolbarStateProps => ({
	isViewerVisible: ux.isViewerVisible,
});

const mapDispatchToProps: ToolbarDispatchProps = {
	toggleViewer: actions.ux.toggleViewer,
};

export const Toolbar = connect(mapStateToProps, mapDispatchToProps)(ToolbarInternal);
