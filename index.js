const electron = require('electron');
const promisify = require("es6-promisify");
const fs = require('fs-extra');
const mime = require('mime-types');
const _ = require('lodash');
const diskinfo = require('diskinfo');


// var windef = require('windows-registry').windef;

// var Key = require('windows-registry').Key;
// var key = new Key(windef.HKEY.HKEY_CLASSES_ROOT, '', windef.KEY_ACCESS.KEY_ALL_ACCESS);
// //var key2 = key.openSubKey('.txt', windef.KEY_ACCESS.KEY_ALL_ACCESS);
 
 
// console.log('------txt', key)

// key.close();


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
		height: 800,
		width: 1400,
		webPreferences: {
			backgroundThrottling: false
		}
	});

	mainWindow.loadURL(`file://${__dirname}/src/index.html`);
});
function getFiles(path, type, result){
	const pathWithoutRoot = path.substr(root.length);
	return new Promise(function(resolve, reject){
		fs.readdir(pathWithoutRoot, (err, files) => {
			Promise.all(_.map(files, file => {
				return lstat(`${pathWithoutRoot}${file}`).then(stats => {
					if(type ==='main' || stats.isFile()){
						obj = {
							path,
							title: file,
							isFile: stats.isFile(),
							mimeType: stats.isFile() && mime.lookup(file),
							stats,
						};
						result.push(obj);

						// if (stats.isFile()) {
						// 	// // console.log("------", path + file)
						// 	const filePath = path + file;
						// 	const pathwithoutroot1 = filePath.substr(root.length);

						
						// }


						return;
					}else{
						return getFiles(path + file + '\\', type, result);
					}
				}).catch(function (err) {
					console.error("Unexpected error", err);
				});
			})).then((values) => {
				resolve();
			});
		});
	})
}

ipcMain.on('LEVEL_DATA_REQUEST', (event, path, type)=> {
	const action = type === 'main' ? 'MAIN_LEVEL_DATA_SEND' : 'SELECTED_LEVEL_DATA_SEND';
	if (path === root) {
		mainWindow.webContents.send(action, {files: disks, path});
	} else {
		let result = [];
		getFiles(path, type, result).then(() => {
			mainWindow.webContents.send(action, {files: _.compact(result), path});
		});
	}
});