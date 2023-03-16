import axios from 'axios';
import { API_URL_ADMIN, headers } from '../../constants/config';

const defineDegreeRules = async (data, token) => {
	const config = {
		headers: { headers, Authorization: `Bearer ${token}` },
	};

	const response = await axios.post(API_URL_ADMIN + '/degree_rules', data, config);

	return response.data;
};

const getDegreeRules = async (token) => {
	const config = {
		headers: { headers, Authorization: `Bearer ${token}` },
	};

	const response = await axios.get(API_URL_ADMIN + '/degree_rules', config);

	return response.data;
};

const updateDegreeRules = async (degreeRulesId, data, token) => {
	const config = {
		headers: { headers, Authorization: `Bearer ${token}` },
	};

	const response = await axios.put(API_URL_ADMIN + '/degree_rules' + degreeRulesId, data, config);

	return response.data;
};

const deleteDegreeRules = async (degreeRulesId, token) => {
	const config = {
		headers: { headers, Authorization: `Bearer ${token}` },
	};

	const response = axios.delete(API_URL_ADMIN + '/degree_rules/' + degreeRulesId, config);

	return response.data;
};

const semesterService = {
	defineDegreeRules,
	getDegreeRules,
	updateDegreeRules,
	deleteDegreeRules,
};

export default semesterService;
