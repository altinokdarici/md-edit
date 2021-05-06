// Config object to be passed to Msal on creation.
// For a full list of msal.js configuration parameters,

import { Configuration } from 'msal';

// visit https://azuread.github.io/microsoft-authentication-library-for-js/docs/msal/modules/_authenticationparameters_.html
export const msalConfig: Configuration = {
	auth: {
		clientId: 'd41662df-abe8-47b0-b346-542359a04a11',
		authority: 'https://login.microsoftonline.com/common/',
		redirectUri: process.env.NODE_ENV !== 'production' ? 'http://localhost:3000/' : 'https://www.mdedit.io/',
	},
	cache: {
		cacheLocation: 'sessionStorage', // This configures where your cache will be stored
		storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
	},
};

// Add here the scopes to request when obtaining an access token for MS Graph API
// for more, visit https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-core/docs/scopes.md
export const loginRequest = {
	scopes: ['openid', 'profile', 'Files.ReadWrite.AppFolder'],
};
