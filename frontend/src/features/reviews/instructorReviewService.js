import axios from 'axios';

const API_URL = '/api/review/instructor';

// Create Instructor Review
const createInstructorReview = async (instructorReviewData, token) => {
	const config = {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
	};

	const response = await axios.post(API_URL, instructorReviewData, config);

	return response.data;
};

// Get User Instructor Reviews
const getInstructorReviews = async (token) => {
	const config = {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
	};

	const response = await axios.get(API_URL, config);

	return response.data;
};

const instructorReviewService = {
	createInstructorReview,
	getInstructorReviews,
};

export default instructorReviewService;
