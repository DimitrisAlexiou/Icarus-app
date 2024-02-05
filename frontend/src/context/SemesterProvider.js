import React, { createContext, useContext, useEffect, useState } from 'react';
import useCurrentSemester from '../hooks/useCurrentSemester';

const SemesterContext = createContext();

const SemesterProvider = ({ children }) => {
	const { semester, isSemesterLoading } = useCurrentSemester();
	const [semesterData, setSemesterData] = useState(semester);

	useEffect(() => {
		setSemesterData(semester);
	}, [semester]);

	return (
		<SemesterContext.Provider
			value={{ semester: semesterData, isSemesterLoading }}
		>
			{children}
		</SemesterContext.Provider>
	);
};

const useSemester = () => {
	const context = useContext(SemesterContext);
	if (!context)
		throw new Error('useSemester must be used within an SemesterProvider');

	return context;
};

export { SemesterProvider, useSemester };
