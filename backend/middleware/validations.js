const { courseSchema, userSchema } = require('../schemas');
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

module.exports = { validateCourse, validateUser };
