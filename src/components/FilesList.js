
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
				accessor: 'title',
				filterable: true,
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
					defaultFilterMethod={(filter, row) => {
						if (!row[filter.id]) return false;
						return (
							row[filter.id].toLowerCase().indexOf(filter.value.toLowerCase()) !== -1
						);
					}}
				/>
			</div>
		);
	}
}
export default FilesList;
