import { connect } from 'react-redux';

import { AppState, actions } from '../../store';
import { LeftSideBar as LeftSideBarInternal } from './LeftSideBar';
import { LefSideBarDispatchProps, LefSideBarStateProps } from './LeftSideBar.Props';

const mapStateToProps = ({ ux }: AppState): LefSideBarStateProps => ({
	isDocumentLibraryVisible: ux.isDocumentLibraryVisible,
});

const mapDispatchToProps: LefSideBarDispatchProps = {
	toggleIsDocumentLibraryVisible: actions.ux.toggleIsDocumentLibraryVisible,
};

export const LeftSideBar = connect(mapStateToProps, mapDispatchToProps)(LeftSideBarInternal);
