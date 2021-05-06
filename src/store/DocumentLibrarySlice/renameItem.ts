import { createAsyncThunk } from '@reduxjs/toolkit';

import { renameDocumentLibraryItem } from '../../services';
import { AppState } from '../AppState';

export const renameItem = createAsyncThunk<
	{ itemId: string; newName: string },
	{ itemId: string; newName: string },
	{ state: AppState }
>('documentLibrary/renameItem', async (payload, thunkApi) => {
	const { documentLibrary } = thunkApi.getState();
	const { documentsById } = documentLibrary;

	const newName = documentsById[payload.itemId] ? `${payload.newName}.md` : payload.newName;

	await renameDocumentLibraryItem(payload.itemId, newName);

	return payload;
});
