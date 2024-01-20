import React, { createContext, useContext, useState } from 'react';
import { getUserFromLocalStorage } from '../utils/localStorage';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(getUserFromLocalStorage());

	return (
		<AuthContext.Provider value={{ user, setUser }}>
			{children}
		</AuthContext.Provider>
	);
};

const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) throw new Error('useAuth must be used within an AuthProvider');

	return context;
};

export { AuthProvider, useAuth };
