import { createAsyncThunk } from '@reduxjs/toolkit';

import { deleteDocumentLibraryItem } from '../../services';
import { AppState } from '../AppState';

export const deleteSection = createAsyncThunk<string, string, { state: AppState }>(
	'documentLibrary/deleteSection',
	async (sectionId: string) => {
		await deleteDocumentLibraryItem(sectionId);

		return sectionId;
	},
);
