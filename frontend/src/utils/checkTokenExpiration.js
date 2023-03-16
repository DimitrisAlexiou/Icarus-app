import axios from 'axios';

export const checkTokenExpiration = (error) => {
	const status = error.response ? error.response.status : null;

	if (status === 401) {
		window.location.replace('/unauthorized');
	}

	return Promise.reject(error);
};

axios.interceptors.response.use((response) => response, checkTokenExpiration);

export default axios;
