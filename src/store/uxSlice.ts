import { createSlice } from '@reduxjs/toolkit';

export interface UxState {
	isDocumentLibraryVisible?: boolean;
	isViewerVisible?: boolean;
	isDarkModeEnabled?: boolean;
}

const initialState: UxState = {
	isDocumentLibraryVisible: true,
	isViewerVisible: true,
	isDarkModeEnabled: true,
};

export const uxSlice = createSlice({
	initialState,
	name: 'ux',
	reducers: {
		toggleIsDocumentLibraryVisible: (state: UxState) => {
			state.isDocumentLibraryVisible = !state.isDocumentLibraryVisible;
		},
		toggleViewer: (state: UxState) => {
			state.isViewerVisible = !state.isViewerVisible;
		},
		toggleDarkMode: (state: UxState) => {
			state.isDarkModeEnabled = !state.isDarkModeEnabled;
		},
	},
});
