import { ipcRenderer } from 'electron';
import {
	SELECTED_LEVEL_DATA_REQUEST,
	SELECTED_LEVEL_DATA_RECEIVED,
	MAIN_LEVEL_DATA_REQUEST,
	MAIN_LEVEL_DATA_RECEIVED,
} from "./types";

export const mainLevelDataListenerOn = () => dispatch => {
	ipcRenderer.on('MAIN_LEVEL_DATA_SEND', (event, {files, path}) => {
		dispatch({
			type: MAIN_LEVEL_DATA_RECEIVED,
			payload: files
		});
	});
};

export const mainLevelDataRequest = path => dispatch => {
	ipcRenderer.send('LEVEL_DATA_REQUEST', path, 'main');
};

export const selectedLevelDataListenerOn = () => dispatch => {
	ipcRenderer.on('SELECTED_LEVEL_DATA_SEND', (event, {files, path}) => {
		dispatch({
			type: SELECTED_LEVEL_DATA_RECEIVED,
			path,
			payload: files
		});
	});
};

export const selectedLevelDataRequest = path => dispatch => {
	ipcRenderer.send('LEVEL_DATA_REQUEST', path, 'select');
};