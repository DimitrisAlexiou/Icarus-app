import Joi from 'joi';

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
