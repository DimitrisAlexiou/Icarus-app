import axios from 'axios';
import { API_URL_REGISTER, API_URL_LOGIN, headers } from '../../constants/config';

const registerUser = async (userData, token) => {
	const config = {
		headers: { headers },
	};
	return await axios.post(API_URL_REGISTER, userData, config);
};

const loginUser = async (userData, token) => {
	const config = {
		headers: { headers },
	};
	return await axios.post(API_URL_LOGIN, userData, config);
};

const userService = {
	registerUser,
	loginUser,
};

export default userService;
