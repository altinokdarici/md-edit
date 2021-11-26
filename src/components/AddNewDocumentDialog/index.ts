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
	onSave: (sectionId: string, documentName: string) =>
		actions.documentLibrary.createDocument({ sectionId, documentName }),
};

export const AddNewDocumentDialog = connect(mapStateToProps, mapDispatchToProps)(AddNewDocumentDialogInternal);
