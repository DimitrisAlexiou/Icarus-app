import { Request, Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../interfaces/AuthRequest';
import {
	userSchema,
	profileSchema,
	courseSchema,
	teachingSchema,
	statementSchema,
	teachingReviewSchema,
	instructorReviewSchema,
	generalReviewSchema,
	semesterSchema,
	assessmentSchema,
	reviewSchema,
	cycleSchema,
	degreeRulesSchema,
	noteSchema,
	calendarSchema,
	courseActivationSchema,
	instructorsAssignmentSchema,
	masterProgramSchema,
	announcementSchema,
	directorySchema,
} from '../utils/schemas';
import CustomError from '../utils/CustomError';

export const validateUser = (req: Request, _: Response, next: NextFunction) => {
	const { error } = userSchema.validate(req.body);
	if (error) {
		console.error('❌ User schema validation: '.yellow.bold, error);
		throw new CustomError(error.message, 400);
	}

	next();
};

export const validateProfile = (
	req: AuthenticatedRequest,
	_: Response,
	next: NextFunction
) => {
	const isAdmin = req.user.isAdmin;
	if (isAdmin) return next();

	const { error } = profileSchema.validate(req.body);
	if (error) {
		console.error('❌ Profile schema validation: '.yellow.bold, error);
		throw new CustomError(error.message, 400);
	}

	next();
};

export const validateCourse = (
	req: AuthenticatedRequest,
	_: Response,
	next: NextFunction
) => {
	const { error } = courseSchema.validate(req.body);
	if (error) {
		console.error('❌ Course schema validation: '.yellow.bold, error);
		throw new CustomError(error.message, 400);
	}

	next();
};

export const validateCourseActivation = (
	req: AuthenticatedRequest,
	_: Response,
	next: NextFunction
) => {
	const { error } = courseActivationSchema.validate(req.body);
	if (error) {
		console.error(
			'❌ Course activation schema validation: '.yellow.bold,
			error
		);
		throw new CustomError(error.message, 400);
	}

	next();
};

export const validateTeaching = (
	req: AuthenticatedRequest,
	_: Response,
	next: NextFunction
) => {
	const { error } = teachingSchema.validate(req.body);
	if (error) {
		console.error('❌ Teaching schema validation: '.yellow.bold, error);
		throw new CustomError(error.message, 400);
	}

	next();
};

export const validateInstructorsAssignment = (
	req: AuthenticatedRequest,
	_: Response,
	next: NextFunction
) => {
	const { error } = instructorsAssignmentSchema.validate(req.body);
	if (error) {
		console.error(
			'❌ Instructors assignment schema validation: '.yellow.bold,
			error
		);
		throw new CustomError(error.message, 400);
	}

	next();
};

export const validateStatement = (
	req: AuthenticatedRequest,
	_: Response,
	next: NextFunction
) => {
	const { error } = statementSchema.validate(req.body);
	if (error) {
		console.error('❌ Statement schema validation: '.yellow.bold, error);
		throw new CustomError(error.message, 400);
	}

	next();
};

export const validateTeachingReview = (
	req: AuthenticatedRequest,
	_: Response,
	next: NextFunction
) => {
	const { error } = teachingReviewSchema.validate(req.body);
	if (error) {
		console.error('❌ Teaching review schema validation: '.yellow.bold, error);
		throw new CustomError(error.message, 400);
	}

	next();
};

export const validateInstructorReview = (
	req: AuthenticatedRequest,
	_: Response,
	next: NextFunction
) => {
	const { error } = instructorReviewSchema.validate(req.body);
	if (error) {
		console.error(
			'❌ Instructor review schema validation: '.yellow.bold,
			error
		);
		throw new CustomError(error.message, 400);
	}

	next();
};

export const validateGeneralReview = (
	req: AuthenticatedRequest,
	_: Response,
	next: NextFunction
) => {
	const { error } = generalReviewSchema.validate(req.body);
	if (error) {
		console.error('❌ General review schema validation: '.yellow.bold, error);
		throw new CustomError(error.message, 400);
	}

	next();
};

export const validateSemester = (
	req: AuthenticatedRequest,
	_: Response,
	next: NextFunction
) => {
	const { error } = semesterSchema.validate(req.body);
	if (error) {
		console.error(
			'❌ Semester configuration schema validation: '.yellow.bold,
			error
		);
		throw new CustomError(error.message, 400);
	}

	next();
};

export const validateAssessment = (
	req: AuthenticatedRequest,
	_: Response,
	next: NextFunction
) => {
	const { error } = assessmentSchema.validate(req.body);
	if (error) {
		console.error(
			'❌ Assessment statement configuration schema validation: '.yellow.bold,
			error
		);
		throw new CustomError(error.message, 400);
	}

	next();
};

export const validateReview = (
	req: AuthenticatedRequest,
	_: Response,
	next: NextFunction
) => {
	const { error } = reviewSchema.validate(req.body);
	if (error) {
		console.error(
			'❌ Review configuration schema validation: '.yellow.bold,
			error
		);
		throw new CustomError(error.message, 400);
	}

	next();
};

export const validateDegreeRules = (
	req: AuthenticatedRequest,
	_: Response,
	next: NextFunction
) => {
	const { error } = degreeRulesSchema.validate(req.body);
	if (error) {
		console.error('❌ Degree rules schema validation: '.yellow.bold, error);
		throw new CustomError(error.message, 400);
	}

	next();
};

export const validateNote = (
	req: AuthenticatedRequest,
	_: Response,
	next: NextFunction
) => {
	const { error } = noteSchema.validate(req.body);
	if (error) {
		console.error('❌ Note schema validation: '.yellow.bold, error);
		throw new CustomError(error.message, 400);
	}

	next();
};

export const validateCalendar = (
	req: AuthenticatedRequest,
	_: Response,
	next: NextFunction
) => {
	const { error } = calendarSchema.validate(req.body);
	if (error) {
		console.error('❌ Calendar schema validation: '.yellow.bold, error);
		throw new CustomError(error.message, 400);
	}

	next();
};

export const validateMasterProgram = (
	req: AuthenticatedRequest,
	_: Response,
	next: NextFunction
) => {
	const { error } = masterProgramSchema.validate(req.body);
	if (error) {
		console.error(
			'❌ Master program configuration schema validation: '.yellow.bold,
			error
		);
		throw new CustomError(error.message, 400);
	}

	next();
};

export const validateAnnouncement = (
	req: AuthenticatedRequest,
	_: Response,
	next: NextFunction
) => {
	const { error } = announcementSchema.validate(req.body);
	if (error) {
		console.error('❌ Announcement schema validation: '.yellow.bold, error);
		throw new CustomError(error.message, 400);
	}

	next();
};

export const validateDirectory = (
	req: AuthenticatedRequest,
	_: Response,
	next: NextFunction
) => {
	const { error } = directorySchema.validate(req.body);
	if (error) {
		console.error('❌ Directory schema validation: '.yellow.bold, error);
		throw new CustomError(error.message, 400);
	}

	next();
};
