import axiosFetch from '../../utils/axios';
import { API_URL_ADMIN } from '../../constants/config';

const defineDegreeRules = async (data) => {
	const response = await axiosFetch.post(API_URL_ADMIN + '/degree_rules', data);

	return response.data;
};

const getDegreeRules = async () => {
	const response = await axiosFetch.get(API_URL_ADMIN + '/degree_rules');

	return response.data;
};

const updateDegreeRules = async (degreeRulesId, data) => {
	const response = await axiosFetch.put(API_URL_ADMIN + '/degree_rules/' + degreeRulesId, data);

	return response.data;
};

const deleteDegreeRules = async (degreeRulesId) => {
	const response = axiosFetch.delete(API_URL_ADMIN + '/degree_rules/' + degreeRulesId);

	return response.data;
};

const degreeRulesService = {
	defineDegreeRules,
	getDegreeRules,
	updateDegreeRules,
	deleteDegreeRules,
};

export default degreeRulesService;
