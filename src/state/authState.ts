import { atom, selector } from 'recoil';
import { getInitials, getRTL } from '@fluentui/react';

import { Dictionary } from '../models';

export interface AuthAccount {
	accountIdentifier: string;
	homeAccountIdentifier: string;
	userName: string;
	name: string;
	idToken: Dictionary<string>;
	idTokenClaims: Dictionary<string>;
	sid: string;
	environment: string;
}
export interface AuthState {
	microsoftAccount?: AuthAccount;
}

const defaultState: AuthState = {};

export const authState = atom<AuthState>({
	key: 'authState',
	default: defaultState,
});

export const authStateInitials = selector({
	key: 'authStateInitials',
	get: ({ get }) => {
		const auth = get(authState);

		return auth.microsoftAccount?.name ? getInitials(auth.microsoftAccount?.name, getRTL()) : '';
	},
});
