const {
	userSchema,
	courseSchema,
	teachingSchema,
	teachingReviewSchema,
	instructorReviewSchema,
	generalReviewSchema,
	semesterSchema,
	vaccineReassessmentSchema,
	assessmentDurationSchema,
	reviewDurationSchema,
	reviewStartSchema,
	gradingDurationSchema,
	validateCyclesSchema,
	degreeRulesSchema,
} = require('../schemas');
const ExpressError = require('../utils/expressError');

module.exports.validateUser = (req, res, next) => {
	const { error } = userSchema.validate(req.body);
	if (error) {
		console.error('❌ Error while validating user schema ---> ', error);
		const msg = error.details.map((el) => el.message).join(',');
		throw new ExpressError(msg, 400);
	} else {
		next();
	}
};

module.exports.validateCourse = (req, res, next) => {
	const { error } = courseSchema.validate(req.body.course);
	if (error) {
		console.error('❌ Error while validating course schema ---> ', error);
		const msg = error.details.map((el) => el.message).join(',');
		throw new ExpressError(msg, 400);
	} else {
		next();
	}
};

module.exports.validateTeaching = (req, res, next) => {
	const { error } = teachingSchema.validate(req.body.teaching);
	if (error) {
		console.error('❌ Error while validating teaching schema ---> ', error);
		const msg = error.details.map((el) => el.message).join(',');
		throw new ExpressError(msg, 400);
	} else {
		next();
	}
};

module.exports.validateTeachingReview = (req, res, next) => {
	const { error } = teachingReviewSchema.validate(req.body.teachingReview);
	if (error) {
		console.error('❌ Error while validating teaching review schema ---> ', error);
		const msg = error.details.map((el) => el.message).join(',');
		throw new ExpressError(msg, 400);
	} else {
		next();
	}
};

module.exports.validateInstructorReview = (req, res, next) => {
	const { error } = instructorReviewSchema.validate(req.body.instructorReview);
	if (error) {
		console.error('❌ Error while validating instructor review schema ---> ', error);
		const msg = error.details.map((el) => el.message).join(',');
		throw new ExpressError(msg, 400);
	} else {
		next();
	}
};

module.exports.validateGeneralReview = (req, res, next) => {
	const { error } = generalReviewSchema.validate(req.body.generalReview);
	if (error) {
		console.error('❌ Error while validating general review schema ---> ', error);
		const msg = error.details.map((el) => el.message).join(',');
		throw new ExpressError(msg, 400);
	} else {
		next();
	}
};

module.exports.validateSemester = (req, res, next) => {
	const { error } = semesterSchema.validate(req.body.semester);
	if (error) {
		console.error('❌ Error while validating semester schema ---> ', error);
		const msg = error.details.map((el) => el.message).join(',');
		throw new ExpressError(msg, 400);
	} else {
		next();
	}
};

module.exports.validateVaccineReassessment = (req, res, next) => {
	const { error } = vaccineReassessmentSchema.validate(req.body.vaccineReassessment);
	if (error) {
		console.error('❌ Error while validating vaccine reassessment schema ---> ', error);
		const msg = error.details.map((el) => el.message).join(',');
		throw new ExpressError(msg, 400);
	} else {
		next();
	}
};

module.exports.validateAssessmentDuration = (req, res, next) => {
	const { error } = assessmentDurationSchema.validate(req.body.assessmentDuration);
	if (error) {
		console.error('❌ Error while validating assessment duration schema ---> ', error);
		const msg = error.details.map((el) => el.message).join(',');
		throw new ExpressError(msg, 400);
	} else {
		next();
	}
};

module.exports.validateReviewDuration = (req, res, next) => {
	const { error } = reviewDurationSchema.validate(req.body.reviewDuration);
	if (error) {
		console.error('❌ Error while validating review duration schema ---> ', error);
		const msg = error.details.map((el) => el.message).join(',');
		throw new ExpressError(msg, 400);
	} else {
		next();
	}
};

module.exports.validateReviewStart = (req, res, next) => {
	const { error } = reviewStartSchema.validate(req.body.reviewStart);
	if (error) {
		console.error('❌ Error while validating review start schema ---> ', error);
		const msg = error.details.map((el) => el.message).join(',');
		throw new ExpressError(msg, 400);
	} else {
		next();
	}
};

module.exports.validateGradingDuration = (req, res, next) => {
	const { error } = gradingDurationSchema.validate(req.body.gradingDuration);
	if (error) {
		console.error('❌ Error while validating grading duration schema ---> ', error);
		const msg = error.details.map((el) => el.message).join(',');
		throw new ExpressError(msg, 400);
	} else {
		next();
	}
};

module.exports.validateCycles = (req, res, next) => {
	const { error } = validateCyclesSchema.validate(req.body.cycles);
	if (error) {
		console.error('❌ Error while validating cycles schema ---> ', error);
		const msg = error.details.map((el) => el.message).join(',');
		throw new ExpressError(msg, 400);
	} else {
		next();
	}
};

module.exports.validateDegreeRules = (req, res, next) => {
	const { error } = degreeRulesSchema.validate(req.body.degreeRules);
	if (error) {
		console.error('❌ Error while validating degree rules schema ---> ', error);
		const msg = error.details.map((el) => el.message).join(',');
		throw new ExpressError(msg, 400);
	} else {
		next();
	}
};
