import axiosFetch from '../../../utils/axios';
import {
	API_URL_ADMIN_TEACHINGS,
	API_URL_COURSE,
	API_URL_TEACHING,
} from '../../../constants/apiConfig';

const updateTeaching = async (teachingId, data) => {
	const response = await axiosFetch.put(
		API_URL_TEACHING + '/' + teachingId,
		data
	);

	return response.data;
};

const getTeaching = async (teachingId) => {
	const response = await axiosFetch.get(API_URL_TEACHING + '/' + teachingId);

	return response.data;
};

const getTeachingByCourseId = async (courseId) => {
	const response = await axiosFetch.get(
		API_URL_COURSE + '/' + courseId + '/teaching'
	);

	return response.data;
};

const deleteTeaching = async (teachingId) => {
	const response = await axiosFetch.delete(API_URL_TEACHING + '/' + teachingId);

	return response.data;
};

const downloadEnrolledStudentsPDF = async (teachingId) => {
	const response = await axiosFetch.get(
		API_URL_TEACHING + '/' + teachingId + '/download-pdf',
		{ responseType: 'blob' }
	);

	// Create a blob URL for the PDF content
	const blob = new Blob([response.data], { type: 'application/pdf' });
	const url = window.URL.createObjectURL(blob);

	// Create a link element and trigger a click to download the file
	const link = document.createElement('a');
	link.href = url;
	link.download = `enrolled_students_${teachingId}.pdf`;
	document.body.appendChild(link);
	link.click();

	// Clean up resources
	window.URL.revokeObjectURL(url);
	document.body.removeChild(link);

	return response.data;
};

const getTeachings = async () => {
	const response = await axiosFetch.get(API_URL_TEACHING);

	return response.data;
};

const getSystemTeachings = async () => {
	const response = await axiosFetch.get(API_URL_ADMIN_TEACHINGS);

	return response.data;
};

const getInstructorTeachings = async () => {
	const response = await axiosFetch.get(API_URL_TEACHING + '/instructor');

	return response.data;
};

const getSemesterActiveTeachings = async () => {
	const response = await axiosFetch.get(API_URL_TEACHING + '/semester');

	return response.data;
};

const deleteTeachings = async () => {
	const response = await axiosFetch.delete(API_URL_TEACHING + '/delete');

	return response.data;
};

const assignTheoryInstructors = async (teachingId, data) => {
	const response = await axiosFetch.patch(
		API_URL_TEACHING + '/' + teachingId + '/assign/theory',
		{
			theoryInstructors: data,
		}
	);

	return response.data;
};

const unassignTheoryInstructors = async (teachingId) => {
	const response = await axiosFetch.patch(
		API_URL_TEACHING + '/' + teachingId + '/unassign/theory'
	);

	return response.data;
};

const assignLabInstructors = async (teachingId, data) => {
	const response = await axiosFetch.patch(
		API_URL_TEACHING + '/' + teachingId + '/assign/lab',
		{
			labInstructors: data,
		}
	);

	return response.data;
};

const unassignLabInstructors = async (teachingId) => {
	const response = await axiosFetch.patch(
		API_URL_TEACHING + '/' + teachingId + '/unassign/lab'
	);

	return response.data;
};

const assignTheoryGrading = async (teachingId, data) => {
	const response = await axiosFetch.patch(
		API_URL_TEACHING + '/' + teachingId + '/assign/theory/grading',
		{
			theoryExamination: data,
		}
	);

	return response.data;
};

const unassignTheoryGrading = async (teachingId) => {
	const response = await axiosFetch.patch(
		API_URL_TEACHING + '/' + teachingId + '/unassign/theory/grading'
	);

	return response.data;
};

const assignLabGrading = async (teachingId, data) => {
	const response = await axiosFetch.patch(
		API_URL_TEACHING + '/' + teachingId + '/assign/lab/grading',
		{
			labExamination: data,
		}
	);

	return response.data;
};

const unassignLabGrading = async (teachingId) => {
	const response = await axiosFetch.patch(
		API_URL_TEACHING + '/' + teachingId + '/unassign/lab/grading'
	);

	return response.data;
};

const teachingService = {
	updateTeaching,
	getTeaching,
	getTeachingByCourseId,
	deleteTeaching,
	getTeachings,
	getSystemTeachings,
	getInstructorTeachings,
	getSemesterActiveTeachings,
	deleteTeachings,
	assignTheoryInstructors,
	assignLabInstructors,
	unassignTheoryInstructors,
	unassignLabInstructors,
	assignTheoryGrading,
	assignLabGrading,
	unassignTheoryGrading,
	unassignLabGrading,
	downloadEnrolledStudentsPDF,
};

export default teachingService;
