import axios from 'axios';

const API_URL = '/api/review/general';

// Create General Review
const createGeneralReview = async (generalReviewData, token) => {
	const config = {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
	};

	const response = await axios.post(API_URL, generalReviewData, config);

	return response.data;
};

const generalReviewService = {
	createGeneralReview,
};

export default generalReviewService;
