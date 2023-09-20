const numSemesters = 10;
export const academicSemesters = Array.from({ length: numSemesters }, (_, index) => index + 1);
export const getOrdinal = (n) => {
	const s = ['th', 'st', 'nd', 'rd'];
	const v = n % 100;
	return n + (s[(v - 20) % 10] || s[v] || s[0]);
};
