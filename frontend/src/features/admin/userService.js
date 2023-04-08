import axios from 'axios';
import { API_URL_USERS, headers } from '../../constants/config';

const getUsers = async (token) => {
	const config = {
		headers: { headers, Authorization: `Bearer ${token}` },
	};

	const response = await axios.get(API_URL_USERS, config);

	return response.data;
};

const getStudents = async (token) => {
	const config = {
		headers: { headers, Authorization: `Bearer ${token}` },
	};

	const response = await axios.get(API_URL_USERS + '/students', config);

	return response.data;
};

const getInstructors = async (token) => {
	const config = {
		headers: { headers, Authorization: `Bearer ${token}` },
	};

	const response = await axios.get(API_URL_USERS + '/instructors', config);

	return response.data;
};

const addUser = async (data, token) => {
	const config = {
		headers: { headers, Authorization: `Bearer ${token}` },
	};

	const response = await axios.post(API_URL_USERS + '/add', data, config);

	return response.data;
};

const updateUser = async (userId, data, token) => {
	const config = {
		headers: { headers, Authorization: `Bearer ${token}` },
	};

	const response = await axios.put(API_URL_USERS + '/' + userId + '/edit', data, config);

	return response.data;
};

const activateUser = async (userId, data, token) => {
	const config = {
		headers: { headers, Authorization: `Bearer ${token}` },
	};

	const response = await axios.put(API_URL_USERS + '/' + userId + '/activate', data, config);

	return response.data;
};

const deleteUser = async (userId, token) => {
	const config = {
		headers: { headers, Authorization: `Bearer ${token}` },
	};

	const response = axios.delete(API_URL_USERS + '/' + userId, config);

	return response.data;
};

const deleteUsers = async (token) => {
	const config = {
		headers: { headers, Authorization: `Bearer ${token}` },
	};

	const response = axios.delete(API_URL_USERS + '/delete_all', config);

	return response.data;
};

const userService = {
	getUsers,
	getStudents,
	getInstructors,
	addUser,
	updateUser,
	activateUser,
	deleteUser,
	deleteUsers,
};

export default userService;
