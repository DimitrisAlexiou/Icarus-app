import axios from 'axios';
import { BASE_URL } from '../constants/config';
import { getUserFromLocalStorage } from './localStorage';
import { extractErrorMessage } from './errorMessage';

const axiosFetch = axios.create({
	baseURL: BASE_URL,
});

axiosFetch.interceptors.request.use((config) => {
	const user = getUserFromLocalStorage();
	if (user) {
		config.headers['Content-Type'] = 'application/json';
		config.headers['Authorization'] = `Bearer ${user.token}`;
	}
	return config;
});

export const checkForUnauthorizedResponse = (error, thunkAPI) => {
	if (error.response.status === 401) {
		return thunkAPI.rejectWithValue('Unauthorized! Logging Out...');
	}
	return thunkAPI.rejectWithValue(extractErrorMessage(error));
};

export default axiosFetch;
