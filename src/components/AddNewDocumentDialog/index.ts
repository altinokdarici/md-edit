import { connect } from 'react-redux';

import { AppState, actions } from '../../store';
import {
	AddNewDocumentDialog as AddNewDocumentDialogInternal,
	AddNewDocumentDialogDispatchProps,
	AddNewDocumentDialogStateProps,
} from './AddNewDocumentDialog';

export const mapStateToProps = ({ documentLibrary }: AppState): AddNewDocumentDialogStateProps => ({
	sectionsById: documentLibrary.sectionsById,
});

export const mapDispatchToProps: AddNewDocumentDialogDispatchProps = {
	onSave: (sectionName: string, documentName: string) =>
		actions.documentLibrary.createDocument({ sectionName, documentName }),
};

export const AddNewDocumentDialog = connect(mapStateToProps, mapDispatchToProps)(AddNewDocumentDialogInternal);
