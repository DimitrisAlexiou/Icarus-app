import axiosFetch from '../../utils/axios';
import { API_URL_COURSE } from '../../constants/config';
const TEACHING = `${API_URL_COURSE}/:courseId/teaching`;

const createCourse = async (data) => {
	const response = await axiosFetch.post(API_URL_COURSE + '/new', data);

	return response.data;
};

const updateCourse = async (courseId, data) => {
	const response = await axiosFetch.put(API_URL_COURSE + '/' + courseId + '/edit', data);

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
	const response = await axiosFetch.put(API_URL_COURSE + '/' + courseId + '/activate', {
		isActive: true,
	});

	return response.data;
};

const getCourses = async (url) => {
	const response = await axiosFetch.get(API_URL_COURSE + url);

	return response.data;
};

const deleteCourses = async () => {
	const response = await axiosFetch.delete(API_URL_COURSE + '/delete');

	return response.data;
};

const createTeaching = async (data) => {
	// const response = await axiosFetch.post(API_URL_COURSE + courseId + '/teaching', data);
	const response = await axiosFetch.post(TEACHING, data);

	return response.data;
};

const courseService = {
	createCourse,
	updateCourse,
	getCourse,
	deleteCourse,
	activateCourse,
	getCourses,
	deleteCourses,
	createTeaching,
};

export default courseService;
