import { INavLink, INavLinkGroup } from '@fluentui/react';
import { createSelector } from 'reselect';

import { AppDocument, Dictionary, Section, WithId } from '../models';
import { DocumentLibraryState } from '../store/DocumentLibrarySlice';

const sectionsByIdSelector = (state: DocumentLibraryState) => state.sectionsById;

const searchKeySelector = (state: DocumentLibraryState) => state.searchKey;

const documentsByIdSelector = (state: DocumentLibraryState) => state.documentsById;

const documentStatusesByIdSelector = (state: DocumentLibraryState) => state.documentStatusesById;

const selectedDocumentIdSelector = (state: DocumentLibraryState) => state.selectedDocumentId;

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

export const navLinkGroupsSelector = createSelector(
	sectionsByIdSelector,
	documentsByIdSelector,
	searchKeySelector,
	(sectionsById, documentsById, searchKey): INavLinkGroup[] => [
		{
			links: Object.keys(sectionsById).map((sectionKey) => ({
				name: sectionsById[sectionKey].name,
				key: sectionKey,
				url: '#',
				isExpanded: true,
				links: search(sectionsById[sectionKey], documentsById, searchKey).map(
					(doc) =>
						({
							key: doc.id,
							name: doc.name,
							url: '#',
							icon: 'TextDocument',
						} as INavLink),
				),
			})),
		},
	],
);

export const selectedDocumentSelector = createSelector(
	documentsByIdSelector,
	selectedDocumentIdSelector,
	(documentsById, selectedDocumentId) => {
		if (selectedDocumentId && documentsById[selectedDocumentId]) {
			return documentsById[selectedDocumentId];
		}

		return undefined;
	},
);

export const selectedDocumentStatusesSelector = createSelector(
	documentStatusesByIdSelector,
	selectedDocumentIdSelector,
	(documentStatusesById, selectedDocumentId) => {
		if (selectedDocumentId && documentStatusesById[selectedDocumentId]) {
			return documentStatusesById[selectedDocumentId];
		}

		return undefined;
	},
);
