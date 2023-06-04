import axiosFetch from '../../utils/axios';
import { API_URL_ADMIN } from '../../constants/config';

const defineSemester = async (data) => {
	const response = await axiosFetch.post(API_URL_ADMIN + '/semester', data);

	return response.data;
};

const getSemesters = async () => {
	const response = await axiosFetch.get(API_URL_ADMIN + '/semesters');

	return response.data;
};

const getSemester = async () => {
	const response = await axiosFetch.get(API_URL_ADMIN + '/semester');

	return response.data;
};

const updateSemester = async (semesterId, data) => {
	const response = await axiosFetch.put(API_URL_ADMIN + '/semester/' + semesterId, data);

	return response.data;
};

const deleteSemester = async (semesterId) => {
	const response = await axiosFetch.delete(API_URL_ADMIN + '/semester/' + semesterId);

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
