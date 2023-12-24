import Joi from 'joi';
import {
	courseIdRegex,
	courseTitleRegex,
	masterCourseIdRegex,
	nameRegex,
	passwordRegex,
	studentIdRegex,
	surnameRegex,
	usernameRegex,
} from './constants';
import { UserType } from '../models/users/user';
import { StudentType } from '../models/users/student';
import { CourseType, PrerequisiteType } from '../models/course/course';
import { SemesterType } from '../models/admin/semester';
import { Degree, FacultyType } from '../models/users/instructor';

export const userSchema = Joi.object({
	name: Joi.string().max(40).pattern(new RegExp(nameRegex)).required(),
	surname: Joi.string().max(40).pattern(new RegExp(surnameRegex)).required(),
	username: Joi.string().pattern(new RegExp(usernameRegex)).required(),
	email: Joi.string()
		.email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'gr'] } })
		.lowercase()
		.required(),
	password: Joi.string().min(8).pattern(new RegExp(passwordRegex)).required(),
	type: Joi.string().valid(UserType.student, UserType.instructor).required(),
	studentId: Joi.string().when('type', {
		is: UserType.student,
		then: Joi.string().pattern(new RegExp(studentIdRegex)).required(),
		otherwise: Joi.string(),
	}),
	entranceYear: Joi.number().when('type', {
		is: UserType.student,
		then: Joi.number().min(1980).max(new Date().getFullYear()).required(),
		otherwise: Joi.number(),
	}),
	studentType: Joi.string().when('type', {
		is: UserType.student,
		then: Joi.string()
			.valid(StudentType.Undergraduate, StudentType.Master, StudentType.PhD)
			.required(),
		otherwise: Joi.string(),
	}),
	facultyType: Joi.string().when('type', {
		is: UserType.instructor,
		then: Joi.string()
			.valid(FacultyType.DEP, FacultyType.EDIP, FacultyType.ETEP)
			.required(),
		otherwise: Joi.string(),
	}),
	degree: Joi.string().when('type', {
		is: UserType.instructor,
		then: Joi.string().valid(
			Degree.Assistant,
			Degree.Associate,
			Degree.Professor
		),
		otherwise: Joi.string(),
	}),
	instructorEntranceYear: Joi.number().when('type', {
		is: UserType.instructor,
		then: Joi.number().min(1980).max(new Date().getFullYear()),
		otherwise: Joi.number(),
	}),
});

export const profileSchema = Joi.object({
	name: Joi.string().max(40).pattern(new RegExp(nameRegex)),
	surname: Joi.string().max(40).pattern(new RegExp(surnameRegex)),
	username: Joi.string().pattern(new RegExp(usernameRegex)),
	email: Joi.string()
		.lowercase()
		.email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'gr'] } }),
	type: Joi.string().valid(UserType.student, UserType.instructor),
	degree: Joi.string().when('type', {
		is: UserType.instructor,
		then: Joi.string().valid(
			Degree.Assistant,
			Degree.Associate,
			Degree.Professor,
			`Degree type should be one of the following: [${Degree.Assistant}, ${Degree.Associate}, ${Degree.Professor}]`
		),
		otherwise: Joi.string(),
	}),
});

export const courseSchema = Joi.object({
	courseId: Joi.string()
		.max(9)
		.when('type', {
			is: [CourseType.Undergraduate, CourseType.Mixed],
			then: Joi.string().pattern(
				courseIdRegex,
				'Course ID must follow the pattern: 321-xxxx OR 321-xxxxx.'
			),
			otherwise: Joi.string().pattern(
				masterCourseIdRegex,
				'Course ID must follow the pattern 1000..up to 9999.'
			),
		})
		.required(),
	title: Joi.string().max(60).pattern(courseTitleRegex).required(),
	type: Joi.string()
		.valid(CourseType.Undergraduate, CourseType.Master, CourseType.Mixed)
		.required(),
	isObligatory: Joi.boolean().default(true).required(),
	hasPrerequisites: Joi.boolean().default(false).required(),
	hasLab: Joi.boolean().default(false).required(),
	description: Joi.string().allow(''),
	semester: Joi.string().required(),
	ects: Joi.number().min(1).required(),
	year: Joi.number()
		.valid(1, 2, 3, 4, 5)
		.when('type', {
			is: CourseType.Master,
			then: Joi.valid(1, 2).required(),
			otherwise: Joi.valid(1, 2, 3, 4, 5).required(),
		}),
	cycle: Joi.when('isObligatory', {
		is: false,
		then: Joi.string().required(),
		otherwise: Joi.string().allow(null),
	}),
	master: Joi.when('type', {
		is: CourseType.Master,
		then: Joi.string().required(),
		otherwise: Joi.string().allow(null),
	}),
	prerequisites: Joi.array().items(
		Joi.object({
			prerequisite: Joi.string().when('hasPrerequisites', {
				is: true,
				then: Joi.string().required(),
				otherwise: Joi.string().allow(''),
			}),
			prerequisiteType: Joi.string().when('hasPrerequisites', {
				is: true,
				then: Joi.string()
					.valid(PrerequisiteType.Hard, PrerequisiteType.Soft)
					.required(),
				otherwise: Joi.string().allow(''),
			}),
		}).unknown()
	),
	isActive: Joi.boolean().default(false).required(),
});

