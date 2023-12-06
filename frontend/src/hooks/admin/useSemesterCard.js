import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
	deleteSemester,
	getSemester,
	getSemesters,
	setEditSemester,
} from '../../features/admin/semesterSlice';
import { academicYearEnd, academicYearStart } from '../../utils/academicYears';
import { SemesterType } from '../../constants/enums';
import { deleteAlert } from '../../constants/sweetAlertNotification';

const useSemesterCard = () => {
	const dispatch = useDispatch();

	const { semester, semesters } = useSelector((state) => state.semesters);

	const isWinterDefined = semesters.some((semester) => {
		const startDate = new Date(semester.startDate);
		const endDate = new Date(semester.endDate);

		const isWinterStart =
			startDate.getMonth() + 1 === 10 && startDate.getDate() === 1;
		const isWinterEnd =
			endDate.getMonth() + 1 === 1 && endDate.getDate() === 31;

		return (
			semester.academicYear === `${academicYearStart}-${academicYearEnd}` &&
			semester.type === SemesterType.Winter &&
			isWinterStart &&
			isWinterEnd
		);
	});

	const isSpringDefined = semesters.some((semester) => {
		const startDate = new Date(semester.startDate);
		const endDate = new Date(semester.endDate);

		const isSpringStart =
			startDate.getMonth() + 1 === 2 && startDate.getDate() === 1;
		const isSpringEnd =
			endDate.getMonth() + 1 === 5 && endDate.getDate() === 31;

		return (
			semester.academicYear === `${academicYearStart}-${academicYearEnd}` &&
			semester.type === SemesterType.Spring &&
			isSpringStart &&
			isSpringEnd
		);
	});

	const isAnySemesterDefined = semesters.some((semester) => {
		return (
			semester.academicYear === `${academicYearStart}-${academicYearEnd}` &&
			semester.type === SemesterType.Any
		);
	});

	const missingSemesters = [];

	if (!isWinterDefined) missingSemesters.push(SemesterType.Winter);

	if (!isSpringDefined) missingSemesters.push(SemesterType.Spring);

	if (!isAnySemesterDefined) missingSemesters.push(SemesterType.Any);

	useEffect(() => {
		dispatch(getSemester());
		dispatch(getSemesters());
	}, [dispatch]);

	const handleDeleteSemester = (semester) => {
		deleteAlert(() => dispatch(deleteSemester(semester._id)));
	};

	return {
		semester,
		semesters,
		setEditSemester,
		missingSemesters,
		handleDeleteSemester,
	};
};

export default useSemesterCard;
