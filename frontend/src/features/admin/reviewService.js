import axiosFetch from '../../utils/axios';
import { API_URL_ADMIN } from '../../constants/config';

const defineReview = async (data) => {
	const response = await axiosFetch.post(API_URL_ADMIN + '/review', data);

	return response.data;
};

const getReview = async () => {
	const response = await axiosFetch.get(API_URL_ADMIN + '/review');

	return response.data;
};

const updateReview = async (reviewId, data) => {
	const response = await axiosFetch.put(API_URL_ADMIN + '/review/' + reviewId, data);

	return response.data;
};

const deleteReview = async (reviewId) => {
	const response = axiosFetch.delete(API_URL_ADMIN + '/review/' + reviewId);

	return response.data;
};

const reviewService = {
	defineReview,
	getReview,
	updateReview,
	deleteReview,
};

export default reviewService;
