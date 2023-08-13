import axiosFetch from '../../utils/axios';
import { API_URL_COURSE, API_URL_MYCOURSES } from '../../constants/apiConfig';

const createCourse = async (data) => {
	const response = await axiosFetch.post(API_URL_COURSE + '/new', data);

	return response.data;
};

const updateCourse = async (courseId, data) => {
	const response = await axiosFetch.put(API_URL_COURSE + '/' + courseId, data);

	return response.data;
};

const getCourse = async (courseId) => {
	const response = await axiosFetch.get(API_URL_COURSE + '/' + courseId);

	return response.data;
};

const deleteCourse = async (courseId) => {
	const response = await axiosFetch.delete(API_URL_COURSE + '/' + courseId);

	return response.data;
};

const activateCourse = async (courseId) => {
	const response = await axiosFetch.put(API_URL_COURSE + '/' + courseId + '/activate');

	return response.data;
};

const deActivateCourse = async (courseId) => {
	const response = await axiosFetch.put(API_URL_COURSE + '/' + courseId + '/deactivate');

	return response.data;
};

const getCourses = async (url) => {
	const response = await axiosFetch.get(API_URL_COURSE + '/' + url);

	return response.data;
};

const deleteCourses = async () => {
	const response = await axiosFetch.delete(API_URL_COURSE + '/delete');

	return response.data;
};

const enrollCourse = async (courseId) => {
	const response = await axiosFetch.put(API_URL_MYCOURSES + '/' + courseId + '/enroll');

	return response.data;
};

const unenrollCourse = async (courseId) => {
	const response = await axiosFetch.put(API_URL_MYCOURSES + '/' + courseId + '/unenroll');

	return response.data;
};

const courseService = {
	createCourse,
	updateCourse,
	getCourse,
	deleteCourse,
	activateCourse,
	deActivateCourse,
	getCourses,
	deleteCourses,
	enrollCourse,
	unenrollCourse,
};

export default courseService;
