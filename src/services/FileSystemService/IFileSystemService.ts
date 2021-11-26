export interface IFileSystemItem {
	path: string;
	name: string;
}

export interface IFile {
	type: 'File';
	id: string;
	name: string;
}

export interface IDirectory {
	type: 'Directory';
	id: string;
	name: string;
}

export function isDirectory(item: { type: string }): item is IDirectory {
	return item.type === 'Directory';
}

export interface IFileSystemService {
	getDirectories: (path?: string) => Promise<IDirectory[]>;
	createDirectory: (name: string, parentPath?: string) => Promise<IDirectory>;
	deleteDirectory: (id?: string) => Promise<void>;

	getFiles: (directoryId?: string) => Promise<IFile[]>;
	deleteFile: (id: string) => Promise<void>;
	renameFile: (fileId: string, newName: string) => Promise<void>;
	getFileContent: (id: string) => Promise<string>;
	setFileContent: (parentId: string, fileName: string, content: string) => Promise<IFile>;
	setFileContentByFileId: (fileId: string, content: string) => Promise<IFile>;
}
