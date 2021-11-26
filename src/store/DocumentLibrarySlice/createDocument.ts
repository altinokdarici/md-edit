import { createAsyncThunk } from '@reduxjs/toolkit';

import { AppDocument, Section, WithId } from '../../models';
import { createDocumentInLibrary } from '../../services';
import { AppState } from '../AppState';

export const createDocument = createAsyncThunk<
	{ section: WithId<Section>; document: WithId<AppDocument> },
	{ sectionId: string; documentName: string },
	{ state: AppState }
>('documentLibrary/createDocument', async (payload, thunkApi) => {
	const { documentLibrary } = thunkApi.getState();

	const section: WithId<Section> = {
		...documentLibrary.sectionsById[payload.sectionId],
		id: payload.sectionId,
	};

	const file = await createDocumentInLibrary(payload.sectionId, payload.documentName, 'test');

	const appDocument: WithId<AppDocument> = {
		...file,
		sectionId: payload.sectionId,
	};

	return {
		section,
		document: appDocument,
	};
});
