export interface RenameDialogProps {
	initialValue: string;
	onSave: (value: string) => void;
	onCancel: () => void;
}
