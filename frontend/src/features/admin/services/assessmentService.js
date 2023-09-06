import axiosFetch from '../../../utils/axios';
import { API_URL_ADMIN_ASSESSMENT } from '../../../constants/apiConfig';

const defineAssessment = async (data) => {
	const response = await axiosFetch.post(API_URL_ADMIN_ASSESSMENT, data);

	return response.data;
};

const getAssessment = async () => {
	const response = await axiosFetch.get(API_URL_ADMIN_ASSESSMENT);

	return response.data;
};

const updateAssessment = async (assessmentId, data) => {
	const response = await axiosFetch.put(API_URL_ADMIN_ASSESSMENT + '/' + assessmentId, data);

	return response.data;
};

const deleteAssessment = async (assessmentId) => {
	const response = await axiosFetch.delete(API_URL_ADMIN_ASSESSMENT + '/' + assessmentId);

	return response.data;
};

const assessmentService = {
	defineAssessment,
	getAssessment,
	updateAssessment,
	deleteAssessment,
};

export default assessmentService;
