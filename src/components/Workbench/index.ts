import { connect } from 'react-redux';

import { AppState } from '../../store';
import { Workbench as WorkbenchInternal, WorkbenchProps } from './Workbench';

const mapStateToProps = ({ documentLibrary }: AppState): WorkbenchProps => ({
	showNoDocument: !documentLibrary.selectedDocumentId,
});

export const Workbench = connect(mapStateToProps)(WorkbenchInternal);
