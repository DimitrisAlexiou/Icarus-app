import axios from 'axios';

const API_URL = '/api/review/teaching';

// Create Teaching Review
const createTeachingReview = async (teachingReviewData, teachingId, token) => {
	const config = {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
	};

	const response = await axios.post(API_URL, teachingReviewData, teachingId, config);

	return response.data;
};

// Get User Teaching Reviews
const getUserTeachingReviews = async (token) => {
	const config = {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
	};

	const response = await axios.get(API_URL, config);

	return response.data;
};

// Get all Teaching Reviews
const getTeachingReviews = async (token) => {
	const config = {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
	};

	const response = await axios.get(API_URL, config);

	return response.data;
};

const teachingReviewService = {
	createTeachingReview,
	getUserTeachingReviews,
	getTeachingReviews,
};

export default teachingReviewService;
