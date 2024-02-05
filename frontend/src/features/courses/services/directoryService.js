import axiosFetch from '../../../utils/axios';
import { API_URL_TEACHING } from '../../../constants/apiConfig';

const getDirectories = async (teachingId) => {
	const response = await axiosFetch.get(
		API_URL_TEACHING + '/' + teachingId + '/portfolio/directory'
	);

	return response.data;
};

const createDirectory = async (teachingId, data) => {
	const response = await axiosFetch.post(
		API_URL_TEACHING + '/' + teachingId + '/portfolio/directory',
		data
	);

	return response.data;
};

const deleteDirectories = async (teachingId) => {
	const response = await axiosFetch.delete(
		API_URL_TEACHING + '/' + teachingId + '/portfolio/directory'
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

const directoryService = {
	getDirectory,
	createDirectory,
	deleteDirectory,
	getDirectories,
	updateDirectory,
	deleteDirectories,
};

export default directoryService;
