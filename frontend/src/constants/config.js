const BASE_URL = 'http://localhost:5000/api/v1';
const API_URL_REGISTER = `${BASE_URL}/auth/register`;
const API_URL_LOGIN = `${BASE_URL}/auth/login`;
const API_URL_LOGOUT = `${BASE_URL}/auth/logout`;
const API_URL_FORGOT_PASSWORD = `${BASE_URL}/auth/forgot-password`;
const API_URL_ADMIN = `${BASE_URL}/admin/configuration`;
const API_URL_USERS = `${BASE_URL}/admin/users`;
const API_URL_COURSE = `${BASE_URL}/course`;
const API_URL_TEACHING = `${BASE_URL}/course/teaching`;
const API_URL_REVIEW = `${BASE_URL}/review`;
const API_URL_NOTE = `${BASE_URL}/note`;
const API_URL_CALENDAR = `${BASE_URL}/calendar`;
const API_URL_USER = `${BASE_URL}/user/profile`;
const headers = {
	'Content-Type': 'application/json',
};

export {
	BASE_URL,
	API_URL_REGISTER,
	API_URL_LOGIN,
	API_URL_LOGOUT,
	API_URL_FORGOT_PASSWORD,
	API_URL_ADMIN,
	API_URL_USERS,
	API_URL_COURSE,
	API_URL_TEACHING,
	API_URL_REVIEW,
	API_URL_NOTE,
	API_URL_CALENDAR,
	API_URL_USER,
	headers,
};
