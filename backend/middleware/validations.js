const {
	courseSchema,
	userSchema,
	teachingReviewSchema,
	instructorReviewSchema,
	generalReviewSchema,
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

module.exports = {
	validateCourse,
	validateUser,
	validateTeachingReview,
	validateInstructorReview,
	validateGeneralReview,
};
