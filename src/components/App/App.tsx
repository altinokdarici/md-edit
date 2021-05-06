import React from 'react';

import { msalInstance } from '../../services';
import { AppThemeProvider } from '../AppThemeProvider';
import { Layout } from '../Layout';
import { Login } from '../Login';
import { AppProps } from './App.Props';

export const App = ({ updateAccount, fetchDocumentLibrary }: AppProps) => {
	const account = msalInstance.getAccount();
	if (account) {
		fetchDocumentLibrary();

		updateAccount({
			accountIdentifier: account.accountIdentifier,
			environment: account.environment,
			homeAccountIdentifier: account.homeAccountIdentifier,
			idToken: { ...account.idToken },
			idTokenClaims: { ...account.idTokenClaims },
			name: account.name,
			sid: account.sid,
			userName: account.userName,
		});
	}

	return <AppThemeProvider>{account ? <Layout /> : <Login />}</AppThemeProvider>;
};
