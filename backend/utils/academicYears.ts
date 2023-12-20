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
