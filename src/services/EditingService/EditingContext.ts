import { DocumentStatus } from '../../models';
import { EditingService } from './EditingService';

export interface EditingContextActions {
	updateDocumentStatus?: (documentId: string, status: DocumentStatus) => void;
}
export interface EditingContext {
	editingServices: {
		[documentId: string]: EditingService;
	};
	actions: EditingContextActions;
}

let editingContext: EditingContext = {
	editingServices: {},
	actions: {},
};

export const setEditingActions = (actions: EditingContextActions) => {
	editingContext = {
		...editingContext,
		actions: {
			...actions,
		},
	};
};

export const getEditingContext = () => editingContext;
