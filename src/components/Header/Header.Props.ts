import { DocumentStatus } from '../../models/DocumentStatus';

export interface HeaderStateProps {
	documentName?: string;
	documentStatus?: DocumentStatus;
}

export type HeaderProps = HeaderStateProps;