export const courseActivationSchema = Joi.object({
	isActive: Joi.boolean().default(false).required(),
});

export const teachingSchema = Joi.object({
	labWeight: Joi.number().min(0).required(),
	theoryWeight: Joi.number().max(100).required(),
	theoryGradeRetentionYears: Joi.number().min(0).required(),
	labGradeRetentionYears: Joi.number().min(0).required(),
	theoryGradeThreshold: Joi.number().min(4).greater(0).required(),
	labGradeThreshold: Joi.number().min(4).greater(0).required(),
	books: Joi.array().items(Joi.string()),
	course: Joi.string().required(),
	semester: Joi.string().required(),
});

const examinationSchema = Joi.object({
	type: Joi.string().required(),
	weight: Joi.number().max(100).positive().required(),
	lowerGradeThreshold: Joi.number().precision(2).max(10).required(),
});

export const teachingGradingSchema = Joi.object({
	theoryExamination: Joi.array().when('theory', {
		is: true,
		then: Joi.array().min(1).items(examinationSchema),
	}),
	labExamination: Joi.array().when('lab', {
		is: true,
		then: Joi.array().min(1).items(examinationSchema),
	}),
});

export const instructorsAssignmentSchema = Joi.array()
	.items(Joi.string().required())
	.min(1)
	.required();

export const statementSchema = Joi.object({
	teachings: Joi.array().items(Joi.string().required()).min(1).required(),
	semester: Joi.string().required(),
	user: Joi.string().required(),
	type: Joi.string().required(),
});

export const teachingReviewSchema = Joi.object({
	clear_course_objectives: Joi.number().required(),
	course_material: Joi.number().required(),
	course_comprehension: Joi.number().required(),
	examination_method: Joi.number().required(),
	course_difficulty: Joi.number().required(),
	course_activities: Joi.number().required(),
	teaching: Joi.string().required(),
	user: Joi.string().required(),
});

export const instructorReviewSchema = Joi.object({
	good_organization: Joi.number().required(),
	clear_comprehensive_answers: Joi.number().required(),
	student_participation: Joi.number().required(),
	course_consistency: Joi.number().required(),
	instructor_approachable: Joi.number().required(),
	teaching: Joi.string().required(),
	user: Joi.string().required(),
});

export const generalReviewSchema = Joi.object({
	course_opinion: Joi.string().max(800).required(),
	instructor_opinion: Joi.string().max(800).required(),
	likes: Joi.string().max(800).required(),
	dislikes: Joi.string().max(800).required(),
	teaching: Joi.string().required(),
	user: Joi.string().required(),
});

export const semesterSchema = Joi.object({
	type: Joi.string()
		.valid(SemesterType.Winter, SemesterType.Spring, SemesterType.Any)
		.required(),
	academicYear: Joi.string().required(),
	// startDate: Joi.date().when('type', {
	// 	is: SemesterType.Any,
	// 	then: Joi.optional().allow(null),
	// 	otherwise: Joi.date().required(),
	// }),
	// endDate: Joi.date().when('type', {
	// 	is: SemesterType.Any,
	// 	then: Joi.optional().allow(null),
	// 	otherwise: Joi.date().greater(Joi.ref('startDate')).required(),
	// }),
	grading: Joi.number().when('type', {
		is: SemesterType.Any,
		then: Joi.optional(),
		otherwise: Joi.number().min(1).required(),
	}),
});

export const assessmentSchema = Joi.object({
	vaccineStartDate: Joi.date().required(),
	vaccineEndDate: Joi.date().greater(Joi.ref('vaccineStartDate')).required(),
	period: Joi.number().min(1).required(),
	semester: Joi.string().required(),
});

export const reviewSchema = Joi.object({
	startDate: Joi.date().required(),
	endDate: Joi.date().greater(Joi.ref('startDate')).required(),
	startAfter: Joi.number().min(1).required(),
	semester: Joi.string().required(),
});

export const degreeRulesSchema = Joi.object({
	cycles: Joi.number().min(1).required(),
	cycleCourses: Joi.number().min(1).required(),
	courses: Joi.number().min(1).required(),
	practice: Joi.boolean().default(false).required(),
});

export const cycleSchema = Joi.object({
	cycle: Joi.string().required(),
});

export const noteSchema = Joi.object({
	title: Joi.string().max(40).required(),
	text: Joi.string().max(800).required(),
	file: Joi.string().allow('').optional().empty(),
	categories: Joi.array().items(Joi.string()),
	importance: Joi.boolean().default(false),
	owner: Joi.string().required(),
});

export const calendarSchema = Joi.object({
	eventId: Joi.string().required(),
	title: Joi.string().max(50).required(),
	startDate: Joi.date().required(),
	endDate: Joi.date().required(),
	allDay: Joi.boolean().required(),
	owner: Joi.string().required(),
});

export const masterProgramSchema = Joi.object({
	title: Joi.string().max(60).pattern(courseTitleRegex).required(),
	startDate: Joi.date().required(),
	duration: Joi.number().min(1).required(),
	ects: Joi.number().min(1).required(),
});
