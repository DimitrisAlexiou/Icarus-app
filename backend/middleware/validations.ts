import { Request, Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../interfaces/AuthRequest';
import {
	generalReviewSchema,
	instructorReviewSchema,
	teachingReviewSchema,
} from '../validations/review';
import {
	assessmentSchema,
	degreeRulesSchema,
	masterProgramSchema,
	reviewSchema,
	semesterSchema,
	cycleSchema,
} from '../validations/configuration';
import {
	courseActivationSchema,
	courseSchema,
	directorySchema,
	gradeSchema,
	instructorsAssignmentSchema,
	statementSchema,
	teachingSchema,
} from '../validations/course';
import { profileSchema, userSchema } from '../validations/user';
import {
	announcementSchema,
	eventSchema,
	noteSchema,
} from '../validations/utilities';
import CustomError from '../utils/CustomError';

const validateSchema = (schema: any, schemaName: string) => {
	return (
		req: Request | AuthenticatedRequest,
		_: Response,
		next: NextFunction
	) => {
		const { error } = schema.validate(req.body);
		if (error) {
			console.error(`❌ ${schemaName} schema validation: `.yellow.bold, error);
			throw new CustomError(error.message, 400);
		}

		next();
	};
};

export const validateUser = validateSchema(userSchema, 'User');
export const validateProfile = validateSchema(profileSchema, 'Profile');
export const validateCourse = validateSchema(courseSchema, 'Course');
export const validateCourseActivation = validateSchema(
	courseActivationSchema,
	'Course activation'
);
export const validateTeaching = validateSchema(teachingSchema, 'Teaching');
export const validateInstructorsAssignment = validateSchema(
	instructorsAssignmentSchema,
	'Instructors assignment'
);
export const validateStatement = validateSchema(statementSchema, 'Statement');
export const validateDirectory = validateSchema(directorySchema, 'Directory');
export const validateGrade = validateSchema(gradeSchema, 'Grade');
export const validateTeachingReview = validateSchema(
	teachingReviewSchema,
	'Teaching review'
);
export const validateInstructorReview = validateSchema(
	instructorReviewSchema,
	'Instructor review'
);
export const validateGeneralReview = validateSchema(
	generalReviewSchema,
	'General review'
);
export const validateSemester = validateSchema(semesterSchema, 'Semester');
export const validateAssessment = validateSchema(
	assessmentSchema,
	'Assessment'
);
export const validateReview = validateSchema(reviewSchema, 'Review');
export const validateDegreeRules = validateSchema(
	degreeRulesSchema,
	'Degree rules'
);
export const validateCycle = validateSchema(cycleSchema, 'Cycle');
export const validateMasterProgram = validateSchema(
	masterProgramSchema,
	'Master program'
);
export const validateNote = validateSchema(noteSchema, 'Note');
export const validateEvent = validateSchema(eventSchema, 'Event');
export const validateAnnouncement = validateSchema(
	announcementSchema,
	'Announcement'
);
