import axiosFetch from '../../../utils/axios';
import {
	API_URL_ADMIN_REVIEW_TEACHING,
	API_URL_REVIEW,
	API_URL_USER_ACTIVITY,
} from '../../../constants/apiConfig';

const createTeachingReview = async (data) => {
	const response = await axiosFetch.post(API_URL_REVIEW + '/teaching', data);

	return response.data;
};

const updateTeachingReview = async (reviewId, data) => {
	const response = await axiosFetch.put(
		API_URL_REVIEW + '/teaching/' + reviewId,
		data
	);

	return response.data;
};

const getTeachingReview = async (reviewId) => {
	const response = await axiosFetch.get(
		API_URL_REVIEW + '/teaching/' + reviewId
	);

	return response.data;
};

const deleteTeachingReview = async (reviewId) => {
	const response = await axiosFetch.delete(
		API_URL_REVIEW + '/teaching/' + reviewId
	);

	return response.data;
};

const getUserTeachingReviews = async () => {
	const response = await axiosFetch.get(
		API_URL_USER_ACTIVITY + '/reviews/teaching'
	);

	return response.data;
};

const deleteUserTeachingReviews = async () => {
	const response = await axiosFetch.delete(
		API_URL_USER_ACTIVITY + '/reviews/teaching'
	);

	return response.data;
};

const getTeachingReviews = async () => {
	const response = await axiosFetch.get(API_URL_ADMIN_REVIEW_TEACHING);

	return response.data;
};

const getTeachingReviewsTotalNumber = async () => {
	const response = await axiosFetch.get(
		API_URL_ADMIN_REVIEW_TEACHING + '/total'
	);

	return response.data;
};

const deleteTeachingReviews = async () => {
	const response = await axiosFetch.delete(API_URL_ADMIN_REVIEW_TEACHING);

	return response.data;
};

const teachingReviewService = {
	createTeachingReview,
	updateTeachingReview,
	getTeachingReview,
	deleteTeachingReview,
	getUserTeachingReviews,
	deleteUserTeachingReviews,
	getTeachingReviews,
	getTeachingReviewsTotalNumber,
	deleteTeachingReviews,
};

export default teachingReviewService;
