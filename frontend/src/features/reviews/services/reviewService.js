import axiosFetch from '../../../utils/axios';
import {
	API_URL_ADMIN_REVIEW_GENERAL,
	API_URL_ADMIN_REVIEW_INSTRUCTOR,
	API_URL_ADMIN_REVIEW_TEACHING,
	API_URL_REVIEW,
	API_URL_USER_ACTIVITY,
} from '../../../constants/apiConfig';
import { ReviewType } from '../../../constants/enums';

const createReview = async (type, data) => {
	let url;
	switch (type) {
		case ReviewType.General:
			url = API_URL_REVIEW + '/general';
			break;
		case ReviewType.Instructor:
			url = API_URL_REVIEW + '/instructor';
			break;
		case ReviewType.Teaching:
			url = API_URL_REVIEW + '/teaching';
			break;
		default:
			throw new Error('Invalid review type');
	}

	const response = await axiosFetch.post(url, data);
	return response.data;
};

const updateReview = async (type, reviewId, data) => {
	let url;
	switch (type) {
		case ReviewType.General:
			url = API_URL_REVIEW + '/general/' + reviewId;
			break;
		case ReviewType.Instructor:
			url = API_URL_REVIEW + '/instructor/' + reviewId;
			break;
		case ReviewType.Teaching:
			url = API_URL_REVIEW + '/teaching/' + reviewId;
			break;
		default:
			throw new Error('Invalid review type');
	}

	const response = await axiosFetch.put(url, data);
	return response.data;
};

const getReview = async (type, reviewId) => {
	let url;
	switch (type) {
		case ReviewType.General:
			url = API_URL_REVIEW + '/general/' + reviewId;
			break;
		case ReviewType.Instructor:
			url = API_URL_REVIEW + '/instructor/' + reviewId;
			break;
		case ReviewType.Teaching:
			url = API_URL_REVIEW + '/teaching/' + reviewId;
			break;
		default:
			throw new Error('Invalid review type');
	}

	const response = await axiosFetch.get(url);
	return response.data;
};

const deleteReview = async (type, reviewId) => {
	let url;
	switch (type) {
		case ReviewType.General:
			url = API_URL_REVIEW + '/general/' + reviewId;
			break;
		case ReviewType.Instructor:
			url = API_URL_REVIEW + '/instructor/' + reviewId;
			break;
		case ReviewType.Teaching:
			url = API_URL_REVIEW + '/teaching/' + reviewId;
			break;
		default:
			throw new Error('Invalid review type');
	}

	const response = await axiosFetch.delete(url);
	return response.data;
};

const getUserReviews = async (type) => {
	let url;
	switch (type) {
		case ReviewType.General:
			url = API_URL_USER_ACTIVITY + '/reviews/general';
			break;
		case ReviewType.Instructor:
			url = API_URL_USER_ACTIVITY + '/reviews/instructor';
			break;
		case ReviewType.Teaching:
			url = API_URL_USER_ACTIVITY + '/reviews/teaching';
			break;
		default:
			throw new Error('Invalid review type');
	}

	const response = await axiosFetch.get(url);
	return response.data;
};

const deleteUserReviews = async (type) => {
	let url;
	switch (type) {
		case ReviewType.General:
			url = API_URL_USER_ACTIVITY + '/reviews/general';
			break;
		case ReviewType.Instructor:
			url = API_URL_USER_ACTIVITY + '/reviews/instructor';
			break;
		case ReviewType.Teaching:
			url = API_URL_USER_ACTIVITY + '/reviews/teaching';
			break;
		default:
			throw new Error('Invalid review type');
	}

	const response = await axiosFetch.delete(url);
	return response.data;
};

const getReviews = async (type) => {
	let url;
	switch (type) {
		case ReviewType.General:
			url = API_URL_ADMIN_REVIEW_GENERAL;
			break;
		case ReviewType.Instructor:
			url = API_URL_ADMIN_REVIEW_INSTRUCTOR;
			break;
		case ReviewType.Teaching:
			url = API_URL_ADMIN_REVIEW_TEACHING;
			break;
		default:
			throw new Error('Invalid review type');
	}

	const response = await axiosFetch.get(url);
	return response.data;
};

const deleteReviews = async (type) => {
	let url;
	switch (type) {
		case ReviewType.General:
			url = API_URL_ADMIN_REVIEW_GENERAL;
			break;
		case ReviewType.Instructor:
			url = API_URL_ADMIN_REVIEW_INSTRUCTOR;
			break;
		case ReviewType.Teaching:
			url = API_URL_ADMIN_REVIEW_TEACHING;
			break;
		default:
			throw new Error('Invalid review type');
	}

	const response = await axiosFetch.delete(url);
	return response.data;
};

const reviewService = {
	createReview,
	updateReview,
	getReview,
	deleteReview,
	getUserReviews,
	deleteUserReviews,
	getReviews,
	deleteReviews,
};

export default reviewService;
