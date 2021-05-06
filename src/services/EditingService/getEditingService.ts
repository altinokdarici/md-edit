import { getEditingContext } from './EditingContext';
import { EditingService } from './EditingService';

export const getEditingService = (documentId: string) => {
	const editingContext = getEditingContext();
	if (!editingContext) {
		throw new Error('EditingContext cannot be undefined');
	}

	if (!editingContext.editingServices[documentId]) {
		editingContext.editingServices[documentId] = new EditingService(documentId, editingContext.actions);
	}

	return editingContext.editingServices[documentId];
};
