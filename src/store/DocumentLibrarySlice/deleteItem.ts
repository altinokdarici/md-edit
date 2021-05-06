import { createAsyncThunk } from '@reduxjs/toolkit';

import { AppState } from '../AppState';
import { deleteDocument } from './deleteDocument';
import { deleteSection } from './deleteSection';

export const deleteItem = createAsyncThunk<string, string, { state: AppState }>(
	'documentLibrarydeleteItem',
	(itemId: string, thunkApi) => {
		const { documentLibrary } = thunkApi.getState();
		const { documentsById, sectionsById } = documentLibrary;
		if (sectionsById[itemId]) {
			thunkApi.dispatch(deleteSection(itemId));
		} else if (documentsById[itemId]) {
			thunkApi.dispatch(deleteDocument(itemId));
		}

		return itemId;
	},
);
