import { ImplicitMSALAuthenticationProvider, Client } from '@microsoft/microsoft-graph-client';

import { msalInstance } from '../AuthService';

const authProvider = new ImplicitMSALAuthenticationProvider(msalInstance, {
	scopes: ['openid', 'profile', 'Files.ReadWrite.AppFolder'],
});

const options = {
	authProvider, // An instance created from previous step
};

export const msGraphClient = Client.initWithMiddleware(options);
