import * as React from 'react';
// eslint-disable-next-line import/no-unresolved
import { editor } from 'monaco-editor';
import { Resizable } from 're-resizable';
import { useTheme } from '@fluentui/react';

import { useEditorClassNames } from './Editor.Styles';
import { setEditorInstance } from '../../services/EditingService';
import { EditorProps } from './Editor.Props';

export const Editor = ({ isDarkModeEnabled }: EditorProps) => {
	const theme = useTheme();
	const classNames = useEditorClassNames();
	const ref = React.useRef<HTMLDivElement | null>(null);

	React.useEffect(() => {
		editor.defineTheme('myCustomTheme', {
			base: isDarkModeEnabled ? 'vs-dark' : 'vs',
			inherit: true,
			colors: {
				'editor.background': theme.semanticColors.bodyBackground,
			},
			rules: [
				{
					token: '',
					background: theme.semanticColors.bodyBackground.replace('#', ''),
				},
			],
		});
	}, [theme, isDarkModeEnabled]);

	React.useEffect(() => {
		if (!ref.current) {
			return;
		}

		const editorInstance = editor.create(ref.current, {
			language: 'markdown',
			wordWrap: 'on',
			theme: 'myCustomTheme',
			lineNumbers: 'on',
			automaticLayout: true,
			minimap: {
				enabled: false,
			},
		});
		setEditorInstance(editorInstance);
	}, []);

	return (
		<Resizable
			defaultSize={{
				width: '50%',
				height: '100%',
			}}
			className={classNames.container}
			minWidth={100}
			enable={{ right: true }}
		>
			<div className={classNames.editor} ref={ref} />
		</Resizable>
	);
};
