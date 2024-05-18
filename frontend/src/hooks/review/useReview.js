import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTeachings } from '../../features/courses/teachingSlice';
import { useSemester } from '../../context/SemesterProvider';
import { ReviewType } from '../../constants/enums';

const useReview = ({ reviewType }) => {
	const dispatch = useDispatch();

	const { isSemesterLoading } = useSemester();
	const { user } = useSelector((state) => state.auth);
	const { teachings, isLoading: isTeachingsLoading } = useSelector(
		(state) => state.teachings
	);
	const isLoading = useSelector((state) => {
		switch (reviewType) {
			case ReviewType.General:
				return state.generalReviews.isLoading;
			case ReviewType.Teaching:
				return state.teachingReviews.isLoading;
			case ReviewType.Instructor:
				return state.instructorReviews.isLoading;
			default:
				return false;
		}
	});
	const enrolledCourses = useSelector(
		(state) => state.auth.user.user.student.enrolledCourses
	);

	const [selectedTeaching, setSelectedTeaching] = useState(null);
	const [formIsVisible, setFormIsVisible] = useState(false);
	const [formIsOpen, setFormIsOpen] = useState(false);

	const handleTeachingClick = (teaching) => {
		setSelectedTeaching((prevTeaching) => {
			return prevTeaching === teaching ? null : teaching;
		});
		setFormIsVisible(true);
		setFormIsOpen(true);
	};

	const findTeaching = (enrolledCourse) => {
		return teachings.find((teaching) => teaching._id === enrolledCourse);
	};

	useEffect(() => {
		dispatch(getTeachings());
	}, [dispatch]);

	return {
		user,
		teachings,
		enrolledCourses,
		isTeachingsLoading,
		isSemesterLoading,
		isLoading,
		selectedTeaching,
		setSelectedTeaching,
		formIsOpen,
		setFormIsOpen,
		formIsVisible,
		setFormIsVisible,
		handleTeachingClick,
		findTeaching,
		dispatch,
	};
};

export default useReview;
