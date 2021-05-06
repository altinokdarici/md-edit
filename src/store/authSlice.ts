import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Account } from 'msal';

interface Dictionary<T> {
	[key: string]: T;
}

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
	account?: AuthAccount;
}

const initialState: AuthState = {};

export const authSlice = createSlice({
	initialState,
	name: 'auth',
	reducers: {
		updateAccount: (state: AuthState, { payload }: PayloadAction<Account>) => {
			state.account = payload;
		},
	},
});
