const jwt = require('jsonwebtoken');

export const checkTokenExpiration = () => {
	const token = localStorage.getItem('token');
	if (!token) {
		return false;
	}

	const verified = jwt.verify(token, process.env.JWT_SECRET_KEY);
	return verified;
};
