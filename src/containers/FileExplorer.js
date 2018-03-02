import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { ROOT_FOLDER } from '../constants';

import FileExplorerTree from '../components/FileExplorerTree';

class FileExplorer extends Component {
	constructor(props) {
		super(props);
		this.updateCurrentPath = this.updateCurrentPath.bind(this);

		this.state = {
			currentPath: ROOT_FOLDER
		};
	}

	componentDidMount() {
		this.props.mainLevelDataListenerOn();
		this.props.selectedLevelDataListenerOn();
		this.props.mainLevelDataRequest(this.state.currentPath);
	}

	updateCurrentPath(newPath) {
		this.setState({
			currentPath: newPath
		});
		this.props.selectedLevelDataRequest(newPath);
	}

	render() {
		return (
			<div className="file-explorer">
				<FileExplorerTree
					updateCurrentPath={this.updateCurrentPath}
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
