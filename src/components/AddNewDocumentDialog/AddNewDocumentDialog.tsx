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
import { useRecoilState } from 'recoil';

import { localization } from '../../localization';
import { createDocumentInLibrary } from '../../services';
import { documentLibraryState } from '../../state';

export interface AddNewDocumentDialogProps {
	onHide: () => void;
}

export const AddNewDocumentDialog = ({ onHide }: AddNewDocumentDialogProps) => {
	const [documentLibrary, setDocumentLibrary] = useRecoilState(documentLibraryState);
	const [section, setSection] = React.useState<string | undefined>(undefined);
	const [documentName, setDocumentName] = React.useState<string | undefined>(undefined);

	const [options] = React.useState<IComboBoxOption[]>(
		Object.keys(documentLibrary.sectionsById).map((sectionId) => ({
			key: sectionId,
			text: documentLibrary.sectionsById[sectionId].name,
		})),
	);

	const onSaveClicked = React.useCallback(() => {
		if (section && documentName) {
			createDocumentInLibrary(section, documentName, 'test').then((response) => {
				setDocumentLibrary({
					...documentLibrary,
					sectionsById: {
						...documentLibrary.sectionsById,
						[section]: {
							...documentLibrary.sectionsById[section],
							documentIds: [...documentLibrary.sectionsById[section].documentIds, response.id],
						},
					},
					documentsById: {
						...documentLibrary.documentsById,
						[response.id]: {
							name: response.name,
							sectionId: section,
						},
					},
				});
			});

			onHide();
		}
	}, [section, documentName, onHide, setDocumentLibrary, documentLibrary]);

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
