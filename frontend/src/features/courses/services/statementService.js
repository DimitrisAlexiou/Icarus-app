import axiosFetch from '../../../utils/axios';
import { API_URL_STATEMENT } from '../../../constants/apiConfig';

const getStudentStatements = async () => {
	const response = await axiosFetch.get(API_URL_STATEMENT);

	return response.data;
};

const getStudentStatementsTotalTeachings = async () => {
	const response = await axiosFetch.get(API_URL_STATEMENT + 's/teachings');

	return response.data;
};

const getStudentCurrentStatement = async () => {
	const response = await axiosFetch.get(API_URL_STATEMENT + '/current');

	return response.data;
};

const createStatement = async (data) => {
	const response = await axiosFetch.post(API_URL_STATEMENT, data);

	return response.data;
};

const updateStatement = async (statementId, data) => {
	const response = await axiosFetch.put(
		API_URL_STATEMENT + '/' + statementId,
		data
	);

	return response.data;
};

const getStatement = async (statementId) => {
	const response = await axiosFetch.get(API_URL_STATEMENT + '/' + statementId);

	return response.data;
};

const deleteStatement = async (statementId) => {
	const response = await axiosFetch.delete(
		API_URL_STATEMENT + '/' + statementId
	);

	return response.data;
};

const finalizeStatement = async (statementId) => {
	const response = await axiosFetch.put(
		API_URL_STATEMENT + '/' + statementId + '/finalize'
	);

	return response.data;
};

const getStatementsInGradingWindow = async () => {
	const response = await axiosFetch.get(API_URL_STATEMENT + 's/grading');

	return response.data;
};

const getStatements = async () => {
	const response = await axiosFetch.get(API_URL_STATEMENT + 's');

	return response.data;
};

const deleteStatements = async () => {
	const response = await axiosFetch.delete(API_URL_STATEMENT + '/delete');

	return response.data;
};

const statementService = {
	getStudentStatements,
	getStudentStatementsTotalTeachings,
	getStudentCurrentStatement,
	createStatement,
	finalizeStatement,
	updateStatement,
	getStatement,
	deleteStatement,
	getStatementsInGradingWindow,
	getStatements,
	deleteStatements,
};

export default statementService;
