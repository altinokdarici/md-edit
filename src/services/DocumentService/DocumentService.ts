import { container } from 'tsyringe';

import { AppDocument, Dictionary, Section, WithId } from '../../models';
import { IDirectory, IFile, IFileSystemService, isDirectory } from '../FileSystemService';

const getFileSystemService = () => container.resolve<IFileSystemService>('IFileSystemService');

export const getSections = async (): Promise<WithId<Section>[]> => {
	const folders = await getFileSystemService().getDirectories();

	const convertFolderToSection = (folder: IDirectory | IFile): WithId<Section> => {
		const section: WithId<Section> = {
			documentIds: [],
			name: folder.name,
			id: folder.id,
		};

		return section;
	};

	return folders.filter(isDirectory).map(convertFolderToSection);
};

const convertFileToDocument = (sectionId: string) => (file: IFile): WithId<AppDocument> => {
	return {
		id: file.id,
		name: file.name.replace('.md', ''),
		sectionId,
	};
};

export const getDocumentsInSection = async (section: WithId<Section>): Promise<WithId<AppDocument>[]> => {
	const files = await getFileSystemService().getFiles(section.id);

	return files.filter((x) => x.name.indexOf('.md') > 0).map(convertFileToDocument(section.id));
};

export const deleteDocumentLibraryItem = (itemId: string) => {
	return getFileSystemService().deleteFile(itemId);
};

export const downloadDocumentContent = (fileId: string) => {
	return getFileSystemService().getFileContent(fileId);
};

export const renameDocumentLibraryItem = (fileId: string, newName: string) => {
	return getFileSystemService().renameFile(fileId, newName);
};

export const createDocumentLibrarySection = async (name: string): Promise<WithId<Section>> => {
	const folder = await getFileSystemService().createDirectory(name);
	const section: WithId<Section> = {
		documentIds: [],
		id: folder.id,
		name: folder.name,
	};
	return section;
};

export const createDocumentInLibrary = async (
	sectionId: string,
	fileName: string,
	content: string,
): Promise<WithId<Omit<AppDocument, 'sectionId'>>> => {
	const file = await getFileSystemService().setFileContent(sectionId, fileName, content);

	return {
		id: file.id,
		name: file.name.replace('.md', ''),
	};
};

interface FetchDocumentLibraryResult {
	directories: IDirectory[];
	filesByDirectoryId: Dictionary<IFile[]>;
}

export const fetchDocumentLibrary = async (): Promise<FetchDocumentLibraryResult> => {
	const fileSystemService = getFileSystemService();
	const directories = await fileSystemService.getDirectories();

	const result: FetchDocumentLibraryResult = {
		directories,
		filesByDirectoryId: {},
	};

	// eslint-disable-next-line no-restricted-syntax
	for await (const directory of directories) {
		result.filesByDirectoryId[directory.id] = await fileSystemService.getFiles(directory.id);
	}

	return result;
};
