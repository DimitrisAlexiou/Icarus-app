import axios from 'axios';
import { BASE_URL } from '../constants/config';
import {
	getUserFromLocalStorage,
	removeUserFromLocalStorage,
	removeLastPageFromLocalStorage,
} from './localStorage';
import { extractErrorMessage } from './errorMessage';

const axiosFetch = axios.create({
	baseURL: BASE_URL,
});

axiosFetch.interceptors.request.use((config) => {
	const user = getUserFromLocalStorage();
	if (user) {
		config.headers['Content-Type'] = 'application/json';
		config.headers['Authorization'] = `Bearer ${user.token}`;
		// Retrieve the JWT token from the cookie (assuming it's named 'token')
		// const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, '$1');
	}
	return config;
});

export const checkTokenExpiration = (error, thunkAPI) => {
	const status = error.response ? error.response.status : null;

	if (status === 401) {
		removeUserFromLocalStorage();
		window.location.href = '/unauthorized';
		removeLastPageFromLocalStorage();
		return thunkAPI.rejectWithValue(extractErrorMessage(error));
	}
	return thunkAPI.rejectWithValue(extractErrorMessage(error));
};

export const checkForUnauthorizedResponse = (error, thunkAPI) => {
	if (error.response.status === 401) {
		// thunkAPI.dispatch(clearStore());
		return thunkAPI.rejectWithValue('Unauthorized! Logging Out. . .');
	}
	return thunkAPI.rejectWithValue(extractErrorMessage(error));
};

axiosFetch.interceptors.response.use((response) => response, checkTokenExpiration);

export default axiosFetch;
