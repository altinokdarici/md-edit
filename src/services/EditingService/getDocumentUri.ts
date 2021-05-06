// eslint-disable-next-line import/no-unresolved
import { Uri } from 'monaco-editor';

export const getDocumentUri = (documentId: string) => Uri.parse(`document://${documentId}`);
