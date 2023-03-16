import * as Yup from 'yup';

export const AssessmentSchema = Yup.object().shape({
	period: Yup.number().min(1).required('Please select the assessment statement period.'),
	startDate: Yup.date().required('Please select starting date.'),
	endDate: Yup.date().required('Please select ending date.'),
});
