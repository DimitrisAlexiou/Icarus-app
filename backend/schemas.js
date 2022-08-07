const Joi = require('joi');

module.exports.userSchema = Joi.object({
	user: Joi.object({
		name: Joi.string().required(),
		surname: Joi.string().required(),
		email: Joi.string()
			.email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'gr'] } })
			.required(),
		username: Joi.string().alphanum().min(10).max(30).required(),
	}).required(),
});

module.exports.studentSchema = Joi.object({
	student: Joi.object({
		sid: Joi.string().required(),
		entranceYear: Joi.number()
			.min(1980)
			.max(new Date().getFullYear())
			.required(),
		studentType: Joi.string()
			.valid('Undergraduate', 'Master', 'PhD')
			.required(),
	}).required(),
});

module.exports.instructorSchema = Joi.object({
	instructor: Joi.object({
		facultyType: Joi.string().valid('DEP', 'EDIP', 'ETEP').required(),
		degree: Joi.string()
			.valid('Assistant', 'Associate', 'Professor')
			.required(),
		entranceYear: Joi.number()
			.min(1980)
			.max(new Date().getFullYear())
			.required(),
	}).required(),
});

module.exports.courseSchema = Joi.object({
	course: Joi.object({
		cid: Joi.string()
			.max(9)
			.pattern(/^([3][2][1])\/[0-9][0-9][0-9][0-9][0-9]*$/)
			.required(),
		title: Joi.string()
			.max(40)
			.pattern(/^[A-Za-z ]+$/)
			.required(),
		type: Joi.string().valid('Undergraduate', 'Master', 'Mixed').required(),
		description: Joi.string().required(),
		// prerequisites: Joi.string().required(),
		semester: Joi.string().valid('Winter', 'Spring', 'Any').required(),
		year: Joi.string().valid('1', '2', '3', '4', '5').required(),
		isActive: Joi.boolean().default(false).required(),
		hasLab: Joi.boolean().required(),
		isObligatory: Joi.boolean().required(),
		cycle: Joi.string()
			.valid(
				'Security',
				'Software Engineering',
				'Information Systems',
				'Communication Systems',
				'AI',
			)
			.required(),
		ects: Joi.number().min(1).required(),
	}).required(),
});

module.exports.prerequisitesSchema = Joi.object({
	prerequisites: Joi.object({
		type: Joi.string().valid('hard', 'soft').required(),
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

module.exports.degreeRulesSchema = Joi.object({
	degreeRules: Joi.object({
		cycles: Joi.number().min(1).required(),
		courses: Joi.number().min(1).required(),
		cycleCourses: Joi.number().min(1).required(),
		practice: Joi.boolean().default(false).required(),
	}).required(),
});

//TODO rest schema validations
