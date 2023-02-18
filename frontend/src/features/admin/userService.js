import axios from 'axios';
import { API_URL_USERS, headers } from '../../constants/config';

// const getUsers = async (token) => {
const getUsers = async () => {
	const config = {
		headers: { headers },
	};

	const response = await axios.get(API_URL_USERS, config);

	return response.data;
};

const addUser = async (userData) => {
	const config = {
		headers: { headers },
	};
	const response = await axios.post(API_URL_USERS + '/add', userData, config);

	return response.data;
};

const updateUser = async (userId, userData, token) => {
	const config = {
		headers: { headers },
	};

	const response = await axios.put(API_URL_USERS + userId + '/edit', userData, config);

	return response.data;
};

const activateUser = async (userId, userData, token) => {
	const config = {
		headers: { headers },
	};

	const response = await axios.put(API_URL_USERS + '/activate/' + userId, userData, config);

	return response.data;
};

const deleteUser = async (userId, token) => {
	const config = {
		headers: { headers },
	};

	return await axios.delete(`${API_URL_USERS}/` + userId, config);
};

const userService = {
	getUsers,
	addUser,
	updateUser,
	activateUser,
	deleteUser,
};

export default userService;
