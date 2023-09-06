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
		then: Yup.number().min(1).required('Please select the grading duration period.'),
		otherwise: Yup.number().notRequired(),
	}),
	academicYear: Yup.string().required('Please select the academic year.'),
});

export const SemesterUpdateSchema = Yup.object().shape({
	type: Yup.string()
		.oneOf(
			[SemesterType.Winter, SemesterType.Spring, SemesterType.Any],
			`Type should be one of the following: [${SemesterType.Winter}, ${SemesterType.Spring}, ${SemesterType.Any}]`
		)
		.required('Please select the semester type.'),
	grading: Yup.number().when('type', {
		is: (type) => type !== SemesterType.Any,
		then: Yup.number().min(1).required('Please select the grading duration period.'),
		otherwise: Yup.number().notRequired(),
	}),
	startDate: Yup.date().when('type', {
		is: (type) => type !== SemesterType.Any,
		then: Yup.date().required('Please select starting date.'),
		otherwise: Yup.date().notRequired(),
	}),
	endDate: Yup.date().when('type', {
		is: (type) => type !== SemesterType.Any,
		then: Yup.date().required('Please select ending date.'),
		otherwise: Yup.date().notRequired(),
	}),
});
