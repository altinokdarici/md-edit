import * as React from 'react';
import { Parser, HtmlRenderer } from 'commonmark';

import { ViewerProps } from './Viewer.Props';
import { useViewerClassNames } from './Viewer.Styles';
import { getEditingService } from '../../services';

export const Viewer = ({ isViewerVisible, documentId }: ViewerProps) => {
	const [content, setContent] = React.useState<string>('');
	const ref = React.useRef<HTMLDivElement | null>(null);

	React.useEffect(() => {
		if (ref.current && documentId) {
			const editingService = getEditingService(documentId);

			editingService.addOnChangeCallback((content) => {
				setContent(content);
			});

			const parser = new Parser({ smart: true });
			const parsed = parser.parse(content);
			const writer = new HtmlRenderer({ softbreak: '<br/>' });

			ref.current.innerHTML = writer.render(parsed);
		}
	}, [documentId, isViewerVisible, setContent, content]);

	const classNames = useViewerClassNames();

	if (!isViewerVisible) {
		return null;
	}

	return (
		<div className={classNames.container}>
			<article id="viewer" ref={ref} className={`${classNames.viewer} markdown-body`} />
		</div>
	);
};
