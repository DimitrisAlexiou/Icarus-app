import axios from 'axios';
import { BASE_URL } from '../../constants/config';

const API_URL_NEW_COURSE = `${BASE_URL}/api/course/new`;
const API_URL_COURSES = `${BASE_URL}/api/course`;
const API_URL_COURSE = `${BASE_URL}/api/course/`;

// Create Course
const createCourse = async (courseData, token) => {
	const config = {
		headers: {
			'Content-Type': 'application/json',
			// Authorization: `Bearer ${token}`,
		},
	};

	const response = await axios.post(API_URL_NEW_COURSE, courseData, config);

	return response.data;
};

// Update Course
const updateCourse = async (courseId, courseData, token) => {
	const config = {
		headers: {
			'Content-Type': 'application/json',
			// Authorization: `Bearer ${token}`,
		},
	};

	const response = await axios.put(
		API_URL_COURSE + courseId + '/edit',
		{ courseData },
		config,
	);

	return response.data;
};

// Get Courses
// const getCourses = async (token) => {
const getCourses = async () => {
	const config = {
		headers: {
			'Content-Type': 'application/json',
			// Authorization: `Bearer ${token}`,
		},
	};

	const response = await axios.get(API_URL_COURSES, config);

	return response.data;
};

// Get Course
// const getCourse = async (courseId, token) => {
const getCourse = async (courseId) => {
	const config = {
		headers: {
			'Content-Type': 'application/json',
			// Authorization: `Bearer ${token}`,
		},
	};

	const response = await axios.get(API_URL_COURSE + courseId, config);

	return response.data;
};

const courseService = {
	createCourse,
	updateCourse,
	getCourses,
	getCourse,
};

export default courseService;
