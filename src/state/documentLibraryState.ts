import { INavLink, INavLinkGroup } from '@fluentui/react';
import { atom, selector, selectorFamily } from 'recoil';

import { AppDocument, Dictionary, DocumentStatus, Section, WithId } from '../models';

export interface DocumentLibraryState {
	sectionsById: {
		[sectionId: string]: Section;
	};
	documentsById: {
		[documentId: string]: AppDocument;
	};
	documentStatusesById: {
		[documentId: string]: DocumentStatus;
	};
	selectedDocumentId?: string;
	content?: string;
}

const defaultState: DocumentLibraryState = {
	sectionsById: {},
	documentsById: {},
	documentStatusesById: {},
};

export const documentLibraryState = atom<DocumentLibraryState>({
	key: 'documentLibrary',
	default: defaultState,
});

const convertToAppDocumentWithId = (id: string, document: AppDocument): WithId<AppDocument> => ({
	id,
	...document,
});

const search = (section: Section, documents: Dictionary<AppDocument>, searchKey?: string) => {
	return section.documentIds
		.filter((documentId) =>
			searchKey
				? documents[documentId].name.toLocaleLowerCase().indexOf(searchKey.toLocaleLowerCase()) > -1
				: true,
		)
		.map((x) => convertToAppDocumentWithId(x, documents[x]));
};

export const navLinkGroupsSelector = selectorFamily({
	key: 'navLinkGroupsSelector',
	dangerouslyAllowMutability: true,
	get: (searchKey: string | undefined) => ({ get }) => {
		const { sectionsById, documentsById } = get(documentLibraryState);

		return <INavLinkGroup[]>[
			{
				links: Object.keys(sectionsById).map((sectionKey) => ({
					name: sectionsById[sectionKey].name,
					key: sectionKey,
					url: '#',
					isExpanded: true,
					links: search(sectionsById[sectionKey], documentsById, searchKey).map(
						(doc) =>
							<INavLink>{
								key: doc.id,
								name: doc.name,
								url: '#',
								icon: 'TextDocument',
							},
					),
				})),
			},
		];
	},
});

export const selectedDocumentSelector = selector({
	key: 'selectedDocumentSelector',
	get: ({ get }) => {
		const { selectedDocumentId, documentsById } = get(documentLibraryState);

		if (selectedDocumentId && documentsById[selectedDocumentId]) {
			return documentsById[selectedDocumentId];
		}

		return undefined;
	},
});

export const selectedDocumentStatusesSelector = selector({
	key: 'selectedDocumentStatusesSelector',
	get: ({ get }) => {
		const { selectedDocumentId, documentStatusesById } = get(documentLibraryState);

		if (selectedDocumentId && documentStatusesById[selectedDocumentId]) {
			return documentStatusesById[selectedDocumentId];
		}

		return undefined;
	},
});
