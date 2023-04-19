import axiosFetch from '../../utils/axios';
import { API_URL_REVIEW } from '../../constants/config';
const GENERAL = `${API_URL_REVIEW}/general`;
const API_URL = '/api/review/general';

const createGeneralReview = async (data) => {
	const response = await axiosFetch.post(GENERAL, data);

	return response.data;
};

const getGeneralReviews = async () => {
	const response = await axiosFetch.get(API_URL);

	return response.data;
};

const generalReviewService = {
	createGeneralReview,
	getGeneralReviews,
};

export default generalReviewService;
