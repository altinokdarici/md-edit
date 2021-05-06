import { AuthAccount } from '../../store/authSlice';

export interface AppDispatchProps {
	updateAccount: (account: AuthAccount) => void;
	fetchDocumentLibrary: () => void;
}

export type AppProps = AppDispatchProps;
