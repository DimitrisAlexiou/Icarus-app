import express from 'express';

import authentication from './auth/authentication';
import user from './user';
import admin from './admin';
import calendar from './calendar';
import course from './course';
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
	note(router);
	generalReview(router);
	instructorReview(router);
	teachingReview(router);

	return router;
};
