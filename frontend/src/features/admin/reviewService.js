import axiosFetch from '../../utils/axios';
import { API_URL_ADMIN_REVIEW } from '../../constants/apiConfig';

const defineReview = async (data) => {
	const response = await axiosFetch.post(API_URL_ADMIN_REVIEW, data);

	return response.data;
};

const getReview = async () => {
	const response = await axiosFetch.get(API_URL_ADMIN_REVIEW);

	return response.data;
};

const updateReview = async (reviewId, data) => {
	const response = await axiosFetch.put(API_URL_ADMIN_REVIEW + '/' + reviewId, data);

	return response.data;
};

const deleteReview = async (reviewId) => {
	const response = axiosFetch.delete(API_URL_ADMIN_REVIEW + '/' + reviewId);

	return response.data;
};

const reviewService = {
	defineReview,
	getReview,
	updateReview,
	deleteReview,
};

export default reviewService;
