import axios from 'axios';
import { API_URL_REGISTER, API_URL_LOGIN, API_URL_USER, headers } from '../../constants/config';
import { removeUserFromLocalStorage } from '../../utils/redux/localStorage';

const register = async (data) => {
	const config = {
		headers: { headers },
	};

	const response = await axios.post(API_URL_REGISTER, data, config);

	if (response.data) {
		localStorage.setItem('user', JSON.stringify(response.data));
	}

	return response.data;
};

const login = async (data) => {
	const config = {
		headers: { headers },
	};

	const response = await axios.post(API_URL_LOGIN, data, config);

	if (response.data) {
		localStorage.setItem('user', JSON.stringify(response.data));
	}

	return response.data;
};

const logout = async () => removeUserFromLocalStorage();

const getProfile = async (_, token) => {
	const config = {
		headers: { headers, Authorization: `Bearer ${token}` },
	};

	const response = await axios.get(API_URL_USER, config);

	return response.data;
};

const updateProfile = async (userId, data, token) => {
	const config = {
		headers: { headers, Authorization: `Bearer ${token}` },
	};

	const response = await axios.put(API_URL_USER + '/' + userId, data, config);

	return response.data;
};

const authService = {
	register,
	login,
	logout,
	getProfile,
	updateProfile,
};

export default authService;
