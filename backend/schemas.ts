import Joi from 'joi';

export const userSchema = Joi.object({
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
				new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[!@#$%^&*]).{8,}$/)
			)
			.required(),
		type: Joi.string().valid('Student', 'Instructor').required(),
		studentId: Joi.string().when('type', {
			is: 'Student',
			then: Joi.string()
				.pattern(new RegExp(/^321\/\d{7}$/))
				.required(),
			otherwise: Joi.string(),
		}),
		entranceYear: Joi.number().when('type', {
			is: 'Student',
			then: Joi.number().min(1980).max(new Date().getFullYear()).required(),
			otherwise: Joi.number(),
		}),
		studentType: Joi.string().when('type', {
			is: 'Student',
			then: Joi.string().valid('Undergraduate', 'Master', 'PhD').required(),
			otherwise: Joi.string(),
		}),
		facultyType: Joi.string().when('type', {
			is: 'Instructor',
			then: Joi.string().valid('DEP', 'EDIP', 'ETEP').required(),
			otherwise: Joi.string(),
		}),
		degree: Joi.string().when('type', {
			is: 'Instructor',
			then: Joi.string().valid('Assistant', 'Associate', 'Professor'),
			otherwise: Joi.string(),
		}),
		instructorEntranceYear: Joi.number().when('type', {
			is: 'Instructor',
			then: Joi.number().min(1980).max(new Date().getFullYear()),
			otherwise: Joi.number(),
		}),
	}).required(),
});

export const profileSchema = Joi.object({
	name: Joi.string()
		.max(40)
		.pattern(new RegExp(/^[A-Za-z]+$/)),
	surname: Joi.string()
		.max(40)
		.pattern(new RegExp(/^[A-Za-z]+$/)),
	username: Joi.string().pattern(new RegExp(/^icsd[0-9]{5}$/)),
	email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'gr'] } }),
});

export const courseSchema = Joi.object({
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
		semester: Joi.object({
			type: Joi.string().valid('Winter', 'Spring', 'Any').required(),
		}),
		ects: Joi.number().min(1).required(),
		year: Joi.string()
			.required()
			.custom((value: string, helpers: any) => {
				const validYears: Record<string, string[]> = {
					Undergraduate: ['1', '2', '3', '4', '5'],
					Master: ['1', '2'],
				};
				const { type } = helpers.parent;
				if (!validYears[type].includes(value)) {
					return helpers.message(
						`Year should be one of the following: [${validYears[type].join(', ')}]`
					);
				}
				return value;
			}),
		cycle: Joi.object({
			cycle: Joi.when('isObligatory', {
				is: false,
				then: Joi.string().required(),
				otherwise: Joi.string().allow(''),
			}),
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
					then: Joi.string().valid('Hard', 'Soft').required(),
					otherwise: Joi.string().allow(''),
				}),
			})
		),
		isActive: Joi.boolean().default(false).required(),
	}).required(),
});

export const teachingSchema = Joi.object({
	teaching: Joi.object({
		labWeight: Joi.number().min(0).required(),
		theoryWeight: Joi.number().max(100).required(),
		theoryGrade: Joi.number().min(0).required(),
		labGrade: Joi.number().min(0).required(),
		theoryGradeThreshold: Joi.number().min(4).required(),
		labGradeThreshold: Joi.number().min(4).required(),
		books: Joi.array().items(Joi.string()),
	}).required(),
});

export const teachingReviewSchema = Joi.object({
	teachingReview: Joi.object({
		clear_course_objectives: Joi.number().required(),
		course_material: Joi.number().required(),
		course_comprehension: Joi.number().required(),
		examination_method: Joi.number().required(),
		course_difficulty: Joi.number().required(),
		course_activities: Joi.number().required(),
	}).required(),
});

export const instructorReviewSchema = Joi.object({
	instructorReview: Joi.object({
		good_organization: Joi.number().required(),
		clear_comprehensive_answers: Joi.number().required(),
		student_participation: Joi.number().required(),
		course_consistency: Joi.number().required(),
		instructor_approachable: Joi.number().required(),
	}).required(),
});

export const generalReviewSchema = Joi.object({
	generalReview: Joi.object({
		course_opinion: Joi.string().max(800).required(),
		instructor_opinion: Joi.string().max(800).required(),
		likes: Joi.string().max(800).required(),
		dislikes: Joi.string().max(800).required(),
	}).required(),
});

export const semesterSchema = Joi.object({
	semester: Joi.object({
		type: Joi.string().valid('Winter', 'Spring', 'Any').required(),
		startDate: Joi.date().greater('now').required(),
		endDate: Joi.date().greater(Joi.ref('startDate')).required(),
		grading: Joi.number().min(1).required(),
	}),
});

export const assessmentSchema = Joi.object({
	assessment: Joi.object({
		vaccineStartDate: Joi.date().greater('now').required(),
		vaccineEndDate: Joi.date().greater(Joi.ref('vaccineStartDate')).required(),
		period: Joi.number().min(1).required(),
	}),
});

export const reviewSchema = Joi.object({
	review: Joi.object({
		startDate: Joi.date().greater('now').required(),
		endDate: Joi.date().greater(Joi.ref('startDate')).required(),
		start: Joi.number().min(1).required(),
	}),
});

export const degreeRulesSchema = Joi.object({
	degreeRules: Joi.object({
		cycles: Joi.number().min(1).required(),
		cycleCourses: Joi.number().min(1).required(),
		courses: Joi.number().min(1).required(),
		practice: Joi.boolean().default(false).required(),
	}).required(),
});

export const noteSchema = Joi.object({
	note: Joi.object({
		title: Joi.string().max(40).required(),
		text: Joi.string().max(800).required(),
		postDate: Joi.date().default(Date.now).required(),
		file: Joi.string(),
		categories: Joi.array().items(Joi.string()),
		importance: Joi.boolean().default(false),
		owner: Joi.string().required(),
	}).required(),
});

export const calendarSchema = Joi.object({
	calendar: Joi.object({
		eventId: Joi.string().required(),
		title: Joi.string().max(50).required(),
		start: Joi.date().required(),
		end: Joi.date().required(),
		allDay: Joi.boolean().required(),
	}).required(),
});

export const cyclesSchema = Joi.object({
	cycles: Joi.object({
		names: Joi.array()
			.items(
				Joi.object({
					cycle: Joi.string().required(),
				})
			)
			.required(),
	}),
});
