import * as Yup from 'yup';
import { CycleSchema } from '../admin/Cycles';
import { SemesterSchema } from '../admin/Semester';
import { PrerequisitesSchema } from '../course/Prerequisites';

// TODO: ADD PREREQUISITES VALIDATION
export const CourseSchema = Yup.object().shape({
	courseId: Yup.string()
		.max(9, 'Course ID must be 8 digits or less !')
		.matches(
			/^([3][2][1])\/[0-9][0-9][0-9][0-9][0-9]*$/,
			'Course ID must follow the pattern: 321/xxxx OR 321/xxxxx !'
		)
		.required('Course ID is required !'),
	title: Yup.string()
		.max(40, 'Course title must be 40 characters or less !')
		.matches(/^[A-Za-z]+$/, 'Course title must be alphabetic !')
		.required('Course title is required !'),
	type: Yup.string()
		.oneOf(['Undergraduate', 'Master', 'Mixed'])
		.required('Please select the course type !'),
	isObligatory: Yup.boolean().default(true).required(),
	hasPrerequisites: Yup.boolean().default(false).required(),
	hasLab: Yup.boolean().default(false).required(),
	description: Yup.string().max(200, 'Course description must be 200 characters or less !'),
	semester: Yup.string()
		.oneOf(['Winter', 'Spring', 'Any'])
		.required('Please select the course semester !'),
	ects: Yup.number().min(1, 'ECTS must be at least 1 !').required('ECTS value is required !'),
	year: Yup.string().oneOf(['1', '2', '3', '4', '5']).required('Please select the course year !'),
	cycle: Yup.string()
		.oneOf([
			'Security',
			'Software Engineering',
			'Information Systems',
			'Communication Systems',
			'AI',
		])
		.required('Please select the course cycle !'),
	// cycle: CycleSchema.required('Please select the course cycle !'),
	// prerequisites: Yup.array()
	// 	.of(PrerequisitesSchema)
	// 	.required('Please select the course prerequisites !'),
});
