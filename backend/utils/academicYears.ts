export const academicYears: { value: string; label: string }[] = (() => {
	const numberOfYearsToShow = 5;

	return Array.from({ length: numberOfYearsToShow + 1 }, (_, index) => {
		const startYear = new Date().getFullYear() + index - 1;
		const endYear = startYear + 1;
		return {
			value: `${startYear}-${endYear}`,
			label: `${startYear}-${endYear}`,
		};
	});
})();

export const academicYearStart: number =
	new Date().getMonth() >= 9
		? new Date().getFullYear()
		: new Date().getFullYear() - 1;
export const academicYearEnd: number = academicYearStart + 1;

export const getCurrentAcademicYear = (currentDate: Date): string => {
	const currentMonth = currentDate.getMonth() + 1;
	const currentYear = currentDate.getFullYear();

	let academicYear: string;

	if (currentMonth >= 10 || currentMonth <= 1)
		academicYear = `${currentYear}-${currentYear + 1}`;
	else academicYear = `${currentYear - 1}-${currentYear}`;

	return academicYear;
};
