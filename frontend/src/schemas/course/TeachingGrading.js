import * as Yup from 'yup';

export const TeachingGradingSchema = (selectedPart) =>
	Yup.object().shape({
		theoryExamination: Yup.array().when(selectedPart, {
			is: 'theory',
			then: Yup.array()
				.min(1, 'At least one theory examination is required.')
				.of(ExaminationSchema),
		}),
		labExamination: Yup.array().when(selectedPart, {
			is: 'lab',
			then: Yup.array()
				.min(1, 'At least one lab examination is required.')
				.of(ExaminationSchema),
		}),
	});

const ExaminationSchema = Yup.object().shape({
	type: Yup.string().required('Examination type is required.'),
	weight: Yup.number()
		.max(100, 'Examination weight cannot exceed 100.')
		.positive('Number must be positive.')
		.required('Examination weight is required.'),
	lowerGradeThreshold: Yup.number()
		.moreThan(0, 'Lower grade threshold must be greater than 0.')
		.max(10, 'Lower grade threshold cannot exceed 10.')
		.required('Lower grade threshold is required.'),
});
