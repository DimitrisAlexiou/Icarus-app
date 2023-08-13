import axiosFetch from '../../utils/axios';
import { API_URL_REVIEW } from '../../constants/apiConfig';
const API_URL = '/api/review/general';

const createGeneralReview = async (data) => {
	const response = await axiosFetch.post(API_URL_REVIEW + '/general', data);

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
