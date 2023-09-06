import axiosFetch from '../../../utils/axios';
import { API_URL_ADMIN_CYCLES } from '../../../constants/apiConfig';

const defineCycle = async (data) => {
	const response = await axiosFetch.post(API_URL_ADMIN_CYCLES, data);

	return response.data;
};

const updateCycle = async (cycleId, data) => {
	const response = await axiosFetch.put(API_URL_ADMIN_CYCLES + '/' + cycleId, data);

	return response.data;
};

const getCycle = async (cycleId) => {
	const response = await axiosFetch.get(API_URL_ADMIN_CYCLES + '/' + cycleId);

	return response.data;
};

const getCycles = async () => {
	const response = await axiosFetch.get(API_URL_ADMIN_CYCLES);

	return response.data;
};

const deleteCycle = async (cycleId) => {
	const response = await axiosFetch.delete(API_URL_ADMIN_CYCLES + '/' + cycleId);

	return response.data;
};

const deleteCycles = async () => {
	const response = await axiosFetch.delete(API_URL_ADMIN_CYCLES);

	return response.data;
};

const cyclesService = {
	defineCycle,
	updateCycle,
	getCycles,
	getCycle,
	deleteCycle,
	deleteCycles,
};

export default cyclesService;
