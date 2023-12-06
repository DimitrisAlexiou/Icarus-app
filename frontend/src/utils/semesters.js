const numSemesters = 10;
export const academicSemesters = Array.from(
	{ length: numSemesters },
	(_, index) => index + 1
);
export const getOrdinalSemesters = (n) => {
	const s = ['th', 'st', 'nd', 'rd'];
	const v = n % 100;
	return n + (s[(v - 20) % 10] || s[v] || s[0]);
};

const numYears = 5;
export const academicYears = Array.from(
	{ length: numYears },
	(_, index) => index + 1
);
export const getOrdinalYears = (n) => {
	const s = ['th', 'st', 'nd', 'rd'];
	const v = n % 100;
	return n + (s[(v - 20) % 10] || s[v] || s[0]);
};
