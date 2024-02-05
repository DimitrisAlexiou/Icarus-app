import express from 'express';
import authentication from './auth/authentication';
import user from './user';
import admin from './admin';
import course from './course/course';
import teaching from './course/teaching';
import directory from './course/documents/directory';
import statement from './course/statement';
import calendar from './calendar';
import announcement from './announcement';
import note from './note';
import generalReview from './review/generalReview';
import instructorReview from './review/instructorReview';
import teachingReview from './review/teachingReview';

const router = express.Router();

export default (): express.Router => {
	authentication(router);
	admin(router);
	user(router);
	calendar(router);
	course(router);
	teaching(router);
	directory(router);
	statement(router);
	note(router);
	announcement(router);
	generalReview(router);
	instructorReview(router);
	teachingReview(router);

	return router;
};
