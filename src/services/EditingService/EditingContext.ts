import { DocumentStatus } from '../../models';
import { EditingService } from './EditingService';

export interface EditingContextActions {
	updateDocumentStatus: (documentId: string, status: DocumentStatus) => void;
}
export interface EditingContext {
	editingServices: {
		[documentId: string]: EditingService;
	};
	actions: EditingContextActions;
}

let editingContext: EditingContext | undefined;

export const setEditingContext = (context: EditingContext) => {
	editingContext = context;
};

export const getEditingContext = () => editingContext;
