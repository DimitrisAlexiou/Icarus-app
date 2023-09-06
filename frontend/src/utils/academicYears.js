export const academicYears = (() => {
	const currentYear = new Date().getFullYear();
	const numberOfYearsToShow = 5;

	return Array.from({ length: numberOfYearsToShow + 1 }, (_, index) => {
		const startYear = currentYear + index - 1;
		const endYear = startYear + 1;
		return {
			value: `${startYear}-${endYear}`,
			label: `${startYear}-${endYear}`,
		};
	});
})();

const currentYear = new Date().getFullYear();
const currentMonth = new Date().getMonth();

export const academicYearStart = currentMonth >= 9 ? currentYear : currentYear - 1;
export const academicYearEnd = academicYearStart + 1;
