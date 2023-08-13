import * as Yup from 'yup';

export const TeachingGradingSchema = (selectedPart) =>
	Yup.object().shape({
		name: Yup.string().required('Examination type is required.'),
		weight: Yup.number()
			.required('Weight is required.')
			.min(0.01, 'Weight must be at least 0.01.')
			.max(100, 'Weight cannot exceed 100.'),
		lowerGradeThreshold: Yup.number()
			.required('Lower grade threshold is required.')
			.min(0, 'Lower grade threshold cannot be negative.')
			.max(10, 'Lower grade threshold cannot exceed 10.'),
	});
