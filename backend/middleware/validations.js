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
	const { error } = userSchema.validate(req.body.user);
	if (error) {
		const msg = error.details.map((el) => el.message).join(',');
		throw new ExpressError(msg, 400);
	} else {
		next();
	}
};

module.exports.validateCourse = (req, res, next) => {
	const { error } = courseSchema.validate(req.body.course);
	if (error) {
		const msg = error.details.map((el) => el.message).join(',');
		throw new ExpressError(msg, 400);
	} else {
		next();
	}
};

module.exports.validateTeaching = (req, res, next) => {
	const { error } = teachingSchema.validate(req.body.teaching);
	if (error) {
		const msg = error.details.map((el) => el.message).join(',');
		throw new ExpressError(msg, 400);
	} else {
		next();
	}
};

module.exports.validateTeachingReview = (req, res, next) => {
	const { error } = teachingReviewSchema.validate(req.body.teachingReview);
	if (error) {
		const msg = error.details.map((el) => el.message).join(',');
		throw new ExpressError(msg, 400);
	} else {
		next();
	}
};

module.exports.validateInstructorReview = (req, res, next) => {
	const { error } = instructorReviewSchema.validate(req.body.instructorReview);
	if (error) {
		const msg = error.details.map((el) => el.message).join(',');
		throw new ExpressError(msg, 400);
	} else {
		next();
	}
};

module.exports.validateGeneralReview = (req, res, next) => {
	const { error } = generalReviewSchema.validate(req.body.generalReview);
	if (error) {
		const msg = error.details.map((el) => el.message).join(',');
		throw new ExpressError(msg, 400);
	} else {
		next();
	}
};

module.exports.validateSemester = (req, res, next) => {
	const { error } = semesterSchema.validate(req.body.semester);
	if (error) {
		const msg = error.details.map((el) => el.message).join(',');
		throw new ExpressError(msg, 400);
	} else {
		next();
	}
};

module.exports.validateVaccineReassessment = (req, res, next) => {
	const { error } = vaccineReassessmentSchema.validate(
		req.body.vaccineReassessment,
	);
	if (error) {
		const msg = error.details.map((el) => el.message).join(',');
		throw new ExpressError(msg, 400);
	} else {
		next();
	}
};

module.exports.validateAssessmentDuration = (req, res, next) => {
	const { error } = assessmentDurationSchema.validate(
		req.body.assessmentDuration,
	);
	if (error) {
		const msg = error.details.map((el) => el.message).join(',');
		throw new ExpressError(msg, 400);
	} else {
		next();
	}
};

module.exports.validateReviewDuration = (req, res, next) => {
	const { error } = reviewDurationSchema.validate(req.body.reviewDuration);
	if (error) {
		const msg = error.details.map((el) => el.message).join(',');
		throw new ExpressError(msg, 400);
	} else {
		next();
	}
};

module.exports.validateReviewStart = (req, res, next) => {
	const { error } = reviewStartSchema.validate(req.body.reviewStart);
	if (error) {
		const msg = error.details.map((el) => el.message).join(',');
		throw new ExpressError(msg, 400);
	} else {
		next();
	}
};

module.exports.validateGradingDuration = (req, res, next) => {
	const { error } = gradingDurationSchema.validate(req.body.gradingDuration);
	if (error) {
		const msg = error.details.map((el) => el.message).join(',');
		throw new ExpressError(msg, 400);
	} else {
		next();
	}
};

module.exports.validateCycles = (req, res, next) => {
	const { error } = validateCyclesSchema.validate(req.body.cycles);
	if (error) {
		const msg = error.details.map((el) => el.message).join(',');
		throw new ExpressError(msg, 400);
	} else {
		next();
	}
};

module.exports.validateDegreeRules = (req, res, next) => {
	const { error } = degreeRulesSchema.validate(req.body.degreeRules);
	if (error) {
		const msg = error.details.map((el) => el.message).join(',');
		throw new ExpressError(msg, 400);
	} else {
		next();
	}
};
