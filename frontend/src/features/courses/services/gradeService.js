import axiosFetch from '../../../utils/axios';
import {
	API_URL_ADMIN_GRADES,
	API_URL_GRADE,
	API_URL_MYGRADES,
} from '../../../constants/apiConfig';
import { documentDownload } from '../../../utils/documentDownload';

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

const getRecentGrades = async () => {
	const response = await axiosFetch.get(API_URL_GRADE);

	return response.data;
};

const getStudentRecentGrades = async () => {
	const response = await axiosFetch.get(API_URL_GRADE + '/student/recent');

	return response.data;
};

const getStudentOverallGrades = async () => {
	const response = await axiosFetch.get(API_URL_GRADE + '/student/overall');

	return response.data;
};

const getStudentOverallRecentGrades = async () => {
	const response = await axiosFetch.get(
		API_URL_GRADE + '/student/overall/recent'
	);

	return response.data;
};

const getStudentTeachingGrades = async (teachingId) => {
	const response = await axiosFetch.get(
		API_URL_MYGRADES + '/teaching/' + teachingId + '/details'
	);

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

const downloadStudentGradesTranscriptPDF = async () => {
	const response = await axiosFetch.get(API_URL_MYGRADES + '/download-pdf', {
		responseType: 'blob',
	});

	documentDownload(response, 'student_grades_transcript.pdf');

	return response.data;
};

const downloadTeachingGradingTranscriptPDF = async (statementId) => {
	const response = await axiosFetch.get(
		API_URL_GRADE + '/' + statementId + '/download-pdf',
		{
			responseType: 'blob',
		}
	);

	documentDownload(response, 'teaching_grading_transcript.pdf');

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
	getRecentGrades,
	getStudentRecentGrades,
	getStudentOverallGrades,
	getStudentOverallRecentGrades,
	getStudentTeachingGrades,
	getGrades,
	deleteGrades,
	downloadStudentGradesTranscriptPDF,
	downloadTeachingGradingTranscriptPDF,
};

export default gradeService;
