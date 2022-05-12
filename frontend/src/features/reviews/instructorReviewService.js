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

const instructorReviewService = {
	createInstructorReview,
};

export default instructorReviewService;
