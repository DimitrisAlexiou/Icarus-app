export const BASE_URL = 'http://localhost:5000/api/v1';
export const API_URL_REGISTER = `${BASE_URL}/auth/register`;
export const API_URL_LOGIN = `${BASE_URL}/auth/login`;
export const API_URL_LOGOUT = `${BASE_URL}/auth/logout`;
export const API_URL_FORGOT_PASSWORD = `${BASE_URL}/auth/forgot-password`;
export const API_URL_ADMIN = `${BASE_URL}/admin/configuration`;
export const API_URL_ADMIN_ASSESSMENT = `${BASE_URL}/admin/configuration/assessment`;
export const API_URL_ADMIN_CYCLES = `${BASE_URL}/admin/configuration/cycles`;
export const API_URL_ADMIN_DEGREE_RULES = `${BASE_URL}/admin/configuration/degree_rules`;
export const API_URL_ADMIN_REVIEW = `${BASE_URL}/admin/configuration/review`;
export const API_URL_ADMIN_SEMESTER = `${BASE_URL}/admin/configuration/semester`;
export const API_URL_USERS = `${BASE_URL}/admin/users`;
export const API_URL_COURSE = `${BASE_URL}/course`;
export const API_URL_MYCOURSES = `${BASE_URL}/course/my-courses`;
export const API_URL_TEACHING = `${BASE_URL}/teaching`;
export const API_URL_REVIEW = `${BASE_URL}/review`;
export const API_URL_NOTE = `${BASE_URL}/note`;
export const API_URL_CALENDAR = `${BASE_URL}/calendar`;
export const API_URL_USER = `${BASE_URL}/user/profile`;
export const headers = {
	'Content-Type': 'application/json',
};
