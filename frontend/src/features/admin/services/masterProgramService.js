import axiosFetch from '../../../utils/axios';
import { API_URL_ADMIN_MASTER } from '../../../constants/apiConfig';

const defineMaster = async (data) => {
	const response = await axiosFetch.post(API_URL_ADMIN_MASTER, data);

	return response.data;
};

const updateMaster = async (masterId, data) => {
	const response = await axiosFetch.put(
		API_URL_ADMIN_MASTER + '/' + masterId,
		data
	);

	return response.data;
};

const getMaster = async (masterId) => {
	const response = await axiosFetch.get(API_URL_ADMIN_MASTER + '/' + masterId);

	return response.data;
};

const getMasters = async () => {
	const response = await axiosFetch.get(API_URL_ADMIN_MASTER);

	return response.data;
};

const deleteMaster = async (masterId) => {
	const response = await axiosFetch.delete(
		API_URL_ADMIN_MASTER + '/' + masterId
	);

	return response.data;
};

const deleteMasters = async () => {
	const response = await axiosFetch.delete(API_URL_ADMIN_MASTER);

	return response.data;
};

const masterProgramService = {
	defineMaster,
	updateMaster,
	getMaster,
	getMasters,
	deleteMaster,
	deleteMasters,
};

export default masterProgramService;
