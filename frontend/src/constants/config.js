const BASE_URL = 'http://localhost:5000';
const API_URL_REGISTER = 'http://localhost:5000/api/auth/register';
const API_URL_LOGIN = 'http://localhost:5000/api/auth/login';
const API_URL_LOGOUT = 'http://localhost:5000/api/auth/logout';
const API_URL_ADMIN = 'http://localhost:5000/api/admin/configuration';
const API_URL_USERS = 'http://localhost:5000/api/admin/users';
const API_URL_COURSE = 'http://localhost:5000/api/course';
const API_URL_REVIEW = 'http://localhost:5000/api/review';
const headers = {
	'Content-Type': 'application/json',
	// Authorization: `Bearer ${token}`,
};

export {
	BASE_URL,
	API_URL_REGISTER,
	API_URL_LOGIN,
	API_URL_LOGOUT,
	API_URL_ADMIN,
	API_URL_USERS,
	API_URL_COURSE,
	API_URL_REVIEW,
	headers,
};
