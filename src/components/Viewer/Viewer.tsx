import * as React from 'react';
import { Parser, HtmlRenderer } from 'commonmark';
import { useRecoilState } from 'recoil';

import { useViewerClassNames } from './Viewer.Styles';
import { getEditingService } from '../../services';
import { documentLibraryState, uxState } from '../../state';

export const Viewer = () => {
	const [{ selectedDocumentId }] = useRecoilState(documentLibraryState);
	const [{ isViewerVisible }] = useRecoilState(uxState);

	const [content, setContent] = React.useState<string>('');
	const ref = React.useRef<HTMLDivElement | null>(null);

	React.useEffect(() => {
		if (ref.current && selectedDocumentId) {
			const editingService = getEditingService(selectedDocumentId);

			editingService.addOnChangeCallback((content) => {
				setContent(content);
			});

			const parser = new Parser({ smart: true });
			const parsed = parser.parse(content);
			const writer = new HtmlRenderer({ softbreak: '<br/>' });

			ref.current.innerHTML = writer.render(parsed);
		}
	}, [selectedDocumentId, isViewerVisible, setContent, content]);

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
