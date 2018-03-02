
import React, { Component } from 'react';
import { remote } from 'electron';
import _ from 'lodash';
import { ROOT_FOLDER } from '../constants';

const { Menu, MenuItem } = remote;

class FileExplorerTree extends Component {
	constructor(props) {
		super(props);

		this.menu = null;
		this.clickedPath = null;
	}

	handleSelectPath(folder) {
		!folder.isFile && this.props.handleSelectPath(`${ROOT_FOLDER}${folder.title}/`);
	}

	renderFolders() {
		return _.map(this.props.treeData, folder => {
			return <a className="collection-item avatar root-item"
								onClick={() => {this.handleSelectPath(folder)}}
								key={folder.title}>
				<i className="material-icons circle light-green darken-2">{folder.isFile ? 'insert_drive_file' : 'folder'}</i>
				{folder.title}</a>
		});
	}

	renderEmptyFolder() {
		return <h2 className="center-align">Folder is empty</h2>;
	}

	renderExplorer() {
		if (this.props.treeData && this.props.treeData.length) {
			return <div className="collection">{this.renderFolders()}</div>
		}

		return <div>{this.renderEmptyFolder()}</div>;
	}


	render() {
		return (
			<div style={{width: 300}}>
				{this.renderExplorer()}
			</div>
		);
	}
}
export default FileExplorerTree;
