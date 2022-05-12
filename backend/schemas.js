const Joi = require('joi');

module.exports.userSchema = Joi.object({
	user: Joi.object({
		name: Joi.string().required(),
		surname: Joi.string().required(),
		email: Joi.string()
			.email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
			.required(),
		username: Joi.string().alphanum().min(10).max(30).required(),
	}).required(),
});

module.exports.studentSchema = Joi.object({
	student: Joi.object({
		sid: Joi.string().required(),
		entranceYear: Joi.number().min(4).max(4).required(),
		studentType: Joi.string().required(),
	}).required(),
});

module.exports.instructorSchema = Joi.object({
	instructor: Joi.object({
		facultyType: Joi.string().required(),
		degree: Joi.string().required(),
		entranceYear: Joi.number().min(4).max(4).required(),
	}).required(),
});

module.exports.courseSchema = Joi.object({
	course: Joi.object({
		cid: Joi.string().required(),
		title: Joi.string().required(),
		type: Joi.string().required(),
		description: Joi.string().required(),
		prerequisites: Joi.string().required(),
		semester: Joi.string().required(),
		year: Joi.string().required(),
		isActive: Joi.boolean().required(),
		hasLab: Joi.boolean().required(),
		isObligatory: Joi.boolean().required(),
		cycle: Joi.string().required(),
		ects: Joi.number().min(1).max(2).required(),
	}).required(),
});

module.exports.teachingReviewSchema = Joi.object({
	teachingReview: Joi.object({
		clear_course_objectives: Joi.number().required(),
		course_material: Joi.number().required(),
		course_comprehension: Joi.number().required(),
		examination_method: Joi.number().required(),
		course_difficulty: Joi.number().required(),
		course_activities: Joi.number().required(),
	}).required(),
});

module.exports.instructorReviewSchema = Joi.object({
	instructorReview: Joi.object({
		good_organization: Joi.number().required(),
		clear_comprehensive_answers: Joi.number().required(),
		student_participation: Joi.number().required(),
		course_consistency: Joi.number().required(),
		instructor_approachable: Joi.number().required(),
	}).required(),
});

module.exports.generalReviewSchema = Joi.object({
	generalReview: Joi.object({
		course_opinion: Joi.string().required(),
		instructor_opinion: Joi.string().required(),
		likes: Joi.string().required(),
		dislikes: Joi.string().required(),
	}).required(),
});
