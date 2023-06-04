import axiosFetch from '../../utils/axios';
import { API_URL_ADMIN } from '../../constants/config';

const defineCycles = async (data) => {
	const response = await axiosFetch.post(API_URL_ADMIN + '/cycles', data);

	return response.data;
};

const updateCycles = async (cyclesId, data) => {
	const response = await axiosFetch.put(API_URL_ADMIN + '/cycles/' + cyclesId, data);

	return response.data;
};

const getCycles = async () => {
	const response = await axiosFetch.get(API_URL_ADMIN + '/cycles');

	return response.data;
};

const deleteCycles = async (cyclesId) => {
	const response = axiosFetch.delete(API_URL_ADMIN + '/cycles/' + cyclesId);

	return response.data;
};

const cyclesService = {
	defineCycles,
	updateCycles,
	getCycles,
	deleteCycles,
};

export default cyclesService;
