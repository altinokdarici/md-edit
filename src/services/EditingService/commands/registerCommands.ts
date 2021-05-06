/* eslint-disable no-bitwise */
// eslint-disable-next-line import/no-unresolved
import { editor, KeyCode, KeyMod } from 'monaco-editor';

import { bold } from './bold';
import { italic } from './italic';

export const registerCommands = (instance: editor.IStandaloneCodeEditor) => {
	instance.addCommand(KeyMod.CtrlCmd | KeyCode.KEY_B, bold(instance));
	instance.addCommand(KeyMod.CtrlCmd | KeyCode.KEY_I, italic(instance));
};
