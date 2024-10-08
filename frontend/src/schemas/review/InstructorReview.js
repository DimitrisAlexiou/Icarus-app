import * as Yup from 'yup';

export const InstructorReviewSchema = Yup.object().shape({
	good_organization: Yup.number()
		.oneOf([1, 2, 3, 4, 5])
		.required('Tell us if the organization was good.'),
	clear_comprehensive_answers: Yup.number()
		.oneOf([1, 2, 3, 4, 5])
		.required('Tell us if there were clear comprehensive answers.'),
	student_participation: Yup.number()
		.oneOf([1, 2, 3, 4, 5])
		.required('Tell us the intensity of the student participation.'),
	course_consistency: Yup.number()
		.oneOf([1, 2, 3, 4, 5])
		.required('Tell us if the course had consistency.'),
	instructor_approachable: Yup.number()
		.oneOf([1, 2, 3, 4, 5])
		.required('Tell us if the instructor was approachable.'),
});
