export const addUserToLocalStorage = (user) => {
	localStorage.setItem('user', JSON.stringify(user));
	localStorage.setItem('token', JSON.stringify(user.token));
};

export const removeUserFromLocalStorage = () => {
	localStorage.removeItem('user');
	localStorage.removeItem('token');
};

export const getUserFromLocalStorage = () => {
	const result = localStorage.getItem('user');
	const user = result ? JSON.parse(result) : null;
	return user;
};

export const addLastPageToLocalStorage = () => {
	localStorage.setItem('lastPage', window.location.href);
};

export const removeLastPageFromLocalStorage = () => {
	localStorage.removeItem('lastPage');
};

export const getLastPageFromLocalStorage = () => {
	return localStorage.getItem('lastPage');
};
