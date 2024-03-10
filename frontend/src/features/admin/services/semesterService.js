import axiosFetch from '../../../utils/axios';
import {
	API_URL_ADMIN,
	API_URL_ADMIN_SEMESTER,
} from '../../../constants/apiConfig';

const defineSemester = async (data) => {
	const response = await axiosFetch.post(API_URL_ADMIN_SEMESTER, data);

	return response.data;
};

const getSemesters = async () => {
	const response = await axiosFetch.get(API_URL_ADMIN + '/semesters');

	return response.data;
};

const getSemester = async () => {
	const response = await axiosFetch.get(API_URL_ADMIN_SEMESTER);

	return response.data;
};

const getPreviousSemester = async () => {
	const response = await axiosFetch.get(API_URL_ADMIN_SEMESTER + '/previous');

	return response.data;
};

const updateSemester = async (semesterId, data) => {
	const response = await axiosFetch.put(
		API_URL_ADMIN_SEMESTER + '/' + semesterId,
		data
	);

	return response.data;
};

const deleteSemester = async (semesterId) => {
	const response = await axiosFetch.delete(
		API_URL_ADMIN_SEMESTER + '/' + semesterId
	);

	return response.data;
};

const semesterService = {
	defineSemester,
	getSemesters,
	getSemester,
	getPreviousSemester,
	updateSemester,
	deleteSemester,
};

export default semesterService;
