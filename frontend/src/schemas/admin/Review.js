import * as Yup from 'yup';

export const ReviewSchema = Yup.object().shape({
	startAfter: Yup.number().min(1).required('Please select the review start period.'),
	startDate: Yup.date().required('Please select starting date.'),
	endDate: Yup.date().required('Please select ending date.'),
});
