import {
	ComboBox,
	DefaultButton,
	Dialog,
	DialogFooter,
	DialogType,
	IComboBox,
	IComboBoxOption,
	PrimaryButton,
	TextField,
} from '@fluentui/react';
import React from 'react';

import { localization } from '../../localization';
import { Section } from '../../models';

export interface AddNewDocumentDialogStateProps {
	sectionsById: { [sectionId: string]: Section };
}

export interface AddNewDocumentDialogDispatchProps {
	onSave: (sectionId: string, documentName: string) => void;
}
export interface AddNewDocumentDialogOwnProps {
	onHide: () => void;
}

export type AddNewDocumentDialogProps = AddNewDocumentDialogStateProps &
	AddNewDocumentDialogOwnProps &
	AddNewDocumentDialogDispatchProps;

export const AddNewDocumentDialog = ({ sectionsById, onSave, onHide }: AddNewDocumentDialogProps) => {
	const [section, setSection] = React.useState<string | undefined>(undefined);
	const [documentName, setDocumentName] = React.useState<string | undefined>(undefined);

	const [options] = React.useState<IComboBoxOption[]>(
		Object.keys(sectionsById).map((sectionId) => ({
			key: sectionId,
			text: sectionsById[sectionId].name,
		})),
	);

	const onSaveClicked = React.useCallback(() => {
		if (section && documentName) {
			onSave(section, documentName);
			onHide();
		}
	}, [section, documentName, onSave, onHide]);

	const onComboBoxChange = React.useCallback(
		(_event: React.FormEvent<IComboBox>, option?: IComboBoxOption, _index?: number, _value?: string) => {
			setSection(option!.key as string);
		},
		[setSection],
	);

	const onTextFieldChange = React.useCallback(
		(_: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
			setDocumentName(newValue);
		},
		[],
	);
	return (
		<Dialog hidden={false} dialogContentProps={{ type: DialogType.normal, title: localization.newDocument }}>
			<ComboBox
				label={localization.section}
				allowFreeform={true}
				autoComplete="off"
				options={options}
				selectedKey={section}
				onChange={onComboBoxChange}
			/>
			<TextField label={localization.documentName} value={documentName} onChange={onTextFieldChange} />

			<DialogFooter>
				<PrimaryButton text={localization.save} onClick={onSaveClicked} />
				<DefaultButton text={localization.cancel} onClick={onHide} />
			</DialogFooter>
		</Dialog>
	);
};
