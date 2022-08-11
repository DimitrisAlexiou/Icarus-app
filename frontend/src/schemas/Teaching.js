import * as Yup from 'yup';

export const TeachingSchema = Yup.object().shape({
	labWeight: Yup.number()
		.min(20, 'Lab weight must be at least 20 !')
		.required('Please provide a theory weight value !'),
	theoryWeight: Yup.number()
		.min(40, 'Theory weight must be at least 40 !')
		.required('Please provide a lab weight value !'),
	theoryGrade: Yup.number()
		.min(1, 'Theory grade can be kept at least 1 year !')
		.required('Please provide a theory grade keeping value !'),
	labGrade: Yup.number()
		.min(1, 'Lab grade can be kept at least 1 year !')
		.required('Please provide a lab grade keeping value !'),
	theoryGradeThreshold: Yup.number()
		.min(4, 'Theory grade threshold must be at least 4 !')
		.required('Please provide a theory grade threshold value !'),
	labGradeThreshold: Yup.number()
		.min(4, 'Lab grade threshold must be at least 4 !')
		.required('Please provide a lab grade threshold value !'),
	books: Yup.string().required('Please provide a recommended course book !'),
});
