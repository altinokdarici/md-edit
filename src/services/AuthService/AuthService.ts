import { UserAgentApplication } from 'msal';

import { loginRequest, msalConfig } from './authConfig';

export const msalInstance = new UserAgentApplication(msalConfig);

export const login = () => {
	msalInstance.loginRedirect(loginRequest);
};

export const logout = () => {
	msalInstance.logout();
};
