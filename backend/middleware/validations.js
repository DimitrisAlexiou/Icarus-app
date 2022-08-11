const {
	courseSchema,
	teachingSchema,
	userSchema,
	teachingReviewSchema,
	instructorReviewSchema,
	generalReviewSchema,
	degreeRulesSchema,
	semesterSchema,
	gradingDurationSchema,
	vaccineReassessmentDurationSchema,
	validateAssessmentDurationSchema,
	validateReviewDurationSchema,
	validateReviewStartSchema,
	validateCyclesSchema,
} = require('../schemas');
const ExpressError = require('../utils/ExpressError');

const validateCourse = (req, res, next) => {
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

const validateUser = (req, res, next) => {
	const { error } = userSchema.validate(req.body.user);
	if (error) {
		const msg = error.details.map((el) => el.message).join(',');
		throw new ExpressError(msg, 400);
	} else {
		next();
	}
};

const validateTeachingReview = (req, res, next) => {
	const { error } = teachingReviewSchema.validate(req.body.teachingReview);
	if (error) {
		const msg = error.details.map((el) => el.message).join(',');
		throw new ExpressError(msg, 400);
	} else {
		next();
	}
};

const validateInstructorReview = (req, res, next) => {
	const { error } = instructorReviewSchema.validate(req.body.instructorReview);
	if (error) {
		const msg = error.details.map((el) => el.message).join(',');
		throw new ExpressError(msg, 400);
	} else {
		next();
	}
};

const validateGeneralReview = (req, res, next) => {
	const { error } = generalReviewSchema.validate(req.body.generalReview);
	if (error) {
		const msg = error.details.map((el) => el.message).join(',');
		throw new ExpressError(msg, 400);
	} else {
		next();
	}
};

const validateDegreeRules = (req, res, next) => {
	const { error } = degreeRulesSchema.validate(req.body.degreeRules);
	if (error) {
		const msg = error.details.map((el) => el.message).join(',');
		throw new ExpressError(msg, 400);
	} else {
		next();
	}
};

const validateSemester = (req, res, next) => {
	const { error } = semesterSchema.validate(req.body.semester);
	if (error) {
		const msg = error.details.map((el) => el.message).join(',');
		throw new ExpressError(msg, 400);
	} else {
		next();
	}
};

const validateGradingDuration = (req, res, next) => {
	const { error } = gradingDurationSchema.validate(req.body.gradingDuration);
	if (error) {
		const msg = error.details.map((el) => el.message).join(',');
		throw new ExpressError(msg, 400);
	} else {
		next();
	}
};

const validateVaccineReassessmentDuration = (req, res, next) => {
	const { error } = vaccineReassessmentDurationSchema.validate(
		req.body.vaccineReassessmentDuration,
	);
	if (error) {
		const msg = error.details.map((el) => el.message).join(',');
		throw new ExpressError(msg, 400);
	} else {
		next();
	}
};

const validateAssessmentDuration = (req, res, next) => {
	const { error } = validateAssessmentDurationSchema.validate(
		req.body.assessmentDuration,
	);
	if (error) {
		const msg = error.details.map((el) => el.message).join(',');
		throw new ExpressError(msg, 400);
	} else {
		next();
	}
};

const validateReviewDuration = (req, res, next) => {
	const { error } = validateReviewDurationSchema.validate(
		req.body.reviewDuration,
	);
	if (error) {
		const msg = error.details.map((el) => el.message).join(',');
		throw new ExpressError(msg, 400);
	} else {
		next();
	}
};

const validateReviewStart = (req, res, next) => {
	const { error } = validateReviewStartSchema.validate(req.body.reviewStart);
	if (error) {
		const msg = error.details.map((el) => el.message).join(',');
		throw new ExpressError(msg, 400);
	} else {
		next();
	}
};

const validateCycles = (req, res, next) => {
	const { error } = validateCyclesSchema.validate(req.body.cycles);
	if (error) {
		const msg = error.details.map((el) => el.message).join(',');
		throw new ExpressError(msg, 400);
	} else {
		next();
	}
};

module.exports = {
	validateCourse,
	validateUser,
	validateTeachingReview,
	validateInstructorReview,
	validateGeneralReview,
	validateDegreeRules,
	validateSemester,
	validateGradingDuration,
	validateVaccineReassessmentDuration,
	validateAssessmentDuration,
	validateReviewDuration,
	validateReviewStart,
	validateCycles,
};
