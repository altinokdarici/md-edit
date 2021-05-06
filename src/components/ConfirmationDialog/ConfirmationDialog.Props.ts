export interface ConfirmationDialogProps {
	title: string;
	message: string;
	yesButtonText: string;
	noButtonText: string;
	onYesClicked: () => void;
	onNoClicked: () => void;
}
