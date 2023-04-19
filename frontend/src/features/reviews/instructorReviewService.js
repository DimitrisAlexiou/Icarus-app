import axiosFetch from '../../utils/axios';
const API_URL = '/api/review/instructor';

const createInstructorReview = async (instructorReviewData) => {
	const response = await axiosFetch.post(API_URL, instructorReviewData);

	return response.data;
};

const getInstructorReviews = async () => {
	const response = await axiosFetch.get(API_URL);

	return response.data;
};

const instructorReviewService = {
	createInstructorReview,
	getInstructorReviews,
};

export default instructorReviewService;
