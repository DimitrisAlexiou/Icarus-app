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
} from '../utils/schemas';
import CustomError from '../utils/CustomError';

export const validateUser = (req: Request, _: Response, next: NextFunction) => {
	const { error } = userSchema.validate(req.body);
	if (error) {
		console.error('❌ User schema validation', error);
		throw new CustomError(error.details[0].message, 400);
	}

	next();
};

export const validateProfile = (req: Request, _: Response, next: NextFunction) => {
	const { error } = profileSchema.validate(req.body);
	if (error) {
		console.error('❌ Profile schema validation', error);
		throw new CustomError(error.details[0].message, 400);
	}

	next();
};

export const validateCourse = (req: Request, _: Response, next: NextFunction) => {
	const { error } = courseSchema.validate(req.body);
	if (error) {
		console.error('❌ Course schema validation', error);
		throw new CustomError(error.details[0].message, 400);
	}

	next();
};

export const validateTeaching = (req: Request, _: Response, next: NextFunction) => {
	const { error } = teachingSchema.validate(req.body);
	if (error) {
		console.error('❌ Teaching schema validation', error);
		throw new CustomError(error.details[0].message, 400);
	}

	next();
};

export const validateTeachingReview = (req: Request, _: Response, next: NextFunction) => {
	const { error } = teachingReviewSchema.validate(req.body);
	if (error) {
		console.error('❌ Teaching review schema validation', error);
		throw new CustomError(error.details[0].message, 400);
	}

	next();
};

export const validateInstructorReview = (req: Request, _: Response, next: NextFunction) => {
	const { error } = instructorReviewSchema.validate(req.body);
	if (error) {
		console.error('❌ Instructor review schema validation', error);
		throw new CustomError(error.details[0].message, 400);
	}

	next();
};

export const validateGeneralReview = (req: Request, _: Response, next: NextFunction) => {
	const { error } = generalReviewSchema.validate(req.body);
	if (error) {
		console.error('❌ General review schema validation', error);
		throw new CustomError(error.details[0].message, 400);
	}

	next();
};

export const validateSemester = (req: Request, _: Response, next: NextFunction) => {
	const { error } = semesterSchema.validate(req.body);
	if (error) {
		console.error('❌ Semester configuration schema validation', error);
		throw new CustomError(error.details[0].message, 400);
	}

	next();
};

export const validateAssessment = (req: Request, _: Response, next: NextFunction) => {
	const { error } = assessmentSchema.validate(req.body);
	if (error) {
		console.error('❌ Assessment statement configuration schema validation', error);
		throw new CustomError(error.details[0].message, 400);
	}

	next();
};

export const validateReview = (req: Request, _: Response, next: NextFunction) => {
	const { error } = reviewSchema.validate(req.body);
	if (error) {
		console.error('❌ Review configuration schema validation', error);
		throw new CustomError(error.details[0].message, 400);
	}

	next();
};

export const validateCycles = (req: Request, _: Response, next: NextFunction) => {
	const { error } = cyclesSchema.validate(req.body);
	if (error) {
		console.error('❌ Cycles schema validation', error);
		throw new CustomError(error.details[0].message, 400);
	}

	next();
};

export const validateDegreeRules = (req: Request, _: Response, next: NextFunction) => {
	const { error } = degreeRulesSchema.validate(req.body);
	if (error) {
		console.error('❌ Degree rules schema validation', error);
		throw new CustomError(error.details[0].message, 400);
	}

	next();
};

export const validateNote = (req: Request, _: Response, next: NextFunction) => {
	const { error } = noteSchema.validate(req.body);
	if (error) {
		console.error('❌ Note schema validation', error);
		throw new CustomError(error.details[0].message, 400);
	}

	next();
};

export const validateCalendar = (req: Request, _: Response, next: NextFunction) => {
	const { error } = calendarSchema.validate(req.body);
	if (error) {
		console.error('❌ Calendar schema validation', error);
		throw new CustomError(error.details[0].message, 400);
	}

	next();
};
