// polyfill
import 'reflect-metadata';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { initializeIcons } from '@fluentui/react';
import { container } from 'tsyringe';
import './index.css';

import { App } from './components/App';
import reportWebVitals from './reportWebVitals';
import { initStore, actions } from './store';
import { OneDriveFileSystemService, setEditingContext } from './services';
import { DocumentStatus } from './models';

initializeIcons();

container.register('IFileSystemService', {
	useClass: OneDriveFileSystemService,
});

const store = initStore();

setEditingContext({
	editingServices: {},
	actions: {
		updateDocumentStatus: (documentId: string, status: DocumentStatus) =>
			store.dispatch(actions.documentLibrary.updateDocumentStatus({ documentId, status })),
	},
});

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>,
	document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
