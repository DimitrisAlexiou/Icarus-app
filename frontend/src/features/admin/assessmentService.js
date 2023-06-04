import axiosFetch from '../../utils/axios';
import { API_URL_ADMIN } from '../../constants/config';

const defineAssessment = async (data) => {
	const response = await axiosFetch.post(API_URL_ADMIN + '/assessment', data);

	return response.data;
};

const getAssessment = async () => {
	const response = await axiosFetch.get(API_URL_ADMIN + '/assessment');

	return response.data;
};

const updateAssessment = async (assessmentId, data) => {
	const response = await axiosFetch.put(API_URL_ADMIN + '/assessment/' + assessmentId, data);

	return response.data;
};

const deleteAssessment = async (assessmentId) => {
	const response = axiosFetch.delete(API_URL_ADMIN + '/assessment/' + assessmentId);

	return response.data;
};

const assessmentService = {
	defineAssessment,
	getAssessment,
	updateAssessment,
	deleteAssessment,
};

export default assessmentService;
