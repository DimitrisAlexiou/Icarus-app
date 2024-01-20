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

const updateGeneralReview = async (generalReviewId, data) => {
	const response = await axiosFetch.put(
		API_URL_REVIEW + '/general/' + generalReviewId,
		data
	);

	return response.data;
};

const getGeneralReview = async (generalReviewId) => {
	const response = await axiosFetch.get(
		API_URL_REVIEW + '/general/' + generalReviewId
	);

	return response.data;
};

const deleteGeneralReview = async (generalReviewId) => {
	const response = await axiosFetch.delete(
		API_URL_REVIEW + '/general/' + generalReviewId
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
	deleteGeneralReviews,
};

export default generalReviewService;
