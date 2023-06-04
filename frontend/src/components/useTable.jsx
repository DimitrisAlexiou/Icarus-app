import { useState } from 'react';
import { Button } from 'reactstrap';

const useTable = (sortedData, defaultItemsPerPage = 10) => {
	const [currentPage, setCurrentPage] = useState(0);
	const [itemsPerPage, setItemsPerPage] = useState(defaultItemsPerPage);
	const [searchQuery, setSearchQuery] = useState('');

	const handlePageClick = (event) => {
		setCurrentPage(Number(event.target.id));
	};

	const handleItemsPerPageChange = (event) => {
		setItemsPerPage(Number(event.target.value));
		setCurrentPage(0);
	};

	const handleSearchQueryChange = (e) => {
		setSearchQuery(e.target.value);
		setCurrentPage(0);
	};

	const filteredData = sortedData.filter((item) => {
		const matchTitle = item.title.toLowerCase().includes(searchQuery.toLowerCase());
		const matchID = item.courseId.toLowerCase().includes(searchQuery.toLowerCase());
		return matchTitle || matchID;
	});

	const indexOfLastItem = (currentPage + 1) * itemsPerPage;
	const indexOfFirstItem = indexOfLastItem - itemsPerPage;
	const currentData = filteredData.slice(indexOfFirstItem, indexOfLastItem);

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

	return {
		currentData,
		renderPageNumbers,
		renderItemsPerPageOptions,
		handleItemsPerPageChange,
		handleSearchQueryChange,
	};
};

export default useTable;
