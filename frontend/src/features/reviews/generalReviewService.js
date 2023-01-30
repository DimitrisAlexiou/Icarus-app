import axios from 'axios';
import { API_URL_REVIEW, headers } from '../../constants/config';
const GENERAL = `${API_URL_REVIEW}/general`;
const API_URL = '/api/review/general';

// Create General Review
// const createGeneralReview = async (data, token) => {
const createGeneralReview = async (data) => {
	const config = {
		headers: {
			headers,
		},
	};

	const response = await axios.post(GENERAL, data, config);

	return response.data;
};

// Get User General Reviews
const getGeneralReviews = async (token) => {
	const config = {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
	};

	const response = await axios.get(API_URL, config);

	return response.data;
};

const generalReviewService = {
	createGeneralReview,
	getGeneralReviews,
};

export default generalReviewService;
