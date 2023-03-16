import axios from 'axios';

export const handleResponse = (response) => {
	switch (response.status) {
		case 200 || 201:
			return response.data;
		case 400 || 404 || 406 || 409 || 500:
			const message = response.data.message || response.statusText;
			return message;
		case 401:
			localStorage.removeItem('token');
			const message401 = response.data.message || response.statusText;
			return message401;
		default:
			const error = new Error(response.data.message || response.statusText);
			error.response = response;
			throw error;
	}
};

export const handleError = (error) => {
	if (error.response) {
		// parse the response data to return a custom error object or message
		const errorMessage = error.response.data.message || error.response.statusText;
		return { error: errorMessage };
	} else if (error.request) {
		// the request was made but no response was received
		return { error: 'Unable to connect to the server' };
	} else {
		// something else happened while setting up the request
		return { error: error.message };
	}
};

// axios.interceptors.response.use(
// 	(response) => {
// 		return response;
// 	},
// 	(error) => {
// 		if (error.response.status >= 200 && error.response.status < 300) {
// 			return Promise.resolve(error.response);
// 		} else {
// 			const errorMessage = error.response.data.message || 'Something went wrong';
// 			return Promise.reject(errorMessage);
// 		}
// 	}
// );

// axios.interceptors.response.use((response) => response, handleResponse);
