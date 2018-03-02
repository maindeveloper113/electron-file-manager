import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { ROOT_FOLDER } from '../constants';

import FileExplorerTree from '../components/FileExplorerTree';

class FileExplorer extends Component {
	constructor(props) {
		super(props);
		

		this.state = {
			
		};
		this.handleSelectPath = this.handleSelectPath.bind(this);
	}

	componentDidMount() {
		this.props.mainLevelDataListenerOn();
		this.props.selectedLevelDataListenerOn();
		this.props.mainLevelDataRequest(ROOT_FOLDER);
	}

	handleSelectPath(selectedPath) {
		this.props.selectedLevelDataRequest(selectedPath);
	}

	render() {
		console.log('-----', this.props.selectedFolderData)
		return (
			<div className="file-explorer">
				<FileExplorerTree
					handleSelectPath={this.handleSelectPath}
					treeData={this.props.mainFolderData.folders} />
			</div>
		);
	}
}

function mapStateToProps({mainFolderData, selectedFolderData}) {
	return {
		mainFolderData,
		selectedFolderData,
	};
}

export default connect(mapStateToProps, actions)(FileExplorer);
