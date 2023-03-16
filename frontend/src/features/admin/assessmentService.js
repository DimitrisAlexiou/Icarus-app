import axios from 'axios';
import { API_URL_ADMIN, headers } from '../../constants/config';

const defineAssessment = async (data, token) => {
	const config = {
		headers: { headers, Authorization: `Bearer ${token}` },
	};

	const response = await axios.post(API_URL_ADMIN + '/assessment', data, config);

	return response.data;
};

const getAssessment = async (token) => {
	const config = {
		headers: { headers, Authorization: `Bearer ${token}` },
	};

	const response = await axios.get(API_URL_ADMIN + '/assessment', config);

	return response.data;
};

const deleteAssessment = async (assessmentId, token) => {
	const config = {
		headers: { headers, Authorization: `Bearer ${token}` },
	};

	const response = axios.delete(API_URL_ADMIN + '/assessment/' + assessmentId, config);

	return response.data;
};

const semesterService = {
	defineAssessment,
	getAssessment,
	deleteAssessment,
};

export default semesterService;
