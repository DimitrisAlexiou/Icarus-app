const Joi = require('joi');

module.exports.userSchema = Joi.object({
	user: Joi.object({
		name: Joi.string()
			.max(40)
			.pattern(new RegExp(/^[A-Za-z]+$/))
			.required(),
		surname: Joi.string()
			.max(40)
			.pattern(new RegExp(/^[A-Za-z]+$/))
			.required(),
		username: Joi.string()
			.pattern(new RegExp(/^icsd[0-9]{5}$/))
			.required(),
		email: Joi.string()
			.email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'gr'] } })
			.required(),
		password: Joi.string()
			.min(8)
			.pattern(
				new RegExp('^(?=.*d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[!@#$%^&*]).{8,}$')
			)
			.required(),
		type: Joi.string().valid('Student', 'Instructor').required(),
	}).required(),
});

module.exports.studentSchema = Joi.object({
	student: Joi.object({
		studentId: Joi.string().required(),
		studentType: Joi.string().valid('Undergraduate', 'Master', 'PhD').required(),
		entranceYear: Joi.number().min(1980).max(new Date().getFullYear()).required(),
	}).required(),
});

module.exports.instructorSchema = Joi.object({
	instructor: Joi.object({
		facultyType: Joi.string().valid('DEP', 'EDIP', 'ETEP').required(),
		degree: Joi.string().valid('Assistant', 'Associate', 'Professor'),
		instructorEntranceYear: Joi.number().min(1980).max(new Date().getFullYear()),
	}).required(),
});

// TODO: add PREREQUISITES
module.exports.courseSchema = Joi.object({
	course: Joi.object({
		courseId: Joi.string()
			.max(9)
			.pattern(/^([3][2][1])\/[0-9][0-9][0-9][0-9][0-9]*$/)
			.required(),
		title: Joi.string()
			.max(40)
			.pattern(/^[A-Za-z ]+$/)
			.required(),
		type: Joi.string().valid('Undergraduate', 'Master', 'Mixed').required(),
		isObligatory: Joi.boolean().default(true).required(),
		hasPrerequisites: Joi.boolean().default(false).required(),
		hasLab: Joi.boolean().default(false).required(),
		description: Joi.string(),
		semester: Joi.string().valid('Winter', 'Spring', 'Any').required(),
		ects: Joi.number().min(1).required(),
		year: Joi.string().valid('1', '2', '3', '4', '5').required(),
		cycle: Joi.string()
			.valid(
				'Security',
				'Software Engineering',
				'Information Systems',
				'Communication Systems',
				'AI'
			)
			.required(),
		prerequisites: Joi.array().items().required(),
		isActive: Joi.boolean().default(false).required(),
	}).required(),
});

module.exports.prerequisitesSchema = Joi.object({
	prerequisites: Joi.object({
		type: Joi.string().valid('Hard', 'Soft').required(),
	}).required(),
});

module.exports.teachingSchema = Joi.object({
	teaching: Joi.object({
		labWeight: Joi.number().min(0).required(),
		theoryWeight: Joi.number().max(100).required(),
		theoryGrade: Joi.number().min(0).required(),
		labGrade: Joi.number().min(0).required(),
		theoryGradeThreshold: Joi.number().min(4).required(),
		labGradeThreshold: Joi.number().min(4).required(),
		books: Joi.string().required(),
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

module.exports.semesterSchema = Joi.object({
	semester: Joi.object({
		type: Joi.string().valid('Winter', 'Spring', 'Any').required(),
		startDate: Joi.date().greater('now').required(),
		endDate: Joi.date().greater(Joi.ref('startDate')).required(),
	}),
});

module.exports.vaccineReassessmentSchema = Joi.object({
	vaccineReassessment: Joi.object({
		startDate: Joi.date().greater('now').required(),
		endDate: Joi.date().greater(Joi.ref('startDate')).required(),
	}),
});

module.exports.assessmentDurationSchema = Joi.object({
	assessmentDuration: Joi.object({
		startDate: Joi.date().greater('now').required(),
		endDate: Joi.date().greater(Joi.ref('startDate')).required(),
	}),
});

module.exports.reviewDurationSchema = Joi.object({
	reviewDuration: Joi.object({
		startDate: Joi.date().greater('now').required(),
		endDate: Joi.date().greater(Joi.ref('startDate')).required(),
	}),
});

module.exports.reviewStartSchema = Joi.object({
	reviewStart: Joi.object({
		init: Joi.number().min(1).required(),
	}),
});

module.exports.gradingDurationSchema = Joi.object({
	gradingDuration: Joi.object({
		period: Joi.number().min(1).required(),
	}),
});

module.exports.validateCyclesSchema = Joi.object({
	cycles: Joi.object({
		name: Joi.string()
			.valid(
				'Security',
				'Software Engineering',
				'Information Systems',
				'Communication Systems',
				'AI'
			)
			.required(),
	}),
});

module.exports.degreeRulesSchema = Joi.object({
	degreeRules: Joi.object({
		cycles: Joi.number().min(1).required(),
		cycleCourses: Joi.number().min(1).required(),
		courses: Joi.number().min(1).required(),
		practice: Joi.boolean().default(false).required(),
	}).required(),
});

//TODO rest schema validations
