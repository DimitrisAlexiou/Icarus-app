export const addUserToLocalStorage = (user) => {
	localStorage.setItem('user', JSON.stringify(user));
};

export const removeUserFromLocalStorage = () => {
	localStorage.removeItem('user');
};

export const getUserFromLocalStorage = () => {
	return JSON.parse(localStorage.getItem('user')) || null;
};

export const addLastPageToLocalStorage = () => {
	localStorage.setItem('lastPage', window.location.href);
};

export const getLastPageFromLocalStorage = () => {
	return localStorage.getItem('lastPage');
};

export const removeLastPageFromLocalStorage = () => {
	localStorage.removeItem('lastPage');
};

export const setLoginFailedAttemptsToLocalStorage = (value) => {
	localStorage.setItem('loginFailedAttempts', parseInt(value));
};

export const getLoginFailedAttemptsFromLocalStorage = () => {
	const loginFailedAttempts = localStorage.getItem('loginFailedAttempts');
	return loginFailedAttempts ? parseInt(loginFailedAttempts) : 0;
};

export const removeLoginFailedAttemptsFromLocalStorage = () => {
	localStorage.removeItem('loginFailedAttempts');
};

export const setIsAccountLockedToLocalStorage = (value) => {
	localStorage.setItem('isAccountLocked', JSON.stringify(value));
};

export const getIsAccountLockedFromLocalStorage = () => {
	const isAccountLocked = localStorage.getItem('isAccountLocked');
	return isAccountLocked ? JSON.parse(isAccountLocked) : false;
};

export const removeIsAccountLockedFromLocalStorage = () => {
	localStorage.removeItem('isAccountLocked');
};

export const setLastAttemptedUsernameToLocalStorage = (username) => {
	localStorage.setItem('lastAttemptedUsername', username || null);
};

export const getLastAttemptedUsernameFromLocalStorage = () => {
	return localStorage.getItem('lastAttemptedUsername');
};

export const removeLastAttemptedUsernameFromLocalStorage = () => {
	localStorage.removeItem('lastAttemptedUsername');
};
