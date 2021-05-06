// eslint-disable-next-line import/no-unresolved
import { editor } from 'monaco-editor';

import { registerCommands } from './commands';

export const setEditorInstance = (instance: editor.IStandaloneCodeEditor) => {
	(window as any).editorInstance = instance;
	registerCommands(instance);
};

export const getEditorInstance = () => (window as any).editorInstance as editor.IStandaloneCodeEditor | undefined;
