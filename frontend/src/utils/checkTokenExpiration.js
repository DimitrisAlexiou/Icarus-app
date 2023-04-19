import axios from 'axios';
import { removeUserFromLocalStorage, removeLastPageFromLocalStorage } from '../utils/localStorage';

export const checkTokenExpiration = (error) => {
	const status = error.response ? error.response.status : null;

	if (status === 401) {
		removeUserFromLocalStorage();
		window.location.href = '/unauthorized';
		removeLastPageFromLocalStorage();
	}

	return Promise.reject(error);
};

axios.interceptors.response.use((response) => response, checkTokenExpiration);

export default axios;
