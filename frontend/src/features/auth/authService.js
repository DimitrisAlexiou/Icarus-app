import axios from 'axios';
import { API_URL_REGISTER, API_URL_LOGIN, headers } from '../../constants/config';
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

const authService = {
	register,
	login,
	logout,
};

export default authService;
