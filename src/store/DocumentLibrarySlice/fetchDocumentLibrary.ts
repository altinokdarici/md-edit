import { createAsyncThunk } from '@reduxjs/toolkit';

import { getSections } from '../../services';
import { fetchDocumentsInSection } from './fetchDocumentsInSection';

export const fetchDocumentLibrary = createAsyncThunk('documentLibrary/fetchDocumentLibrary', async (_, thunkApi) => {
	const sections = await getSections();
	sections.forEach((section) => {
		thunkApi.dispatch(fetchDocumentsInSection(section));
	});

	return sections;
});
