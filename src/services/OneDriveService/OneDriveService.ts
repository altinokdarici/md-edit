import { msGraphClient } from '../MsGraphService';

// https://docs.microsoft.com/en-us/onedrive/developer/rest-api/concepts/special-folders-appfolder?view=odsp-graph-online

export interface ResponseValue<T> {
	value: T[];
}

export interface Folder {
	name: string;
	id: string;
	folder: {
		childCount: number;
	};
}

export interface File {
	'@microsoft.graph.downloadUrl': string;
	id: string;
	name: string;
}

export const getDriveFilesInFolder = (folderName: string): Promise<ResponseValue<File>> => {
	return msGraphClient.api(`/drive/special/approot:/${folderName}:/children`).get();
};

export const deleteDriveItem = (id: string) => {
	return msGraphClient.api(`/me/drive/items/${id}`).delete();
};

export const getDriveRootFolders = (): Promise<ResponseValue<Folder>> => {
	return msGraphClient.api('/drive/special/approot/children').get();
};

export const updateDriveFile = (fileId: string, content: string) => {
	// eslint-disable-next-line no-console
	console.log('Updating file..');
	return msGraphClient.api(`/me/drive/items/${fileId}/content`).put(content);
};

export const downloadDriveFileContent = async (fileId: string) => {
	const response = await msGraphClient.api(`/me/drive/items/${fileId}`).get();
	const downloadUrl = response['@microsoft.graph.downloadUrl'];

	return fetch(downloadUrl, { method: 'GET' }).then((response) => response.text());
};

export const renameDriveItem = (fileId: string, newName: string) => {
	return msGraphClient.api(`/me/drive/items/${fileId}`).patch({ name: newName });
};

export const createDriveFolder = (name: string): Promise<Folder> => {
	return msGraphClient.api('/drive/special/approot/children').post({
		name,
		folder: {},
		'@microsoft.graph.conflictBehavior': 'rename',
	});
};

export const createDriveFile = (sectionName: string, fileName: string, content: string): Promise<File> => {
	return msGraphClient.api(`/drive/special/approot:/${sectionName}/${fileName}.md:/content`).put(content);
};
