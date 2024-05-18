import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	deleteTeachingReview,
	deleteUserTeachingReviews,
	getTeachingReviews,
	getUserTeachingReviews,
	setEditTeachingReview,
} from '../../features/reviews/teachingReviewSlice';
import {
	deleteGeneralReview,
	deleteUserGeneralReviews,
	getGeneralReviews,
	getUserGeneralReviews,
	setEditGeneralReview,
} from '../../features/reviews/generalReviewSlice';
import {
	deleteInstructorReview,
	deleteUserInstructorReviews,
	getInstructorReviews,
	getUserInstructorReviews,
	setEditInstructorReview,
} from '../../features/reviews/instructorReviewSlice';
import { deleteAlert } from '../../constants/sweetAlertNotification';
import { ReviewType } from '../../constants/enums';

const useUserReviews = () => {
	const dispatch = useDispatch();

	const { user } = useSelector((state) => state.auth);
	const {
		teachingReviews,
		isLoading: isTeachingReviewLoading,
		isEditingTeachingReview,
		editTeachingReviewId,
	} = useSelector((state) => state.teachingReviews);
	const {
		generalReviews,
		isLoading: isGeneralReviewLoading,
		isEditingGeneralReview,
		editGeneralReviewId,
	} = useSelector((state) => state.generalReviews);
	const {
		instructorReviews,
		isLoading: isInstructorReviewLoading,
		isEditingInstructorReview,
		editInstructorReviewId,
	} = useSelector((state) => state.instructorReviews);

	const modalRef = useRef(null);
	const [modal, setModal] = useState(false);

	const handleDeleteReviews = useCallback(
		(reviewType) => {
			switch (reviewType) {
				case ReviewType.Teaching:
					deleteAlert(() => dispatch(deleteUserTeachingReviews()));
					break;
				case ReviewType.General:
					deleteAlert(() => dispatch(deleteUserGeneralReviews()));
					break;
				case ReviewType.Instructor:
					deleteAlert(() => dispatch(deleteUserInstructorReviews()));
					break;
				default:
					break;
			}
		},
		[dispatch]
	);

	const handleDeleteReview = useCallback(
		(reviewType, review) => {
			console.log(review);
			switch (reviewType) {
				case ReviewType.Teaching:
					deleteAlert(() => dispatch(deleteTeachingReview(review)));
					break;
				case ReviewType.General:
					deleteAlert(() => dispatch(deleteGeneralReview(review)));
					break;
				case ReviewType.Instructor:
					deleteAlert(() => dispatch(deleteInstructorReview(review)));
					break;
				default:
					break;
			}
		},
		[dispatch]
	);

	useEffect(() => {
		if (user.user.isAdmin) {
			dispatch(getTeachingReviews());
			dispatch(getGeneralReviews());
			dispatch(getInstructorReviews());
		} else {
			dispatch(getUserTeachingReviews());
			dispatch(getUserGeneralReviews());
			dispatch(getUserInstructorReviews());
		}
	}, [dispatch, user]);

	return useMemo(
		() => ({
			modalRef,
			modal,
			setModal,
			teachingReviews,
			generalReviews,
			instructorReviews,
			isTeachingReviewLoading,
			isGeneralReviewLoading,
			isInstructorReviewLoading,
			isEditingTeachingReview,
			isEditingGeneralReview,
			isEditingInstructorReview,
			editTeachingReviewId,
			editGeneralReviewId,
			editInstructorReviewId,
			setEditTeachingReview,
			setEditGeneralReview,
			setEditInstructorReview,
			handleDeleteReview,
			handleDeleteReviews,
			dispatch,
		}),
		[
			modal,
			teachingReviews,
			generalReviews,
			instructorReviews,
			isTeachingReviewLoading,
			isGeneralReviewLoading,
			isInstructorReviewLoading,
			isEditingTeachingReview,
			isEditingGeneralReview,
			isEditingInstructorReview,
			editTeachingReviewId,
			editGeneralReviewId,
			editInstructorReviewId,
			handleDeleteReview,
			handleDeleteReviews,
			dispatch,
		]
	);
};

export default useUserReviews;
