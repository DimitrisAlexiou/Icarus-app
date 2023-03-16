import axios from 'axios';
import { API_URL_ADMIN, headers } from '../../constants/config';

const defineCycles = async (data, token) => {
	const config = {
		headers: { headers, Authorization: `Bearer ${token}` },
	};
	const response = await axios.post(API_URL_ADMIN + '/cycles', data, config);

	return response.data;
};

const updateCycles = async (data, token) => {
	const config = {
		headers: { headers, Authorization: `Bearer ${token}` },
	};
	const response = await axios.put(API_URL_ADMIN + '/cycles', data, config);

	return response.data;
};

const getCycles = async (token) => {
	const config = {
		headers: { headers, Authorization: `Bearer ${token}` },
	};
	const response = await axios.get(API_URL_ADMIN + '/cycles', config);

	return response.data;
};

const deleteCycles = async (token) => {
	const config = {
		headers: { headers, Authorization: `Bearer ${token}` },
	};

	const response = axios.delete(API_URL_ADMIN + '/cycles', config);

	return response.data;
};

const cyclesService = {
	defineCycles,
	updateCycles,
	getCycles,
	deleteCycles,
};

export default cyclesService;
