import { useState } from 'react';
import { Table, Input, Button, Row, Col } from 'reactstrap';

export default function DataTable({ data, config, searchMessage, sortColumns, onRowClick }) {
	const [searchQuery, setSearchQuery] = useState('');
	const [sortColumn, setSortColumn] = useState('');
	const [sortOrder, setSortOrder] = useState('asc');
	const [currentPage, setCurrentPage] = useState(0);
	const [itemsPerPage, setItemsPerPage] = useState(10);

	const handleRowClick = (itemId) => {
		if (onRowClick) onRowClick(itemId);
	};

	const handlePageClick = (event) => {
		setCurrentPage(Number(event.target.id));
	};

	const handleItemsPerPageChange = (event) => {
		setItemsPerPage(Number(event.target.value));
		setCurrentPage(0);
	};

	const handleSearchQueryChange = (e) => {
		setSearchQuery(e.target.value);
	};

	const handleSort = (column) => {
		if (sortColumns.includes(column)) {
			if (sortColumn === column) {
				setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
			} else {
				setSortColumn(column);
				setSortOrder('asc');
			}
		}
	};

	const filteredData = data.filter((item) => {
		const searchData = searchQuery.toLowerCase();
		return config.some((column) => {
			const columnValue = item[column.name]?.toString()?.toLowerCase() || '';
			return columnValue.includes(searchData);
		});
	});

	const sortedData = [...filteredData].sort((a, b) => {
		const valueA = a[sortColumn] ? a[sortColumn].toString() : '';
		const valueB = b[sortColumn] ? b[sortColumn].toString() : '';
		if (sortOrder === 'asc') return valueA.localeCompare(valueB);
		return valueB.localeCompare(valueA);
	});

	const indexOfLastItem = (currentPage + 1) * itemsPerPage;
	const indexOfFirstItem = indexOfLastItem - itemsPerPage;
	const currentItems = sortedData.slice(indexOfFirstItem, indexOfLastItem);

	const pageNumbers = [];
	for (let i = 0; i < Math.ceil(filteredData.length / itemsPerPage); i++) {
		pageNumbers.push(i);
	}

	const renderPageNumbers = pageNumbers.map((number) => {
		return (
			<Button
				className="text-gray-500"
				key={number}
				id={number}
				color="null"
				onClick={handlePageClick}
			>
				{number + 1}
			</Button>
		);
	});

	const itemsPerPageOptions = [10, 25, 50, 100];
	const renderItemsPerPageOptions = itemsPerPageOptions.map((option) => {
		return (
			<option key={option} value={option}>
				{option}
			</option>
		);
	});

	const renderColumns = config.map((column, index) => {
		return (
			<th key={index} onClick={() => handleSort(column.name)}>
				{column.label}
			</th>
		);
	});

	const renderDataRows = currentItems.map((item, index) => {
		return (
			<tr key={index} onClick={() => handleRowClick(item)}>
				{config.map((column, colIndex) => (
					<td key={colIndex}>{column.render(item)}</td>
				))}
			</tr>
		);
	});

	return (
		<>
			<Row>
				<Col>
					<Input
						type="text"
						placeholder={`Search ${searchMessage} . . .`}
						value={searchQuery}
						onChange={handleSearchQueryChange}
					/>
				</Col>
				<Col xs="3" sm="2" md="2" lg="2" xl="1" className="d-flex justify-content-end">
					<select
						value={itemsPerPage}
						onChange={handleItemsPerPageChange}
						className="form-control"
					>
						{renderItemsPerPageOptions}
					</select>
				</Col>
			</Row>

			{currentItems.length > 0 ? (
				<Table className="mt-3" responsive hover>
					<thead>
						<tr>{renderColumns}</tr>
					</thead>
					<tbody>{renderDataRows}</tbody>
				</Table>
			) : (
				<span className="mt-4 mb-4 text-gray-500 font-weight-bold">
					There are no entries for your current search
				</span>
			)}
			<Row>
				<Col sm="6" xs="6" md="6">
					<span className="text-gray-500">
						Showing {indexOfFirstItem + 1} to{' '}
						{Math.min(indexOfLastItem, filteredData.length)} of {filteredData.length}{' '}
						entries
					</span>
				</Col>
				<Col className="d-flex justify-content-end">
					<span id="page-numbers">{renderPageNumbers}</span>
				</Col>
			</Row>
		</>
	);
}
