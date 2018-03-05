import React, { Component } from 'react';
import _ from 'lodash';
import { FormControl } from 'react-bootstrap';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { ROOT_FOLDER } from '../constants';

import FolderList from './FolderList';
import FileList from './FilesList';
import FilesList from './FilesList';
import DateSelect from './DateSelect';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
const moment = require('moment');
import {amber600, blueGrey500, grey700} from 'material-ui/styles/colors';

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: blueGrey500,
    accent1Color: amber600,
    textColor: grey700,
  },
  flatButton:{
    primaryTextColor:amber600,
    secondaryTextColor:blueGrey500,
  },
});

class Main extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedPath: '',
			folderFilter: '',
			fileFilter: '',
			createdDateFilter: null,
			modifiedDateFilter: null,
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

	handleFolderFilterChange(e) {
		this.setState({
			folderFilter: e.target.value,
			selectedPath: '',
		});
	}

	handleFileFilterChange(e) {
		this.setState({
			fileFilter: e.target.value,
		});
	}

	selectCratedDate(value1, value2) {
		let startDate;
		let endDate = moment(new Date()).format();
		let createdDateFilter;
		switch(value1) {
			case 'Past hour':
				startDate = moment(new Date()).subtract(1, 'hour').format();
				break;
			case 'Past 24 hours':
				startDate = moment(new Date()).hour(0).minute(0).second(0).subtract(1, 'day').format();
				break;
			case 'Past week':
				startDate = moment(new Date()).hour(0).minute(0).second(0).subtract(1, 'week').format();
				break;
			case 'Past month':
				startDate = moment(new Date()).hour(0).minute(0).second(0).subtract(1, 'month').format();
				break;
			case 'Past year':
				startDate = moment(new Date()).hour(0).minute(0).second(0).subtract(1, 'year').format();
				break;
		}
		if (value1 && value2) {
			startDate = moment(value1).format();
			endDate = moment(value2).format();
		}

		if (value1 === 'Any time') {
			createdDateFilter = null;
		}
		else {
			createdDateFilter = {
				startDate, 
				endDate,
			};
		}
		this.setState({ createdDateFilter });
	} 

	selectModifiedDate(value1, value2) {
		let startDate;
		let endDate = moment(new Date()).format();
		let modifiedDateFilter;
		switch(value1) {
			case 'Past hour':
				startDate = moment(new Date()).subtract(1, 'hour').format();
				break;
			case 'Past 24 hours':
				startDate = moment(new Date()).hour(0).minute(0).second(0).subtract(1, 'day').format();
				break;
			case 'Past week':
				startDate = moment(new Date()).hour(0).minute(0).second(0).subtract(1, 'week').format();
				break;
			case 'Past month':
				startDate = moment(new Date()).hour(0).minute(0).second(0).subtract(1, 'month').format();
				break;
			case 'Past year':
				startDate = moment(new Date()).hour(0).minute(0).second(0).subtract(1, 'year').format();
				break;
		}
		if (value1 && value2) {
			startDate = moment(value1).format();
			endDate = moment(value2).format();
		}

		if (value1 === 'Any time') {
			modifiedDateFilter = null;
		}
		else {
			modifiedDateFilter = {
				startDate, 
				endDate,
			};
		}
		this.setState({ modifiedDateFilter });
	}

	render() {
		let { selectedFolderData  } = this.props;
		const { selectedPath, folderFilter, fileFilter, createdDateFilter, modifiedDateFilter } = this.state;
		let files;
		if (selectedFolderData && selectedPath) {
			files = selectedFolderData[selectedPath];
		}
		else {
			files = [];
		}

		let showingFolders = [];
		if (this.props.mainFolderData.folders) {
			let folders = this.props.mainFolderData.folders.slice();
			if (folderFilter.length > 0) {
				showingFolders = folders.filter(folder => 
					folder.title.toLowerCase().indexOf(folderFilter.toLowerCase()) > -1
				);
			}
			else {
				showingFolders = folders;
			}
		}

		let nameFilteredFiles = [];
		if (fileFilter.length > 0) {
			nameFilteredFiles = files && files.filter(file => file.title.toLowerCase().indexOf(fileFilter.toLowerCase()) > -1)
		}
		else {
			nameFilteredFiles = files;
		}

		let createdDateFilteredFiles = [];
		if (createdDateFilter) {
			createdDateFilteredFiles = nameFilteredFiles && nameFilteredFiles.filter(file => 
				file.stats.birthtime >= createdDateFilter.startDate && file.stats.birthtime <= createdDateFilter.endDate
			);
		}
		else {
			createdDateFilteredFiles = nameFilteredFiles;
		}

		let modifiedDateFilteredFiles = [];
		if (modifiedDateFilter) {
			modifiedDateFilteredFiles = createdDateFilteredFiles && createdDateFilteredFiles.filter(file => 
				file.stats.mtime >= modifiedDateFilter.startDate && file.stats.mtime <= modifiedDateFilter.endDate
			);
		}
		else {
			modifiedDateFilteredFiles = createdDateFilteredFiles;
		}

		return (
			<MuiThemeProvider muiTheme={muiTheme}>
				<div className="file-explorer">
					<h2>SIMS Offline Sync</h2>
					<div className="row" style={{marginTop: 20, marginBottom: 30}}>
						<div className="col-md-2">
							<DateSelect
								style={{minWidth: 150}}
								title={'Date created'}
								handleSelectDate={this.selectCratedDate.bind(this)}
							/>
						</div>
						<div className="col-md-2">
							<DateSelect
								style={{minWidth: 150}}
								title={'Date modified'}
								handleSelectDate={this.selectModifiedDate.bind(this)}
							/>
						</div>
					</div>
					<div className="row"> 
						<div className="col-md-3">
							<FormControl
								type="text"
								value={folderFilter}
								placeholder="Filter by name"
								onChange={this.handleFolderFilterChange.bind(this)}
							/>
							<div style={{marginTop: 5}}>
								<FolderList
									handleSelectPath={this.handleSelectPath}
									treeData={showingFolders}
									selectedPath={selectedPath.substr(ROOT_FOLDER.length)}
								/>
							</div>
						</div>
						<div className="col-md-9">
							<FormControl
								type="text"
								value={fileFilter}
								placeholder="Filter by name"
								onChange={this.handleFileFilterChange.bind(this)}
							/>
							<div style={{marginTop: 5}}>
								<FilesList
									files={modifiedDateFilteredFiles}
								/>
							</div>
						</div>
					</div>
				</div>
			</MuiThemeProvider>
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
