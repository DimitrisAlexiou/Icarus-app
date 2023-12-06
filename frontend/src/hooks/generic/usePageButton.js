import { useDispatch, useSelector } from 'react-redux';
import { changePage } from '../../features/courses/courseSlice';

const usePageButton = () => {
	const dispatch = useDispatch();

	const { numOfPages, page } = useSelector((state) => state.courses);

	const pages = Array.from({ length: numOfPages }, (_, index) => {
		return index + 1;
	});

	const nextPage = () => {
		let newPage = page + 1;
		if (newPage > numOfPages) {
			newPage = 1;
		}
		dispatch(changePage(newPage));
	};

	const prevPage = () => {
		let newPage = page - 1;
		if (newPage < 1) {
			newPage = numOfPages;
		}
		dispatch(changePage(newPage));
	};

	const handleChangePage = (pageNumber) => {
		dispatch(changePage(pageNumber));
	};

	return {
		page,
		pages,
		nextPage,
		prevPage,
		handleChangePage,
	};
};

export default usePageButton;
