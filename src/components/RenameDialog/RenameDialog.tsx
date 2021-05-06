import React from 'react';
import { DefaultButton, Dialog, DialogFooter, DialogType, PrimaryButton, TextField } from '@fluentui/react';

import { RenameDialogProps } from './RenameDialog.Props';

export const RenameDialog = ({ initialValue, onCancel, onSave }: RenameDialogProps) => {
	const [value, setValue] = React.useState<string>(initialValue);

	const onChange = (_: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
		setValue(newValue || '');
	};

	const onSaveClick = () => onSave(value);

	return (
		<Dialog hidden={false} dialogContentProps={{ type: DialogType.normal, title: 'Rename' }}>
			<TextField label="Name" value={value} onChange={onChange} />

			<DialogFooter>
				<PrimaryButton text="Save" disabled={!value} onClick={onSaveClick} />
				<DefaultButton text="Cancel" onClick={onCancel} />
			</DialogFooter>
		</Dialog>
	);
};
