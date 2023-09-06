export const convertToPercentage = (value) => {
	const valueMap = {
		1: 20,
		2: 40,
		3: 60,
		4: 80,
		5: 100,
	};

	return valueMap[value];
};

export const getProgressBarColor = (percentage) => {
	if (percentage === 100) return 'bg-success';
	if (percentage === 80) return 'bg-primary';
	if (percentage === 60) return 'bg-info';
	if (percentage === 40) return 'bg-warning';
	if (percentage === 20) return 'bg-danger';
	return '';
};
