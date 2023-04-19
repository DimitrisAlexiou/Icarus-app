import { Request, Response, NextFunction } from 'express';
import {
	userSchema,
	profileSchema,
	courseSchema,
	teachingSchema,
	teachingReviewSchema,
	instructorReviewSchema,
	generalReviewSchema,
	semesterSchema,
	assessmentSchema,
	reviewSchema,
	cyclesSchema,
	degreeRulesSchema,
	noteSchema,
	calendarSchema,
} from '../schemas';
import ExpressError from '../utils/expressError';

export const validateUser = (req: Request, _: Response, next: NextFunction) => {
	const { error } = userSchema.validate(req.body.user);
	if (error) {
		console.error('❌ Error while validating user schema ---> ', error);
		const msg = error.details.map((el: any) => el.message).join(',');
		throw new ExpressError(msg, 400);
	} else {
		next();
	}
};

export const validateProfile = (req: Request, _: Response, next: NextFunction) => {
	const { error } = profileSchema.validate(req.body);
	if (error) {
		console.error('❌ Error while validating profile schema ---> ', error);
		const msg = error.details.map((el: any) => el.message).join(',');
		throw new ExpressError(msg, 400);
	} else {
		next();
	}
};

export const validateCourse = (req: Request, _: Response, next: NextFunction) => {
	const { error } = courseSchema.validate(req.body.course);
	if (error) {
		console.error('❌ Error while validating course schema ---> ', error);
		const msg = error.details.map((el: any) => el.message).join(',');
		throw new ExpressError(msg, 400);
	} else {
		next();
	}
};

export const validateTeaching = (req: Request, _: Response, next: NextFunction) => {
	const { error } = teachingSchema.validate(req.body.teaching);
	if (error) {
		console.error('❌ Error while validating teaching schema ---> ', error);
		const msg = error.details.map((el: any) => el.message).join(',');
		throw new ExpressError(msg, 400);
	} else {
		next();
	}
};

export const validateTeachingReview = (req: Request, _: Response, next: NextFunction) => {
	const { error } = teachingReviewSchema.validate(req.body.teachingReview);
	if (error) {
		console.error('❌ Error while validating teaching review schema ---> ', error);
		const msg = error.details.map((el: any) => el.message).join(',');
		throw new ExpressError(msg, 400);
	} else {
		next();
	}
};

export const validateInstructorReview = (req: Request, _: Response, next: NextFunction) => {
	const { error } = instructorReviewSchema.validate(req.body.instructorReview);
	if (error) {
		console.error('❌ Error while validating instructor review schema ---> ', error);
		const msg = error.details.map((el: any) => el.message).join(',');
		throw new ExpressError(msg, 400);
	} else {
		next();
	}
};

export const validateGeneralReview = (req: Request, _: Response, next: NextFunction) => {
	const { error } = generalReviewSchema.validate(req.body.generalReview);
	if (error) {
		console.error('❌ Error while validating general review schema ---> ', error);
		const msg = error.details.map((el: any) => el.message).join(',');
		throw new ExpressError(msg, 400);
	} else {
		next();
	}
};

export const validateSemester = (req: Request, _: Response, next: NextFunction) => {
	const { error } = semesterSchema.validate(req.body.semester);
	if (error) {
		console.error('❌ Error while validating semester schema ---> ', error);
		const msg = error.details.map((el: any) => el.message).join(',');
		throw new ExpressError(msg, 400);
	} else {
		next();
	}
};

export const validateAssessment = (req: Request, _: Response, next: NextFunction) => {
	const { error } = assessmentSchema.validate(req.body.assessment);
	if (error) {
		console.error(
			'❌ Error while validating assessment statement duration period schema ---> ',
			error
		);
		const msg = error.details.map((el: any) => el.message).join(',');
		throw new ExpressError(msg, 400);
	} else {
		next();
	}
};

export const validateReview = (req: Request, _: Response, next: NextFunction) => {
	const { error } = reviewSchema.validate(req.body.review);
	if (error) {
		console.error('❌ Error while validating review configuration schema ---> ', error);
		const msg = error.details.map((el: any) => el.message).join(',');
		throw new ExpressError(msg, 400);
	} else {
		next();
	}
};

export const validateCycles = (req: Request, _: Response, next: NextFunction) => {
	const { error } = cyclesSchema.validate(req.body.cycles);
	if (error) {
		console.error('❌ Error while validating cycles schema ---> ', error);
		const msg = error.details.map((el: any) => el.message).join(',');
		throw new ExpressError(msg, 400);
	} else {
		next();
	}
};

export const validateDegreeRules = (req: Request, _: Response, next: NextFunction) => {
	const { error } = degreeRulesSchema.validate(req.body.degreeRules);
	if (error) {
		console.error('❌ Error while validating degree rules schema ---> ', error);
		const msg = error.details.map((el: any) => el.message).join(',');
		throw new ExpressError(msg, 400);
	} else {
		next();
	}
};

export const validateNote = (req: Request, _: Response, next: NextFunction) => {
	const { error } = noteSchema.validate(req.body.note);
	if (error) {
		console.error('❌ Error while validating note schema ---> ', error);
		const msg = error.details.map((el: any) => el.message).join(',');
		throw new ExpressError(msg, 400);
	} else {
		next();
	}
};

export const validateCalendar = (req: Request, _: Response, next: NextFunction) => {
	const { error } = calendarSchema.validate(req.body.calendar);
	if (error) {
		console.error('❌ Error while validating calendar schema ---> ', error);
		const msg = error.details.map((el: any) => el.message).join(',');
		throw new ExpressError(msg, 400);
	} else {
		next();
	}
};
