import axios from 'axios';

const API_URL = '/api/review/teaching';

// Create Teaching Review
const createTeachingReview = async (teachingReviewData, token) => {
	const config = {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
	};

	const response = await axios.post(API_URL, teachingReviewData, config);

	return response.data;
};

const teachingReviewService = {
	createTeachingReview,
};

export default teachingReviewService;
