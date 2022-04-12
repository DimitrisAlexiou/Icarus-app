const { courseSchema } = require('../schemas');
const ExpressError = require('../utils/ExpressError');

const validateCourse = (req, res, next) => {
	const { error } = courseSchema.validate(req.body);
	if (error) {
		const msg = error.details.map((el) => el.message).join(',');
		throw new ExpressError(msg, 400);
	} else {
		next();
	}
};

module.exports = { validateCourse };
