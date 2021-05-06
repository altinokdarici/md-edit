import { authSlice } from './authSlice';
import { commandingSlice } from './commandingSlice';
import {
	documentLibrarySlice,
	fetchDocumentLibrary,
	deleteItem,
	renameItem,
	createDocument,
} from './DocumentLibrarySlice';
import { uxSlice } from './uxSlice';

export const actions = {
	[uxSlice.name]: uxSlice.actions,
	[documentLibrarySlice.name]: {
		...documentLibrarySlice.actions,
		fetchDocumentLibrary,
		deleteItem,
		renameItem,
		createDocument,
	},
	[commandingSlice.name]: commandingSlice.actions,
	[authSlice.name]: authSlice.actions,
};
