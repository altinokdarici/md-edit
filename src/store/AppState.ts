import { authSlice, AuthState } from './authSlice';
import { commandingSlice, CommandingState } from './commandingSlice';
import { documentLibrarySlice, DocumentLibraryState } from './DocumentLibrarySlice';
import { uxSlice, UxState } from './uxSlice';

export interface AppState {
	[uxSlice.name]: UxState;
	[documentLibrarySlice.name]: DocumentLibraryState;
	[commandingSlice.name]: CommandingState;
	[authSlice.name]: AuthState;
}
