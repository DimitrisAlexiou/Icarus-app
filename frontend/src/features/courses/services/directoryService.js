import axiosFetch from '../../../utils/axios';
import {
	API_URL_ADMIN_DIRECTORIES,
	API_URL_TEACHING,
} from '../../../constants/apiConfig';

const createDirectory = async (teachingId, data) => {
	const response = await axiosFetch.post(
		API_URL_TEACHING + '/' + teachingId + '/portfolio/directory',
		data
	);

	return response.data;
};

const getDirectory = async (teachingId, directoryId) => {
	const response = await axiosFetch.get(
		API_URL_TEACHING + '/' + teachingId + '/portfolio/directory/' + directoryId
	);

	return response.data;
};

const updateDirectory = async (teachingId, directoryId, data) => {
	const response = await axiosFetch.put(
		API_URL_TEACHING + '/' + teachingId + '/portfolio/directory/' + directoryId,
		data
	);

	return response.data;
};

const deleteDirectory = async (teachingId, directoryId) => {
	const response = await axiosFetch.delete(
		API_URL_TEACHING + '/' + teachingId + '/portfolio/directory/' + directoryId
	);

	return response.data;
};

const getTeachingDirectories = async (teachingId) => {
	const response = await axiosFetch.get(
		API_URL_TEACHING + '/' + teachingId + '/portfolio/directory'
	);

	return response.data;
};

const deleteTeachingDirectories = async (teachingId) => {
	const response = await axiosFetch.delete(
		API_URL_TEACHING + '/' + teachingId + '/portfolio/directory'
	);

	return response.data;
};

const getDirectories = async () => {
	const response = await axiosFetch.get(API_URL_ADMIN_DIRECTORIES);

	return response.data;
};

const deleteDirectories = async () => {
	const response = await axiosFetch.delete(API_URL_ADMIN_DIRECTORIES);

	return response.data;
};

const directoryService = {
	createDirectory,
	getDirectory,
	updateDirectory,
	deleteDirectory,
	getTeachingDirectories,
	deleteTeachingDirectories,
	getDirectories,
	deleteDirectories,
};

export default directoryService;
