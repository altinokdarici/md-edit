import { connect } from 'react-redux';

import { AppState } from '../../store';
import { ViewerStateProps } from './Viewer.Props';
import { Viewer as ViewerInternal } from './Viewer';

const mapStateToProps = ({ ux, documentLibrary }: AppState): ViewerStateProps => ({
	isViewerVisible: ux.isViewerVisible,
	documentId: documentLibrary.selectedDocumentId,
});

export const Viewer = connect(mapStateToProps)(ViewerInternal);
