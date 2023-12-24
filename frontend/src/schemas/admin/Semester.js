import * as Yup from 'yup';
import { SemesterType } from '../../constants/enums';

export const SemesterSchema = Yup.object().shape({
	type: Yup.string()
		.oneOf(
			[SemesterType.Winter, SemesterType.Spring, SemesterType.Any],
			`Type should be one of the following: [${SemesterType.Winter}, ${SemesterType.Spring}, ${SemesterType.Any}]`
		)
		.required('Please select the semester type.'),
	grading: Yup.number().when('type', {
		is: (type) => type !== SemesterType.Any,
		then: Yup.number()
			.min(1)
			.required('Please select the grading duration period.'),
		otherwise: Yup.number().notRequired(),
	}),
	academicYear: Yup.string().required('Please select the academic year.'),
});
