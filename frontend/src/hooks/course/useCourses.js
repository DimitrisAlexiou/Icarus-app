import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { debounce } from 'lodash';
import { getCourses, handleChange } from '../../features/courses/courseSlice';
import { useParams } from 'react-router-dom';

const useCourses = () => {
	const dispatch = useDispatch();
	const { masterId } = useParams();

	const {
		courses,
		isLoading,
		totalCourses,
		page,
		numOfPages,
		search,
		searchCycle,
		searchHasLab,
		searchSemester,
		sort,
		sortOptions,
	} = useSelector((state) => state.courses);

	const [Obligatory, setObligatory] = useState(true);

	useEffect(() => {
		dispatch(getCourses({ page, isObligatory: Obligatory, search, masterId }));
	}, [Obligatory, page, search, masterId, dispatch]);

	const debouncedSearch = useRef(
		debounce((value) => {
			dispatch(
				getCourses({ page, isObligatory: Obligatory, search: value, masterId })
			);
		}, 100)
	).current;

	const handleSearch = (e) => {
		dispatch(handleChange({ name: e.target.name, value: e.target.value }));
		debouncedSearch(e.target.value);
	};

	const handleNavigationClick = (isObligatory) => {
		setObligatory(isObligatory);
	};

	useEffect(() => {
		return () => {
			debouncedSearch.cancel();
		};
	}, [debouncedSearch]);

	return {
		courses,
		page,
		numOfPages,
		totalCourses,
		search,
		searchSemester,
		searchCycle,
		searchHasLab,
		sort,
		sortOptions,
		isLoading,
		Obligatory,
		handleSearch,
		handleNavigationClick,
	};
};

export default useCourses;
