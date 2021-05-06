import { DefaultButton, Dialog, DialogFooter, DialogType, PrimaryButton } from '@fluentui/react';
import React from 'react';

import { ConfirmationDialogProps } from './ConfirmationDialog.Props';

export const ConfirmationDialog = ({
	message,
	noButtonText,
	title,
	yesButtonText,
	onYesClicked,
	onNoClicked,
}: ConfirmationDialogProps) => {
	const dialogContentProps = {
		type: DialogType.normal,
		title,
		subText: message,
	};

	return (
		<Dialog onDismiss={onNoClicked} hidden={false} dialogContentProps={dialogContentProps}>
			<DialogFooter>
				<PrimaryButton onClick={onYesClicked} text={yesButtonText} />
				<DefaultButton onClick={onNoClicked} text={noButtonText} />
			</DialogFooter>
		</Dialog>
	);
};
