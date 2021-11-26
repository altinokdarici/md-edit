import { IFileSystemService, IFile, IDirectory } from '../FileSystemService';
import { msGraphClient } from '../MsGraphService';

// https://docs.microsoft.com/en-us/onedrive/developer/rest-api/concepts/special-folders-appfolder?view=odsp-graph-online

interface ResponseValue<T> {
	value: T[];
}

interface OneDriveFolder {
	name: string;
	id: string;
	folder: {
		childCount: number;
	};
}

interface OneDriveFile {
	'@microsoft.graph.downloadUrl': string;
	id: string;
	name: string;
	file: {
		mimeType: string;
	};
}

function isOneDriveFile(item: OneDriveFile | OneDriveFolder): item is OneDriveFile {
	return !!(item as OneDriveFile).file;
}

const getAbsolutePath = (path?: string) => {
	return path ? `/drive/special/approot:/${path}:` : '/drive/special/approot';
};

const withChildren = (path: string) => {
	return `${path}/children`;
};

export class OneDriveFileSystemService implements IFileSystemService {
	public async renameFile(fileId: string, newName: string): Promise<void> {
		return msGraphClient.api(`/me/drive/items/${fileId}`).patch({
			name: newName,
		});
	}

	public async getDirectories(path?: string): Promise<IDirectory[]> {
		const url = withChildren(getAbsolutePath(path));
		const response: ResponseValue<OneDriveFile | OneDriveFolder> = await msGraphClient.api(url).get();
		return response.value
			.filter((item) => !isOneDriveFile(item))
			.map((item) => {
				return <IDirectory>{
					type: 'Directory',
					name: item.name,
					id: item.id,
				};
			});
	}

	public async createDirectory(name: string, parentPath?: string): Promise<IDirectory> {
		const folderResponse: OneDriveFolder = await msGraphClient.api(withChildren(getAbsolutePath(parentPath))).post({
			name,
			folder: {},
			'@microsoft.graph.conflictBehavior': 'rename',
		});
		return {
			type: 'Directory',
			id: folderResponse.id,
			name: folderResponse.name,
		};
	}

	public deleteDirectory(id?: string): Promise<void> {
		return msGraphClient.api(`/me/drive/items/${id}`).delete();
	}

	public async getFiles(directoryId?: string): Promise<IFile[]> {
		const response: ResponseValue<OneDriveFile> = await msGraphClient
			.api(`/me/drive/items/${directoryId}/children`)
			.get();

		return response.value.map((x) => ({
			type: 'File',
			id: x.id,
			name: x.name,
		}));
	}

	public setFileContent(parentId: string, fileName: string, content: string): Promise<IFile> {
		return msGraphClient.api(`/me/drive/items/${parentId}:/${fileName}.md:/content`).put(content);
	}

	public setFileContentByFileId(fileId: string, content: string): Promise<IFile> {
		return msGraphClient.api(`/me/drive/items/${fileId}/content`).put(content);
	}

	public deleteFile(id: string): Promise<void> {
		return msGraphClient.api(`/me/drive/items/${id}`).delete();
	}

	public async getFileContent(id: string): Promise<string> {
		const response = await msGraphClient.api(`/me/drive/items/${id}`).get();
		const downloadUrl = response['@microsoft.graph.downloadUrl'];

		return fetch(downloadUrl, { method: 'GET' }).then((response) => response.text());
	}
}
