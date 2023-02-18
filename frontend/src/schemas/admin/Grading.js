import * as Yup from 'yup';

export const GradingSchema = Yup.object().shape({
	startDate: Yup.date().required('Please select starting date.'),
	endDate: Yup.date().required('Please select ending date.'),
});
