/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import React from 'react';
import { useRecoilState } from 'recoil';

import { msalInstance } from '../../services';
import { authState } from '../../state';
import { AppThemeProvider } from '../AppThemeProvider';
import { Layout } from '../Layout';
import { Login } from '../Login';

export const App = () => {
	const [_auth, setAuth] = useRecoilState(authState);

	React.useEffect(() => {
		const account = msalInstance.getAccount();
		if (account) {
			setAuth({
				microsoftAccount: {
					accountIdentifier: account.accountIdentifier,
					environment: account.environment,
					homeAccountIdentifier: account.homeAccountIdentifier,
					idToken: { ...account.idToken },
					idTokenClaims: { ...account.idTokenClaims },
					name: account.name,
					sid: account.sid,
					userName: account.userName,
				},
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return <AppThemeProvider>{_auth.microsoftAccount ? <Layout /> : <Login />}</AppThemeProvider>;
};
