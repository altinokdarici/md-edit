import { AppDocument, Section, WithId } from '../../models';
import {
	getDriveFilesInFolder,
	getDriveRootFolders,
	File,
	Folder,
	deleteDriveItem,
	downloadDriveFileContent,
	renameDriveItem,
	createDriveFolder,
	createDriveFile,
} from '../OneDriveService';

export const getSections = async (): Promise<WithId<Section>[]> => {
	const folders = await getDriveRootFolders();

	const convertFolderToSection = (folder: Folder): WithId<Section> => {
		const section: WithId<Section> = {
			documentIds: [],
			name: folder.name,
			id: folder.id,
		};

		return section;
	};

	return folders.value.map(convertFolderToSection);
};

const convertFileToDocument = (sectionId: string) => (file: File): WithId<AppDocument> => {
	return {
		id: file.id,
		downloadUrl: file['@microsoft.graph.downloadUrl'],
		fileName: file.name,
		name: file.name.replace('.md', ''),
		sectionId,
	};
};

export const getDocumentsInSection = async (section: WithId<Section>): Promise<WithId<AppDocument>[]> => {
	const files = await getDriveFilesInFolder(section.name);
	console.log({ files });
	return files.value.filter((x) => x.name.indexOf('.md') > 0).map(convertFileToDocument(section.id));
};

export const deleteDocumentLibraryItem = (itemId: string) => {
	return deleteDriveItem(itemId);
};

export const downloadDocumentContent = downloadDriveFileContent;

export const renameDocumentLibraryItem = renameDriveItem;

export const createDocumentLibrarySection = async (name: string): Promise<WithId<Section>> => {
	const folder = await createDriveFolder(name);
	const section: WithId<Section> = {
		documentIds: [],
		id: folder.id,
		name: folder.name,
	};
	return section;
};

export const createDocumentInLibrary = async (
	sectionName: string,
	fileName: string,
	content: string,
): Promise<WithId<Omit<AppDocument, 'sectionId'>>> => {
	const file = await createDriveFile(sectionName, fileName, content);

	return {
		downloadUrl: file['@microsoft.graph.downloadUrl'],
		fileName: file.name,
		id: file.id,
		name: file.name.replace('.md', ''),
	};
};
