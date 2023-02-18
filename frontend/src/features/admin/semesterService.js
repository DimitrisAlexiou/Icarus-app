import axios from 'axios';
import { API_URL_ADMIN, headers } from '../../constants/config';

const defineSemester = async (values) => {
	const config = {
		headers: { headers },
	};
	const response = await axios.post(API_URL_ADMIN + '/semester', values, config);
	return response.data;
};

const getSemester = async () => {
	const config = {
		headers: { headers },
	};
	const response = await axios.get(API_URL_ADMIN + '/semester', config);
	return response.data;
};

const deleteSemester = async (semesterId, token) => {
	const config = {
		headers: { headers },
	};

	return await axios.delete(API_URL_ADMIN + '/semester' + semesterId, config);
};

const semesterService = {
	defineSemester,
	getSemester,
	deleteSemester,
};

export default semesterService;
