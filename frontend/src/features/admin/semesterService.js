import axios from 'axios';
import { API_URL_ADMIN, headers } from '../../constants/config';

const defineSemester = async (data, token) => {
	const config = {
		headers: { headers, Authorization: `Bearer ${token}` },
	};

	const response = await axios.post(API_URL_ADMIN + '/semester', data, config);

	return response.data;
};

const getSemesters = async (token) => {
	const config = {
		headers: { headers, Authorization: `Bearer ${token}` },
	};

	const response = await axios.get(API_URL_ADMIN + '/semesters', config);

	return response.data;
};

const getSemester = async (token) => {
	const config = {
		headers: { headers, Authorization: `Bearer ${token}` },
	};

	const response = await axios.get(API_URL_ADMIN + '/semester', config);

	return response.data;
};

const updateSemester = async (semesterId, data, token) => {
	const config = {
		headers: { headers, Authorization: `Bearer ${token}` },
	};

	const response = await axios.put(API_URL_ADMIN + '/semester' + semesterId, data, config);

	return response.data;
};

const deleteSemester = async (semesterId, token) => {
	const config = {
		headers: { headers, Authorization: `Bearer ${token}` },
	};

	const response = await axios.delete(API_URL_ADMIN + '/semester/' + semesterId, config);

	return response.data;
};

const semesterService = {
	defineSemester,
	getSemesters,
	getSemester,
	updateSemester,
	deleteSemester,
};

export default semesterService;
