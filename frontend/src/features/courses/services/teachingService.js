import axiosFetch from '../../../utils/axios';
import { API_URL_COURSE, API_URL_TEACHING } from '../../../constants/apiConfig';

const updateTeaching = async (teachingId, data) => {
	const response = await axiosFetch.put(API_URL_TEACHING + '/' + teachingId, data);

	return response.data;
};

const getTeaching = async (teachingId) => {
	const response = await axiosFetch.get(API_URL_TEACHING + '/' + teachingId);

	return response.data;
};

const getTeachingByCourseId = async (courseId) => {
	const response = await axiosFetch.get(API_URL_COURSE + '/' + courseId + '/teaching');

	return response.data;
};

const deleteTeaching = async (teachingId) => {
	const response = await axiosFetch.delete(API_URL_TEACHING + '/' + teachingId);

	return response.data;
};

const getTeachings = async () => {
	const response = await axiosFetch.get(API_URL_TEACHING);

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
	const response = await axiosFetch.patch(API_URL_TEACHING + '/' + teachingId + '/assign/lab', {
		labInstructors: data,
	});

	return response.data;
};

const unassignLabInstructors = async (teachingId) => {
	const response = await axiosFetch.patch(API_URL_TEACHING + '/' + teachingId + '/unassign/lab');

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
	deleteTeachings,
	assignTheoryInstructors,
	assignLabInstructors,
	unassignTheoryInstructors,
	unassignLabInstructors,
	assignTheoryGrading,
	assignLabGrading,
	unassignTheoryGrading,
	unassignLabGrading,
};

export default teachingService;
