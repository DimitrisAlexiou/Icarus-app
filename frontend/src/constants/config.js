const BASE_URL = 'http://localhost:5000';
const API_URL_REGISTER = 'http://localhost:5000/api/auth/register';
const API_URL_LOGIN = 'http://localhost:5000/api/auth/login';
const headers = {
	'Content-Type': 'application/json',
	// Authorization: `Bearer ${token}`,
};

export { BASE_URL, API_URL_REGISTER, API_URL_LOGIN, headers };
