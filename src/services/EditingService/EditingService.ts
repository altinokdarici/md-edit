import { Async } from '@fluentui/react';
// eslint-disable-next-line import/no-unresolved
import { editor } from 'monaco-editor';
import { container } from 'tsyringe';

import { DocumentStatus } from '../../models';
import { downloadDocumentContent } from '../DocumentService';
import { IFileSystemService } from '../FileSystemService';
import { EditingContextActions } from './EditingContext';
import { getEditorInstance } from './editorInstance';
import { getDocumentUri } from './getDocumentUri';

const getFileSystemService = () => container.resolve<IFileSystemService>('IFileSystemService');

export type OnChangeCallback = (content: string) => void;

export class EditingService {
	private async: Async = new Async();

	private onChangeCallbacks = new Set<OnChangeCallback>();

	private model: editor.ITextModel = editor.createModel('', 'markdown', getDocumentUri(this.documentId));

	private saveChanges = this.async.debounce(
		async () => {
			this.actions.updateDocumentStatus(this.documentId, DocumentStatus.Saving);

			getFileSystemService().setFileContentByFileId(this.documentId, this.model.getValue());

			this.actions.updateDocumentStatus(this.documentId, DocumentStatus.Saved);
		},
		400,
		{
			trailing: true,
		},
	);

	constructor(private documentId: string, private actions: EditingContextActions) {
		actions.updateDocumentStatus(documentId, DocumentStatus.Downloading);

		downloadDocumentContent(documentId).then((content) => {
			this.model.setValue(content);
			this.onChangeCallbacks.forEach((callback) => callback(content));
			this.actions.updateDocumentStatus(this.documentId, DocumentStatus.Opened);

			this.model.onDidChangeContent(() => {
				this.saveChanges();

				const content = this.model.getValue();
				this.onChangeCallbacks.forEach((callback) => callback(content));
			});
		});
	}

	public addOnChangeCallback = (callback: OnChangeCallback) => {
		this.onChangeCallbacks.add(callback);
		callback(this.model.getValue());
		return callback;
	};

	public removeOnChangeCallback = (callback: OnChangeCallback) => {
		return this.onChangeCallbacks.delete(callback);
	};

	public show = () => {
		const editorInstance = getEditorInstance();
		if (!editorInstance) {
			console.error('EditorInstance can not be undefined');
			return;
		}

		editorInstance.setModel(this.model);
	};
}
