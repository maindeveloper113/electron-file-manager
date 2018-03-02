const electron = require('electron');
const promisify = require("es6-promisify");
const fs = require('fs-extra');
const mime = require('mime-types');
const _ = require('lodash');
const diskinfo = require('diskinfo');

const { app, BrowserWindow, ipcMain } = electron;
const lstat = promisify(fs.lstat);
const root = 'root/';
let mainWindow, disks;

diskinfo.getDrives((err, drives) => {
	disks = _.map(drives, drive => {
		return {
			title: `${drive.mounted}`,
			isFile: false
		}
	});
});

app.on('ready', () => {

	mainWindow = new BrowserWindow({
		height: 600,
		width: 800,
		webPreferences: {
			backgroundThrottling: false
		}
	});

	mainWindow.loadURL(`file://${__dirname}/src/index.html`);
});

ipcMain.on('LEVEL_DATA_REQUEST', (event, path, type)=> {
	const action = type === 'main' ? 'MAIN_LEVEL_DATA_SEND' : 'SELECTED_LEVEL_DATA_SEND';
	if (path === root) {
		mainWindow.webContents.send(action, {files: disks, path});
	} else {
		const pathWithoutRoot = path.substr(root.length);
		fs.readdir(pathWithoutRoot, (err, files) => {
			Promise.all(_.map(files, file => {
				return lstat(`${pathWithoutRoot}${file}`).then(stats => {
					return {
						path,
						title: file,
						isFile: stats.isFile(),
						mimeType: stats.isFile() && mime.lookup(file),
						stats,
					}
				}).catch(function (err) {
					console.error("Unexpected error", err);
				});
			})).then((values) => {
				mainWindow.webContents.send(action, {files: _.compact(values), path});
			});
		});
	}
});