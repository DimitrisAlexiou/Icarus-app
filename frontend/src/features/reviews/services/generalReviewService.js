import axiosFetch from '../../../utils/axios';
import {
	API_URL_ADMIN_REVIEW_GENERAL,
	API_URL_REVIEW,
	API_URL_USER_ACTIVITY,
} from '../../../constants/apiConfig';

const createGeneralReview = async (data) => {
	const response = await axiosFetch.post(API_URL_REVIEW + '/general', data);

	return response.data;
};

const updateGeneralReview = async (reviewId, data) => {
	const response = await axiosFetch.put(
		API_URL_REVIEW + '/general/' + reviewId,
		data
	);

	return response.data;
};

const getGeneralReview = async (reviewId) => {
	const response = await axiosFetch.get(
		API_URL_REVIEW + '/general/' + reviewId
	);

	return response.data;
};

const deleteGeneralReview = async (reviewId) => {
	const response = await axiosFetch.delete(
		API_URL_REVIEW + '/general/' + reviewId
	);

	return response.data;
};

const getUserGeneralReviews = async () => {
	const response = await axiosFetch.get(
		API_URL_USER_ACTIVITY + '/reviews/general'
	);

	return response.data;
};

const deleteUserGeneralReviews = async () => {
	const response = await axiosFetch.delete(
		API_URL_USER_ACTIVITY + '/reviews/general'
	);

	return response.data;
};

const getGeneralReviews = async () => {
	const response = await axiosFetch.get(API_URL_ADMIN_REVIEW_GENERAL);

	return response.data;
};

const getGeneralReviewsTotalNumber = async () => {
	const response = await axiosFetch.get(
		API_URL_ADMIN_REVIEW_GENERAL + '/total'
	);

	return response.data;
};

const deleteGeneralReviews = async () => {
	const response = await axiosFetch.delete(API_URL_ADMIN_REVIEW_GENERAL);

	return response.data;
};

const generalReviewService = {
	createGeneralReview,
	updateGeneralReview,
	getGeneralReview,
	deleteGeneralReview,
	getUserGeneralReviews,
	deleteUserGeneralReviews,
	getGeneralReviews,
	getGeneralReviewsTotalNumber,
	deleteGeneralReviews,
};

export default generalReviewService;
