import { createAsyncThunk } from '@reduxjs/toolkit';

import { AppDocument, Section, WithId } from '../../models';
import { createDocumentInLibrary, createDocumentLibrarySection } from '../../services';
import { AppState } from '../AppState';

export const createDocument = createAsyncThunk<
	{ section: WithId<Section>; document: WithId<AppDocument> },
	{ sectionName: string; documentName: string },
	{ state: AppState }
>('documentLibrary/createDocument', async (payload, thunkApi) => {
	const { documentLibrary } = thunkApi.getState();

	const sectionId = Object.keys(documentLibrary.sectionsById).find(
		(sectionId) => documentLibrary.sectionsById[sectionId].name === payload.sectionName,
	);

	const section = !sectionId
		? await createDocumentLibrarySection(payload.sectionName)
		: {
				id: sectionId,
				...documentLibrary.sectionsById[sectionId],
		  };

	const file = await createDocumentInLibrary(section.name, payload.documentName, 'test');

	const appDocument: WithId<AppDocument> = {
		...file,
		sectionId: section.id,
	};

	return {
		section,
		document: appDocument,
	};
});
