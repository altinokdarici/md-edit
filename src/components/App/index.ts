import { connect } from 'react-redux';

import { actions } from '../../store';
import { App as AppInternal } from './App';
import { AppDispatchProps } from './App.Props';

const mapDispatchToProps: AppDispatchProps = {
	updateAccount: actions.auth.updateAccount,
	fetchDocumentLibrary: actions.documentLibrary.fetchDocumentLibrary,
};

export const App = connect(undefined, mapDispatchToProps)(AppInternal);
