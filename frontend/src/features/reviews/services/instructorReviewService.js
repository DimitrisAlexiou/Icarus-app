import {
	API_URL_ADMIN_REVIEW_INSTRUCTOR,
	API_URL_REVIEW,
	API_URL_USER_ACTIVITY,
} from '../../../constants/apiConfig';
import axiosFetch from '../../../utils/axios';

const createInstructorReview = async (data) => {
	const response = await axiosFetch.post(API_URL_REVIEW + '/instructor', data);

	return response.data;
};

const updateInstructorReview = async (reviewId, data) => {
	const response = await axiosFetch.put(
		API_URL_REVIEW + '/instructor/' + reviewId,
		data
	);

	return response.data;
};

const getInstructorReview = async (reviewId) => {
	const response = await axiosFetch.get(
		API_URL_REVIEW + '/instructor/' + reviewId
	);

	return response.data;
};

const deleteInstructorReview = async (reviewId) => {
	const response = await axiosFetch.delete(
		API_URL_REVIEW + '/instructor/' + reviewId
	);

	return response.data;
};

const getUserInstructorReviews = async () => {
	const response = await axiosFetch.get(
		API_URL_USER_ACTIVITY + '/reviews/instructor'
	);

	return response.data;
};

const deleteUserInstructorReviews = async () => {
	const response = await axiosFetch.delete(
		API_URL_USER_ACTIVITY + '/reviews/instructor'
	);

	return response.data;
};

const getInstructorReviews = async () => {
	const response = await axiosFetch.get(API_URL_ADMIN_REVIEW_INSTRUCTOR);

	return response.data;
};

const getInstructorReviewsTotalNumber = async () => {
	const response = await axiosFetch.get(
		API_URL_ADMIN_REVIEW_INSTRUCTOR + '/total'
	);

	return response.data;
};

const deleteInstructorReviews = async () => {
	const response = await axiosFetch.delete(API_URL_ADMIN_REVIEW_INSTRUCTOR);

	return response.data;
};

const instructorReviewService = {
	createInstructorReview,
	updateInstructorReview,
	getInstructorReview,
	deleteInstructorReview,
	getUserInstructorReviews,
	deleteUserInstructorReviews,
	getInstructorReviews,
	getInstructorReviewsTotalNumber,
	deleteInstructorReviews,
};

export default instructorReviewService;
