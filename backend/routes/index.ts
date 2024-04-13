import express from 'express';
import authentication from './auth/authentication';
import user from './user';
import configuration from './admin/configuration';
import courses from './admin/courses';
import reviews from './admin/reviews';
import users from './admin/users';
import utilities from './admin/utilities';
import course from './course/course';
import teaching from './course/teaching';
import directory from './course/documents/directory';
import statement from './course/statement';
import grade from './course/grade';
import calendar from './calendar';
import announcement from './announcement';
import note from './note';
import generalReview from './review/generalReview';
import instructorReview from './review/instructorReview';
import teachingReview from './review/teachingReview';

const router = express.Router();

export default (): express.Router => {
	authentication(router);
	configuration(router);
	courses(router);
	reviews(router);
	users(router);
	utilities(router);
	user(router);
	calendar(router);
	course(router);
	teaching(router);
	directory(router);
	statement(router);
	grade(router);
	note(router);
	announcement(router);
	generalReview(router);
	instructorReview(router);
	teachingReview(router);

	// router.get('/csrf-token', (req, res) => {
	// 	res.json({ csrfToken: req.csrfToken() });
	// });
	// router.use(addCsrfTokenToResponse);

	return router;
};
