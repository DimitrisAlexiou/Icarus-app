import Joi from 'joi';
import {
	courseIdRegex,
	courseTitleRegex,
	masterCourseIdRegex,
} from '../utils/constants';
import { CourseType, PrerequisiteType } from '../models/course/course';

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

export const directorySchema = Joi.object({
	name: Joi.string().required(),
	items: Joi.array()
		.items(
			Joi.object({
				name: Joi.string(),
				size: Joi.number(),
				type: Joi.string(),
				lastModifiedDate: Joi.string(),
			})
		)
		.optional(),
});

export const gradeSchema = Joi.object({
	exam: Joi.object({
		type: Joi.string().required(),
		examination: Joi.string().required(),
		examId: Joi.string().required(),
		grade: Joi.number().min(0).max(10).required(),
	}).required(),
	teachingId: Joi.string().required(),
	statementId: Joi.string().required(),
	userId: Joi.string().required(),
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

export const statementSchema = Joi.object({
	teachings: Joi.array().items(Joi.string().required()).min(1).required(),
	semester: Joi.string().required(),
	user: Joi.string().required(),
	type: Joi.string().required(),
});

export const instructorsAssignmentSchema = Joi.array()
	.items(Joi.string().required())
	.min(1)
	.required();
