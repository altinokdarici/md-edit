import { createAsyncThunk } from '@reduxjs/toolkit';

import { deleteDocumentLibraryItem } from '../../services';
import { AppState } from '../AppState';

export const deleteDocument = createAsyncThunk<string, string, { state: AppState }>(
	'documentLibrary/deleteDocument',
	async (documentId: string) => {
		await deleteDocumentLibraryItem(documentId);

		return documentId;
	},
);
