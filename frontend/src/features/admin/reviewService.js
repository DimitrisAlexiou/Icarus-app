import axios from 'axios';
import { API_URL_ADMIN, headers } from '../../constants/config';

const defineReview = async (data, token) => {
	const config = {
		headers: { headers, Authorization: `Bearer ${token}` },
	};

	const response = await axios.post(API_URL_ADMIN + '/review', data, config);

	return response.data;
};

const getReview = async (token) => {
	const config = {
		headers: { headers, Authorization: `Bearer ${token}` },
	};

	const response = await axios.get(API_URL_ADMIN + '/review', config);

	return response.data;
};

const deleteReview = async (reviewId, token) => {
	const config = {
		headers: { headers, Authorization: `Bearer ${token}` },
	};

	const response = axios.delete(API_URL_ADMIN + '/review/' + reviewId, config);

	return response.data;
};

const semesterService = {
	defineReview,
	getReview,
	deleteReview,
};

export default semesterService;
