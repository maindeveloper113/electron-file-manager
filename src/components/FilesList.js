
import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

class FilesList extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const columns=[
			{
				Header: 'Name',
				accessor: 'title'
			},
			{
				Header: 'Date Modified',
				accessor: 'stats.mtime'
			},
			{
				Header: 'Date Created',
				accessor: 'stats.birthtime'
			},
			{
				Header: 'size',
				accessor: 'stats.size'
			},
		];

		return (
			<div >
				<ReactTable
					columns={columns}
					data={this.props.files}
				/>
				
			</div>
		);
	}
}
export default FilesList;
