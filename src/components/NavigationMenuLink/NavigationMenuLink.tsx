import React from 'react';
import { ActionButton, INavLink } from '@fluentui/react';
import { useRecoilState } from 'recoil';

import { localization } from '../../localization';
import { ConfirmationDialog } from '../ConfirmationDialog';
import { useBoolean } from '../../hooks';
import { RenameDialog } from '../RenameDialog';
import { deleteDocumentLibraryItem, renameDocumentLibraryItem } from '../../services';
import { documentLibraryState } from '../../state';

export interface NavigationMenuLinkProps {
	linkProps: INavLink;
}

export const NavigationMenuLink = ({ linkProps }: NavigationMenuLinkProps) => {
	const [documentLibrary, setDocumentLibrary] = useRecoilState(documentLibraryState);
	const [isDeleteDialogVisible, showDeleteDialog, hideDeleteDialog] = useBoolean(false);
	const [isRenameDialogVisible, showRenameDialog, hideRenameDialog] = useBoolean(false);

	const [showActions, setShowActions] = React.useState<boolean>(false);
	const onMouseEnter = () => setShowActions(true);
	const onMouseLeave = () => setShowActions(false);

	return (
		<div
			style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginLeft: 4 }}
			onMouseEnter={onMouseEnter}
			onMouseLeave={onMouseLeave}
		>
			<span>{linkProps.name}</span>
			{showActions && (
				<div>
					<ActionButton iconProps={{ iconName: 'Edit' }} onClick={showRenameDialog} />
					<ActionButton iconProps={{ iconName: 'Delete' }} onClick={showDeleteDialog} />
				</div>
			)}
			{isDeleteDialogVisible && (
				<ConfirmationDialog
					message={localization.deleteDialogMessage.replace('{0}', linkProps.name)}
					noButtonText={localization.noDoNotDelete}
					title={localization.deleteDialogTitle}
					yesButtonText={localization.yesDelete}
					onNoClicked={hideDeleteDialog}
					onYesClicked={() => {
						const itemId = linkProps.key;
						if (itemId) {
							deleteDocumentLibraryItem(itemId).then(() => {
								const documents = { ...documentLibrary.documentsById };
								delete documents[itemId];

								const { sectionId } = documentLibrary.documentsById[itemId];
								const documentIds = documentLibrary.sectionsById[sectionId].documentIds.filter(
									(x) => x !== itemId,
								);

								setDocumentLibrary({
									...documentLibrary,
									selectedDocumentId:
										documentLibrary.selectedDocumentId === itemId
											? undefined
											: documentLibrary.selectedDocumentId,
									documentsById: {
										...documents,
									},
									sectionsById: {
										...documentLibrary.sectionsById,
										[sectionId]: {
											...documentLibrary.sectionsById[sectionId],
											documentIds,
										},
									},
								});
							});
						}
						hideDeleteDialog();
					}}
				/>
			)}
			{isRenameDialogVisible && (
				<RenameDialog
					initialValue={linkProps.name}
					onCancel={hideRenameDialog}
					onSave={(value) => {
						const newName = value;
						const itemId = linkProps.key;
						if (itemId) {
							renameDocumentLibraryItem(itemId, newName).then(() => {
								setDocumentLibrary({
									...documentLibrary,
									documentsById: {
										...documentLibrary.documentsById,
										[itemId]: {
											...documentLibrary.documentsById[itemId],
											name: newName,
										},
									},
								});
							});
						}
						hideRenameDialog();
					}}
				/>
			)}
		</div>
	);
};
