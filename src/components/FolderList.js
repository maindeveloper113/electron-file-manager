
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
				filterable: true,
				Cell: ({ row }) => {
					{
						return(
							<div>
								{
									this.state.selectedFolder === row._original ?
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
					defaultFilterMethod={(filter, row) => {
						if (!row[filter.id]) return false;
						return (
							row[filter.id].toLowerCase().indexOf(filter.value.toLowerCase()) !== -1
						);
					}}
					getTrProps={(state, rowInfo, column) => ({
						onClick: (e) => {
							if (this.state.selectedFolder !== rowInfo.row) {
								this.setState({
									selectedFolder: rowInfo.row._original,
								});
								this.props.handleSelectPath(`${ROOT_FOLDER}${rowInfo.row._original.title}/`);
							}
						},
						style: rowInfo && JSON.stringify(this.state.selectedFolder) === JSON.stringify(rowInfo.row._original) ? styles.activeItem : null,
					})}
				/>
			</div>
		);
	}
}
export default FolderList;
