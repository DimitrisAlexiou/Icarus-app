import axios from 'axios';
import { API_URL_COURSE, headers } from '../../constants/config';
const NEW_COURSE = `${API_URL_COURSE}/new`;
const COURSE = `${API_URL_COURSE}/`;
const TEACHING = `${API_URL_COURSE}/:courseId/teaching`;

const createCourse = async (data, token) => {
	const config = {
		headers: { headers, Authorization: `Bearer ${token}` },
	};
	const response = await axios.post(NEW_COURSE, data, config);

	return response.data;
};

const updateCourse = async (courseId, data, token) => {
	const config = {
		headers: { headers, Authorization: `Bearer ${token}` },
	};

	const response = await axios.put(COURSE + courseId + '/edit', data, config);

	return response.data;
};

const activateCourse = async (courseId, token) => {
	const config = {
		headers: { headers, Authorization: `Bearer ${token}` },
	};

	const response = await axios.put(COURSE + courseId, { isActive: true }, config);

	return response.data;
};

const deleteCourse = async (courseId, token) => {
	const config = {
		headers: { headers, Authorization: `Bearer ${token}` },
	};

	const response = await axios.delete(COURSE + courseId, config);

	return response.data;
};

const getCourses = async (token) => {
	const config = {
		headers: { headers, Authorization: `Bearer ${token}` },
	};

	const response = await axios.get(API_URL_COURSE, config);

	return response.data;
};

const getCourse = async (courseId, token) => {
	const config = {
		headers: { headers, Authorization: `Bearer ${token}` },
	};

	const response = await axios.get(COURSE + courseId, config);

	return response.data;
};

const createTeaching = async (data, token) => {
	const config = {
		headers: { headers, Authorization: `Bearer ${token}` },
	};

	// const response = await axios.post(API_URL_COURSE + courseId + '/teaching', teachingData, config);
	const response = await axios.post(TEACHING, data, config);

	return response.data;
};

const courseService = {
	createCourse,
	updateCourse,
	activateCourse,
	deleteCourse,
	getCourses,
	getCourse,
	createTeaching,
};

export default courseService;
