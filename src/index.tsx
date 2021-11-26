// polyfill
import 'reflect-metadata';

import React from 'react';
import ReactDOM from 'react-dom';
import { initializeIcons } from '@fluentui/react';
import { container } from 'tsyringe';
import { RecoilRoot, useRecoilSnapshot } from 'recoil';

import './index.css';

import { App } from './components/App';
import reportWebVitals from './reportWebVitals';
import { OneDriveFileSystemService } from './services';

initializeIcons();

container.register('IFileSystemService', {
	useClass: OneDriveFileSystemService,
});

function DebugObserver() {
	const snapshot = useRecoilSnapshot();
	React.useEffect(() => {
		console.debug('The following atoms were modified:');
		// eslint-disable-next-line no-restricted-syntax
		for (const node of snapshot.getNodes_UNSTABLE({ isModified: true })) {
			console.debug(node.key, snapshot.getLoadable(node));
		}
	}, [snapshot]);

	return null;
}

ReactDOM.render(
	<RecoilRoot>
		<DebugObserver />
		<App />
	</RecoilRoot>,
	document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
