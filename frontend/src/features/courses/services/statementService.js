import axiosFetch from '../../../utils/axios';
import { API_URL_STATEMENT } from '../../../constants/apiConfig';

const getStudentStatements = async () => {
	const response = await axiosFetch.get(API_URL_STATEMENT);

	return response.data;
};

const createStatement = async (data) => {
	const response = await axiosFetch.post(API_URL_STATEMENT, data);

	return response.data;
};

const updateStatement = async (statementId, data) => {
	const response = await axiosFetch.put(API_URL_STATEMENT + '/' + statementId, data);

	return response.data;
};

const getStatement = async (statementId) => {
	const response = await axiosFetch.get(API_URL_STATEMENT + '/' + statementId);

	return response.data;
};

const deleteStatement = async (statementId) => {
	const response = await axiosFetch.delete(API_URL_STATEMENT + '/' + statementId);

	return response.data;
};

// const getStatements = async () => {
// 	const response = await axiosFetch.get(API_URL_STATEMENT);

// 	return response.data;
// };

const deleteStatements = async () => {
	const response = await axiosFetch.delete(API_URL_STATEMENT + '/delete');

	return response.data;
};

const statementService = {
	getStudentStatements,
	createStatement,
	updateStatement,
	getStatement,
	deleteStatement,
	// getStatements,
	deleteStatements,
};

export default statementService;
