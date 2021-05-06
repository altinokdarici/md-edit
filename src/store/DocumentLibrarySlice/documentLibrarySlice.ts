import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AppDocument, DocumentStatus, Section } from '../../models';
import { createDocument } from './createDocument';
import { deleteDocument } from './deleteDocument';
import { deleteSection } from './deleteSection';
import { fetchDocumentLibrary } from './fetchDocumentLibrary';
import { fetchDocumentsInSection } from './fetchDocumentsInSection';
import { renameItem } from './renameItem';

export interface DocumentLibraryState {
	sectionsById: {
		[sectionId: string]: Section;
	};
	documentsById: {
		[documentId: string]: AppDocument;
	};
	documentStatusesById: {
		[documentId: string]: DocumentStatus;
	};
	searchKey?: string;
	selectedDocumentId?: string;
	isLoadingDocumentLibrary: boolean;
	content?: string;
}

const initialState: DocumentLibraryState = {
	isLoadingDocumentLibrary: false,
	sectionsById: {},
	documentsById: {},
	documentStatusesById: {},
};

export const documentLibrarySlice = createSlice({
	initialState,
	name: 'documentLibrary',
	reducers: {
		updateSearchKey: (state: DocumentLibraryState, { payload }: PayloadAction<string | undefined>) => {
			state.searchKey = payload;
		},
		selectDocument: (state: DocumentLibraryState, { payload }: PayloadAction<string>) => {
			state.selectedDocumentId = payload;
		},
		updateDocumentStatus: (
			state: DocumentLibraryState,
			{ payload }: PayloadAction<{ documentId: string; status: DocumentStatus }>,
		) => {
			state.documentStatusesById[payload.documentId] = payload.status;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchDocumentLibrary.pending, (state) => {
			state.isLoadingDocumentLibrary = true;
		});
		builder.addCase(fetchDocumentLibrary.fulfilled, (state, { payload }) => {
			state.isLoadingDocumentLibrary = false;
			payload.forEach((section) => {
				state.sectionsById[section.id] = {
					name: section.name,
					documentIds: section.documentIds,
				};
			});
		});

		builder.addCase(fetchDocumentsInSection.fulfilled, (state, { payload }) => {
			payload.forEach((document) => {
				state.documentsById[document.id] = {
					name: document.name,
					downloadUrl: document.downloadUrl,
					sectionId: document.sectionId,
					fileName: document.fileName,
				};

				if (state.sectionsById[document.sectionId].documentIds.indexOf(document.id) < 0) {
					state.sectionsById[document.sectionId].documentIds.push(document.id);
				}
			});
		});

		builder.addCase(deleteDocument.fulfilled, (state, { payload }) => {
			if (state.selectedDocumentId === payload) {
				state.selectedDocumentId = undefined;
			}
			const { sectionId } = state.documentsById[payload];
			delete state.documentsById[payload];
			state.sectionsById[sectionId].documentIds = state.sectionsById[sectionId].documentIds.filter(
				(x) => x !== payload,
			);
		});

		builder.addCase(deleteSection.fulfilled, (state, { payload }) => {
			const { documentIds } = state.sectionsById[payload];
			delete state.sectionsById[payload];

			documentIds.forEach((documentId) => {
				if (state.selectedDocumentId === documentId) {
					state.selectedDocumentId = undefined;
				}
				delete state.documentsById[documentId];
			});
		});

		builder.addCase(renameItem.fulfilled, (state, { payload }) => {
			if (state.sectionsById[payload.itemId]) {
				state.sectionsById[payload.itemId].name = payload.newName;
			} else if (state.documentsById[payload.itemId]) {
				state.documentsById[payload.itemId].name = payload.newName;
			}
		});

		builder.addCase(createDocument.fulfilled, (state, { payload }) => {
			const sectionExist = Object.keys(state.sectionsById).indexOf(payload.section.id) > -1;
			if (sectionExist) {
				state.sectionsById[payload.section.id].documentIds.push(payload.document.id);
			} else {
				state.sectionsById[payload.section.id] = {
					documentIds: [payload.document.id],
					name: payload.section.name,
				};
			}
			state.documentsById[payload.document.id] = payload.document;
		});
	},
});
