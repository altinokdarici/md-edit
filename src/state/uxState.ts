import { atom } from 'recoil';

export interface UxState {
	isDocumentLibraryVisible?: boolean;
	isViewerVisible?: boolean;
	isDarkModeEnabled?: boolean;
}

const defaultState: UxState = {
	isDocumentLibraryVisible: true,
	isViewerVisible: true,
	isDarkModeEnabled: true,
};

export const uxState = atom<UxState>({
	key: 'ux',
	default: defaultState,
});
