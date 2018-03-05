
import React, { Component } from 'react';
import _ from 'lodash';
import { ROOT_FOLDER } from '../constants';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

const styles = {
	activeItem: {
		backgroundColor: '#cfcfcf',
	}
};

class FolderList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedFolder: null,
		};
		this.menu = null;
		this.clickedPath = null;
	}

	render() {
		const columns=[
			{
				Header: 'Folder Name',
				accessor: 'title',
				Cell: ({ row }) => {
					{
						return(
							<div>
								{
									this.props.selectedPath === row._original.title + "/" ?
									<img src="https://png.icons8.com/color/50/000000/opened-folder.png" style={{width: 30}}/> :
									<img src="https://png.icons8.com/color/50/000000/folder-invoices.png" style={{width: 30}}/>
								}
								<span style={{marginLeft: 8}}>
									{row.title}
								</span>
							</div>
						)
					}
				}
			}
		];
		
		return (
			<div>
				<ReactTable
					columns={columns}
					data={this.props.treeData}
					getTrProps={(state, rowInfo, column) => ({
						onClick: (e) => {
							if (this.state.selectedFolder !== rowInfo.row) {
								this.setState({
									selectedFolder: rowInfo.row._original,
								});
								this.props.handleSelectPath(`${ROOT_FOLDER}${rowInfo.row._original.title}/`);
							}
						},
						style: rowInfo && this.props.selectedPath && this.props.selectedPath === rowInfo.row._original.title + "/" ? styles.activeItem : null,
					})}
				/>
			</div>
		);
	}
}
export default FolderList;
