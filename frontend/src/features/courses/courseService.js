import axios from 'axios';
import { API_URL_COURSE, headers } from '../../constants/config';
const NEW_COURSE = `${API_URL_COURSE}/new`;
const COURSE = `${API_URL_COURSE}/`;
const TEACHING = `${API_URL_COURSE}/:courseId/teaching`;

// Create Course
const createCourse = async (values) => {
	const config = {
		headers: { headers },
	};
	const response = await axios.post(NEW_COURSE, values, config);
	return response.data;
};

// Update Course
const updateCourse = async (courseId, courseData, token) => {
	const config = {
		headers: { headers },
	};

	const response = await axios.put(COURSE + courseId + '/edit', courseData, config);

	return response.data;
};

// Activate Course
const activateCourse = async (courseId, token) => {
	const config = {
		headers: { headers },
	};

	const response = await axios.put(COURSE + courseId, { isActive: true }, config);

	return response.data;
};

// Delete Course
const deleteCourse = async (courseId, token) => {
	const config = {
		headers: { headers },
	};

	return await axios.delete(COURSE + courseId, config);
};

// Get Courses
// const getCourses = async (token) => {
const getCourses = async () => {
	const config = {
		headers: { headers },
	};

	const response = await axios.get(API_URL_COURSE, config);

	return response.data;
};

// Get Course
// const getCourse = async (courseId, token) => {
const getCourse = async (courseId) => {
	const config = {
		headers: { headers },
	};

	const response = await axios.get(COURSE + courseId, config);

	return response.data;
};

// Create Teaching
const createTeaching = async (teachingData, token) => {
	const config = {
		headers: { headers },
	};

	// return await axios.post(API_URL_COURSE + courseId + '/teaching', teachingData, config);
	return await axios.post(TEACHING, teachingData, config);
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
