import * as Yup from 'yup';
import { CourseType, PrerequisiteType } from '../../constants/enums';
import {
	courseIdRegex,
	courseTitleRegex,
	masterCourseIdRegex,
} from '../../constants/regex';

export const CourseSchema = Yup.object().shape({
	courseId: Yup.string()
		.max(9, 'Course ID must be 8 digits or less.')
		.when('type', {
			is: (type) => [CourseType.Undergraduate, CourseType.Mixed].includes(type),
			then: Yup.string().matches(
				courseIdRegex,
				'Course ID must follow the pattern: 321-xxxx OR 321-xxxxx.'
			),
			otherwise: Yup.string().matches(
				masterCourseIdRegex,
				'Course ID must follow the pattern 1000..up to 9999.'
			),
		})
		.required('Course ID is required.'),
	title: Yup.string()
		.max(60, 'Course title must be 60 characters or less.')
		.matches(courseTitleRegex, 'Course title must be alphabetic.')
		.required('Course title is required.'),
	type: Yup.string()
		.oneOf(
			[CourseType.Undergraduate, CourseType.Master, CourseType.Mixed],
			`Course type should be one of the following: [${CourseType.Undergraduate}, ${CourseType.Master}, ${CourseType.Mixed}]`
		)
		.required('Please select the course type.'),
	isObligatory: Yup.boolean().required(),
	hasPrerequisites: Yup.boolean().required(),
	hasLab: Yup.boolean().required(),
	description: Yup.string().max(
		1500,
		'Course description must be 1500 characters or less.'
	),
	semester: Yup.string()
		.notOneOf(['Select course semester'], 'Select semester.')
		.required('Please select the course semester.'),
	ects: Yup.number()
		.min(1, 'ECTS must be at least 1.')
		.positive('Number must be positive.')
		.required('ECTS value is required.'),
	year: Yup.number()
		.notOneOf(['Select course year'], 'Please select a year.')
		.required('Please select the course year.'),
	cycle: Yup.string().when('isObligatory', {
		is: false,
		then: Yup.string()
			.notOneOf(['Select course cycle'], 'Please select a cycle.')
			.required('Please select the course cycle.'),
		otherwise: Yup.string(),
	}),
	// prerequisites: Yup.array().of(
	// 	Yup.object().shape({
	// 		prerequisite: Yup.string().when('hasPrerequisites', {
	// 			is: true,
	// 			then: Yup.string().required('Please select the prerequisite.'),
	// 			otherwise: Yup.string(),
	// 		}),
	// 		prerequisiteType: Yup.string().when('hasPrerequisites', {
	// 			is: true,
	// 			then: Yup.string()
	// 				.oneOf(
	// 					[PrerequisiteType.Hard, PrerequisiteType.Soft],
	// 					`Type should be one of the following: [${PrerequisiteType.Hard}, ${PrerequisiteType.Soft}]`
	// 				)
	// 				.required('Please select the prerequisite type.'),
	// 			otherwise: Yup.string(),
	// 		}),
	// 	})
	// ),
	// prerequisite: Yup.string().when('hasPrerequisites', {
	// 	is: true,
	// 	then: Yup.string().required('Please select the prerequisite.'),
	// 	otherwise: Yup.string(),
	// }),
	// prerequisiteType: Yup.string().when('hasPrerequisites', {
	// 	is: true,
	// 	then: Yup.string()
	// 		.oneOf(
	// 			[PrerequisiteType.Hard, PrerequisiteType.Soft],
	// 			`Type should be one of the following: [${PrerequisiteType.Hard}, ${PrerequisiteType.Soft}]`
	// 		)
	// 		.required('Please select the prerequisite type.'),
	// 	otherwise: Yup.string(),
	// }),
});
