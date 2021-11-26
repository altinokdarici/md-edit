import React from 'react';
import { Resizable } from 're-resizable';
import { Nav, CommandBar, SearchBox, ICommandBarItemProps, INavLink, Spinner } from '@fluentui/react';
import { useRecoilState, useRecoilValue } from 'recoil';

import { commandBarStyles, useDocumentLibraryClassNames, navStyles, searchBoxStyles } from './DocumentLibrary.Styles';
import { localization } from '../../localization';
import { NavigationMenuLink } from '../NavigationMenuLink';
import { AddNewDocumentDialog } from '../AddNewDocumentDialog';
import { useBoolean } from '../../hooks';
import { getEditingService, setEditingActions } from '../../services/EditingService';
import { documentLibraryState, navLinkGroupsSelector, uxState } from '../../state';
import { fetchDocumentLibrary } from '../../services';
import { AppDocument, Dictionary, DocumentStatus, Section } from '../../models';

export const DocumentLibrary = () => {
	const [documentLibrary, setDocumentLibrary] = useRecoilState(documentLibraryState);
	const [searchKey, setSearchKey] = React.useState<string>();
	const navLinkGroups = useRecoilValue(navLinkGroupsSelector(searchKey));
	const [{ isDocumentLibraryVisible }] = useRecoilState(uxState);
	const [isAddDocumentDialogVisible, showAddDocumentDialog, hideAddDocumentDialog] = useBoolean(false);
	const [isLoadingDocumentLibrary, setIsLoadingDocumentLibrary] = React.useState<boolean>(false);
	const classNames = useDocumentLibraryClassNames();

	setEditingActions({
		updateDocumentStatus: (documentId: string, status: DocumentStatus) => {
			setDocumentLibrary({
				...documentLibrary,
				selectedDocumentId: documentId,
				documentStatusesById: {
					...documentLibrary.documentStatusesById,
					[documentId]: status,
				},
			});
		},
	});

	React.useEffect(() => {
		const fetchAsync = async () => {
			const documentLibraryResults = await fetchDocumentLibrary();

			const sectionsById: Dictionary<Section> = {};
			const documentsById: Dictionary<AppDocument> = {};

			// eslint-disable-next-line no-restricted-syntax
			for (const directory of documentLibraryResults.directories) {
				const files = documentLibraryResults.filesByDirectoryId[directory.id];

				sectionsById[directory.id] = {
					name: directory.name,
					documentIds: files.map((x) => x.id),
				};

				// eslint-disable-next-line no-restricted-syntax
				for (const file of files) {
					documentsById[file.id] = {
						sectionId: directory.id,
						name: file.name.replace('.md', ''),
					};
				}
			}
			setIsLoadingDocumentLibrary(false);
			setDocumentLibrary({
				...documentLibrary,
				sectionsById: {
					...documentLibrary.sectionsById,
					...sectionsById,
				},
				documentsById: {
					...documentLibrary.documentsById,
					...documentsById,
				},
			});
		};

		setIsLoadingDocumentLibrary(true);
		fetchAsync();

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const commandBarItems: ICommandBarItemProps[] = [
		{
			key: 'newDocument',
			text: localization.newDocument,
			onClick: showAddDocumentDialog,
			iconProps: {
				iconName: 'Add',
			},
		},
	];

	const onSearchBoxChange = React.useCallback(
		(_?: React.ChangeEvent<HTMLInputElement>, newValue?: string) => {
			setSearchKey(newValue);
		},
		[setSearchKey],
	);

	const onLinkClick = React.useCallback(
		(_?: React.MouseEvent<HTMLElement, MouseEvent>, item?: INavLink) => {
			console.log({ item });
			if (!item?.links && item?.key) {
				setDocumentLibrary({
					...documentLibrary,
					selectedDocumentId: item.key,
				});
				if (item.key) {
					getEditingService(item.key).show();
				}
			}
		},
		[setDocumentLibrary, documentLibrary],
	);

	if (!isDocumentLibraryVisible) {
		return null;
	}

	const onRenderLink = (props?: INavLink, _defaultRender?: (props?: INavLink) => JSX.Element | null) => {
		if (!props) {
			return null;
		}

		return <NavigationMenuLink linkProps={props} />;
	};

	const isSpinnerVisible =
		isLoadingDocumentLibrary && (navLinkGroups.length === 0 || navLinkGroups[0].links.length === 0);

	return (
		<>
			<Resizable
				defaultSize={{
					width: 285,
					height: '100%',
				}}
				maxWidth="50%"
				enable={{ right: true }}
				className={classNames.container}
			>
				<div className={classNames.header}>{localization.documents}</div>
				{isSpinnerVisible && <Spinner />}
				{!isSpinnerVisible && (
					<>
						<SearchBox
							placeholder={localization.search}
							styles={searchBoxStyles}
							onChange={onSearchBoxChange}
						/>
						<Nav
							onRenderLink={onRenderLink}
							selectedKey={documentLibrary.selectedDocumentId || ''}
							styles={navStyles}
							groups={navLinkGroups}
							onLinkClick={onLinkClick}
						/>
						<div className={classNames.commandBarContainer}>
							<CommandBar items={commandBarItems} styles={commandBarStyles} />
						</div>
					</>
				)}
			</Resizable>
			{isAddDocumentDialogVisible && <AddNewDocumentDialog onHide={hideAddDocumentDialog} />}
		</>
	);
};
