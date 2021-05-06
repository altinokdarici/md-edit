import React from 'react';
import { Resizable } from 're-resizable';
import { Nav, CommandBar, SearchBox, ICommandBarItemProps, INavLink, Spinner } from '@fluentui/react';

import { DocumentLibraryProps } from './DocumentLibrary.Props';
import { commandBarStyles, useDocumentLibraryClassNames, navStyles, searchBoxStyles } from './DocumentLibrary.Styles';
import { localization } from '../../localization';
import { NavigationMenuLink } from '../NavigationMenuLink';
import { AddNewDocumentDialog } from '../AddNewDocumentDialog';
import { useBoolean } from '../../hooks';
import { getEditingService } from '../../services/EditingService';

export const DocumentLibrary = ({
	isVisible,
	navLinkGroups,
	search,
	onDocumentClick,
	selectedDocumentId,
	isLoading,
}: DocumentLibraryProps) => {
	const [isAddDocumentDialogVisible, showAddDocumentDialog, hideAddDocumentDialog] = useBoolean(false);

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
			search(newValue);
		},
		[search],
	);

	const onLinkClick = React.useCallback(
		(_?: React.MouseEvent<HTMLElement, MouseEvent>, item?: INavLink) => {
			if (item?.key) {
				onDocumentClick(item.key);
				if (item.key) {
					getEditingService(item.key).show();
				}
			}
		},
		[onDocumentClick],
	);

	const classNames = useDocumentLibraryClassNames();

	if (!isVisible) {
		return null;
	}

	const onRenderLink = (props?: INavLink, _defaultRender?: (props?: INavLink) => JSX.Element | null) => {
		if (!props) {
			return null;
		}

		return <NavigationMenuLink linkProps={props} />;
	};

	const isSpinnerVisible = isLoading && (navLinkGroups.length === 0 || navLinkGroups[0].links.length === 0);

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
							selectedKey={selectedDocumentId || ''}
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
