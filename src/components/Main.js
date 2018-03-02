import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { ROOT_FOLDER } from '../constants';

import FileExplorerTree from './FileExplorerTree';
import FileList from './FilesList';
import FilesList from './FilesList';

class Main extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedPath: null,
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
		this.setState({
			selectedPath,
		});
	}

	render() {
		let { selectedFolderData } = this.props;
		const { selectedPath } = this.state;
		let files;
		if (selectedFolderData && selectedPath) {
			files = selectedFolderData[selectedPath];
		}
		else {
			files = [];
		}

		return (
			<div className="file-explorer">
				<div className="row"> 
					<div className="col-md-3">
						<FileExplorerTree
							handleSelectPath={this.handleSelectPath}
							treeData={this.props.mainFolderData.folders} 
						/>
					</div>
					<div className="col-md-9">
						<FilesList
							files={files}
						/>
					</div>
				</div>
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

export default connect(mapStateToProps, actions)(Main);
