import axiosFetch from '../../utils/axios';
const API_URL = '/api/review/teaching';

const createTeachingReview = async (teachingReviewData, teachingId) => {
	const response = await axiosFetch.post(API_URL, teachingReviewData, teachingId);

	return response.data;
};

const getUserTeachingReviews = async () => {
	const response = await axiosFetch.get(API_URL);

	return response.data;
};

const getTeachingReviews = async () => {
	const response = await axiosFetch.get(API_URL);

	return response.data;
};

const teachingReviewService = {
	createTeachingReview,
	getUserTeachingReviews,
	getTeachingReviews,
};

export default teachingReviewService;
