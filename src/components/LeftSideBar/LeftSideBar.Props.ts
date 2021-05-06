export interface LefSideBarStateProps {
	isDocumentLibraryVisible?: boolean;
}
export interface LefSideBarDispatchProps {
	toggleIsDocumentLibraryVisible: () => void;
}

export type LefSideBarProps = LefSideBarStateProps & LefSideBarDispatchProps;
