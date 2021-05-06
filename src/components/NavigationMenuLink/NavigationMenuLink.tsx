import React from 'react';
import { ActionButton, INavLink } from '@fluentui/react';

import { localization } from '../../localization';
import { ConfirmationDialog } from '../ConfirmationDialog';
import { useBoolean } from '../../hooks';
import { RenameDialog } from '../RenameDialog';

export interface NavigationMenuLinkDispatchProps {
	onDelete: (itemId: string) => void;
	onEdit: (itemId: string, newName: string) => void;
}

export interface NavigationMenuLinkOwnProps {
	linkProps: INavLink;
}

export type NavigationMenuLinkProps = NavigationMenuLinkOwnProps & NavigationMenuLinkDispatchProps;

export const NavigationMenuLink = ({ linkProps, onEdit, onDelete }: NavigationMenuLinkProps) => {
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
						if (linkProps.key) {
							onDelete(linkProps.key);
						}
						hideDeleteDialog();
					}}
				/>
			)}
			{isRenameDialogVisible && (
				<RenameDialog
					initialValue={linkProps.value}
					onCancel={hideRenameDialog}
					onSave={(value) => {
						if (linkProps.key) {
							onEdit(linkProps.key, value);
						}
						hideRenameDialog();
					}}
				/>
			)}
		</div>
	);
};
