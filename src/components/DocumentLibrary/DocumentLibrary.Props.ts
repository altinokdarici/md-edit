import { INavLinkGroup } from '@fluentui/react';

export interface DocumentLibraryStateProps {
	isVisible?: boolean;
	navLinkGroups: INavLinkGroup[];
	selectedDocumentId?: string;
	isLoading?: boolean;
}

export interface DocumentLibraryDispatchProps {
	search: (searchKey?: string) => void;
	onDocumentClick: (selectedDocumentId: string) => void;
}

export type DocumentLibraryProps = DocumentLibraryStateProps & DocumentLibraryDispatchProps;
