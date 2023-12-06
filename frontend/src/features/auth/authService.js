import axios from 'axios';
import axiosFetch from '../../utils/axios';
import {
	API_URL_REGISTER,
	API_URL_LOGIN,
	API_URL_FORGOT_PASSWORD,
	API_URL_USER,
	headers,
} from '../../constants/apiConfig';
import {
	addUserToLocalStorage,
	removeUserFromLocalStorage,
	getLastPageFromLocalStorage,
	removeLastPageFromLocalStorage,
	removeLastAttemptedUsernameFromLocalStorage,
	removeIsAccountLockedFromLocalStorage,
	removeLoginFailedAttemptsFromLocalStorage,
} from '../../utils/localStorage';

const register = async (data) => {
	const config = {
		headers: { headers },
	};

	const response = await axios.post(API_URL_REGISTER, data, config);

	if (response.data) addUserToLocalStorage(response.data);

	return response.data;
};

const login = async (data) => {
	const config = {
		headers: { headers },
	};

	const response = await axios.post(API_URL_LOGIN, data, config);

	if (response.data) {
		addUserToLocalStorage(response.data);
		if (getLastPageFromLocalStorage()) {
			window.location.href = getLastPageFromLocalStorage();
			removeLastPageFromLocalStorage();
		}
	}

	return response.data;
};

const logout = async () => {
	removeUserFromLocalStorage();
	removeLoginFailedAttemptsFromLocalStorage();
	removeIsAccountLockedFromLocalStorage();
	removeLastAttemptedUsernameFromLocalStorage();
};

const forgotPassword = async (data) => {
	const config = {
		headers: { headers },
	};

	const response = await axios.post(API_URL_FORGOT_PASSWORD, data, config);

	// if (response.data) {
	// 	addUserToLocalStorage(response.data));
	// 	if (getLastPageFromLocalStorage()) {
	// 		window.location.href = getLastPageFromLocalStorage();
	// 		removeLastPageFromLocalStorage();
	// 	}
	// }

	return response.data;
};

const changePassword = async (userId, data) => {
	const response = await axios.put(API_URL_USER + '/' + userId, data);

	return response.data;
};

const getProfile = async () => {
	const response = await axiosFetch.get(API_URL_USER);

	return response.data;
};

const updateProfile = async (userId, data) => {
	const response = await axiosFetch.put(API_URL_USER + '/' + userId, data);

	return response.data;
};

// const clearStore = async () => {
// 	try {
// 		thunkAPI.dispatch(resetCalendar());
// 	thunkAPI.dispatch(resetCourses());
// 	thunkAPI.dispatch(resetNotes());
// 	thunkAPI.dispatch(resetInstructorReview());
// 	thunkAPI.dispatch(resetGeneralReview());
// 	thunkAPI.dispatch(resetTeachingReview());
// 	// thunkAPI.dispatch(reset());
// 	// thunkAPI.dispatch(reset());
// 	// thunkAPI.dispatch(reset());
// };

const authService = {
	register,
	login,
	logout,
	forgotPassword,
	changePassword,
	getProfile,
	updateProfile,
};

export default authService;
