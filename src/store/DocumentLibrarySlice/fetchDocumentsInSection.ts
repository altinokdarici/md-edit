import { createAsyncThunk } from '@reduxjs/toolkit';

import { Section, WithId } from '../../models';
import { getDocumentsInSection } from '../../services';

export const fetchDocumentsInSection = createAsyncThunk(
	'documentLibrary/fetchDocuments',
	async (section: WithId<Section>) => {
		const docs = await getDocumentsInSection(section);
		return docs;
	},
);
