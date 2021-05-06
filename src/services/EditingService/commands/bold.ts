// eslint-disable-next-line import/no-unresolved
import { editor, Range } from 'monaco-editor';

export const bold = (instance: editor.IStandaloneCodeEditor) => () => {
	const selection = instance.getSelection();
	if (!selection) {
		throw new Error('No selection.');
	}

	const range = new Range(
		selection.startLineNumber,
		selection.startColumn,
		selection.endLineNumber,
		selection.endColumn,
	);

	const value = instance.getModel()?.getValueInRange(range);

	if (!value) {
		throw new Error('No selected value');
	}

	const isBold = value.startsWith('**') && value.endsWith('**');
	const text = isBold ? value.substring(2, value.length - 2) : `**${value}**`;

	instance.executeEdits('bold-command', [{ range, text, forceMoveMarkers: true }]);
};
