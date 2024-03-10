import axiosFetch from '../../../utils/axios';
import {
	API_URL_ADMIN_GRADES,
	API_URL_GRADE,
} from '../../../constants/apiConfig';

const addGrade = async (data) => {
	const response = await axiosFetch.post(API_URL_GRADE, data);

	return response.data;
};

const updateGrade = async (gradeId, data) => {
	const response = await axiosFetch.put(API_URL_GRADE + '/' + gradeId, data);

	return response.data;
};

const getGrade = async (gradeId) => {
	const response = await axiosFetch.get(API_URL_GRADE + '/' + gradeId);

	return response.data;
};

const deleteGrade = async (gradeId) => {
	const response = await axiosFetch.delete(API_URL_GRADE + '/' + gradeId);

	return response.data;
};

const finalizeGrade = async (gradeId) => {
	const response = await axiosFetch.put(
		API_URL_GRADE + '/' + gradeId + '/finalize'
	);

	return response.data;
};

const finalizeGrades = async (statementId) => {
	const response = await axiosFetch.put(
		API_URL_GRADE + '/' + statementId + '/finalize/all'
	);

	return response.data;
};

const getStatementGrades = async (statementId) => {
	const response = await axiosFetch.get(API_URL_GRADE + '/' + statementId);

	return response.data;
};

const getGrades = async () => {
	const response = await axiosFetch.get(API_URL_ADMIN_GRADES);

	return response.data;
};

const deleteGrades = async () => {
	const response = await axiosFetch.delete(API_URL_ADMIN_GRADES);

	return response.data;
};

const gradeService = {
	addGrade,
	updateGrade,
	getGrade,
	deleteGrade,
	finalizeGrade,
	finalizeGrades,
	getStatementGrades,
	getGrades,
	deleteGrades,
};

export default gradeService;
