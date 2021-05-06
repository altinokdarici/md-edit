import { connect } from 'react-redux';

import { navLinkGroupsSelector } from '../../selectors';
import { AppState, actions } from '../../store';
import { DocumentLibrary as DocumentLibraryInternal } from './DocumentLibrary';
import { DocumentLibraryStateProps, DocumentLibraryDispatchProps } from './DocumentLibrary.Props';

const mapStateToProps = ({ ux, documentLibrary }: AppState): DocumentLibraryStateProps => ({
	isVisible: ux.isDocumentLibraryVisible,
	navLinkGroups: navLinkGroupsSelector(documentLibrary),
	selectedDocumentId: documentLibrary.selectedDocumentId,
	isLoading: documentLibrary.isLoadingDocumentLibrary,
});

const mapDispatchToProps: DocumentLibraryDispatchProps = {
	search: actions.documentLibrary.updateSearchKey,
	onDocumentClick: actions.documentLibrary.selectDocument,
};

export const DocumentLibrary = connect(mapStateToProps, mapDispatchToProps)(DocumentLibraryInternal);
