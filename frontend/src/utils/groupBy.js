export function groupBy(array, getKey) {
	return array.reduce((acc, item) => {
		const groupKey = getKey(item);
		if (!acc[groupKey]) acc[groupKey] = [];

		acc[groupKey].push(item);
		return acc;
	}, {});
}
