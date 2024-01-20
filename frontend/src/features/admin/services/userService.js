import axiosFetch from '../../../utils/axios';
import { API_URL_USERS } from '../../../constants/apiConfig';

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
	const response = await axiosFetch.post(API_URL_USERS, data);

	return response.data;
};

const updateUser = async (userId, data) => {
	const response = await axiosFetch.put(API_URL_USERS + '/' + userId, data);

	return response.data;
};

const activateUser = async (userId) => {
	const response = await axiosFetch.patch(
		API_URL_USERS + '/' + userId + '/activate'
	);

	return response.data;
};

const deactivateUser = async (userId) => {
	const response = await axiosFetch.patch(
		API_URL_USERS + '/' + userId + '/deactivate'
	);

	return response.data;
};

const deleteUser = async (userId) => {
	const response = await axiosFetch.delete(API_URL_USERS + '/' + userId);

	return response.data;
};

const deleteUsers = async () => {
	const response = await axiosFetch.delete(API_URL_USERS + '/delete_all');

	return response.data;
};

const userService = {
	getUsers,
	getStudents,
	getInstructors,
	addUser,
	updateUser,
	activateUser,
	deactivateUser,
	deleteUser,
	deleteUsers,
};

export default userService;
