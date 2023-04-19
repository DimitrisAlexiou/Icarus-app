import axiosFetch from '../../utils/axios';
import { API_URL_USERS } from '../../constants/config';

const getUsers = async () => {
	const response = await axiosFetch.get(API_URL_USERS);

	return response.data;
};

const getStudents = async () => {
	const response = await axiosFetch.get(API_URL_USERS + '/students');

	return response.data;
};

const getInstructors = async () => {
	const response = await axiosFetch.get(API_URL_USERS + '/instructors');

	return response.data;
};

const addUser = async (data) => {
	const response = await axiosFetch.post(API_URL_USERS + '/add', data);

	return response.data;
};

const updateUser = async (userId, data) => {
	const response = await axiosFetch.put(API_URL_USERS + '/' + userId + '/edit', data);

	return response.data;
};

const activateUser = async (userId, data) => {
	const response = await axiosFetch.put(API_URL_USERS + '/' + userId + '/activate', data);

	return response.data;
};

const deleteUser = async (userId) => {
	const response = axiosFetch.delete(API_URL_USERS + '/' + userId);

	return response.data;
};

const deleteUsers = async () => {
	const response = axiosFetch.delete(API_URL_USERS + '/delete_all');

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
