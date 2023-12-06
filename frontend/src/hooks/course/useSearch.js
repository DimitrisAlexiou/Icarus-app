import { useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearFilters, handleChange } from '../../features/courses/courseSlice';

const useSearch = () => {
	const dispatch = useDispatch();

	const {
		search,
		isLoading,
		searchSemester,
		searchCycle,
		searchHasLab,
		sort,
		sortOptions,
	} = useSelector((store) => store.courses);

	const [localSearch, setLocalSearch] = useState(search);

	const handleSearch = (e) => {
		dispatch(handleChange({ name: e.target.name, value: e.target.value }));
	};

	const optimizedDebounce = useMemo(() => {
		const debounce = () => {
			let timeoutID;
			return (e) => {
				setLocalSearch(e.target.value);
				clearTimeout(timeoutID);
				timeoutID = setTimeout(() => {
					dispatch(
						handleChange({ name: e.target.name, value: e.target.value })
					);
				}, 1000);
			};
		};
		return debounce();
	}, [dispatch, setLocalSearch]);

	const handleSubmit = (e) => {
		e.preventDefault();
		setLocalSearch('');
		dispatch(clearFilters());
	};

	return {
		search,
		isLoading,
		searchSemester,
		searchCycle,
		searchHasLab,
		sort,
		sortOptions,
		localSearch,
		handleSearch,
		optimizedDebounce,
		handleSubmit,
	};
};

export default useSearch;
