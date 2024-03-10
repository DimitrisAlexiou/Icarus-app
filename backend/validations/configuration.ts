import Joi from 'joi';
import { courseTitleRegex } from '../utils/constants';
import { SemesterType } from '../models/admin/semester';

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
	period: Joi.number().min(1).required(),
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

export const masterProgramSchema = Joi.object({
	title: Joi.string().max(60).pattern(courseTitleRegex).required(),
	startDate: Joi.date().required(),
	duration: Joi.number().min(1).required(),
	ects: Joi.number().min(1).required(),
});
