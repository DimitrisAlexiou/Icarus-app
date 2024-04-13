import express from 'express';
import { UserType } from '../../models/users/user';
import { authorize, checkUserRole } from '../../middleware/authMiddleware';
import { validateGrade } from '../../middleware/validations';
import {
	addTeachingGrade,
	deleteGrade,
	downloadStudentGradesTranscript,
	downloadTeachingGradingTranscript,
	finalizeGrade,
	finalizeGrades,
	updateGrade,
	viewGrade,
	viewRecentGrades,
	viewStudentOverallGrades,
	viewStudentOverallRecentGrades,
	viewStudentRecentGrades,
	viewStudentTeachingGrades,
	viewTeachingGrades,
} from '../../controllers/course/grades/grade';

export default (router: express.Router) => {
	// @desc    Add Teaching Grade / Get Recent Grades
	// @route   GET/POST /api/grade
	// @access  Private
	router
		.route('/grade')
		.post(
			authorize,
			checkUserRole([UserType.admin, UserType.instructor]),
			validateGrade,
			addTeachingGrade
		)
		.get(authorize, checkUserRole([UserType.instructor]), viewRecentGrades);

	// @desc    Get Student Recent Grades
	// @route   GET /api/grade/student/recent
	// @access  Private
	router
		.route('/grade/student/recent')
		.get(authorize, checkUserRole([UserType.student]), viewStudentRecentGrades);

	// @desc    Get Student Overall Grades
	// @route   GET /api/grade/student/overall
	// @access  Private
	router
		.route('/grade/student/overall')
		.get(
			authorize,
			checkUserRole([UserType.student]),
			viewStudentOverallGrades
		);

	// @desc    Get Student Overall Recent Grades
	// @route   GET /api/grade/student/overall/recent
	// @access  Private
	router
		.route('/grade/student/overall/recent')
		.get(
			authorize,
			checkUserRole([UserType.student]),
			viewStudentOverallRecentGrades
		);

	// @desc    Get Statement Teachings Grades
	// @route   POST /api/grade/:statementId
	// @access  Private
	router
		.route('/grade/:statementId')
		.get(
			authorize,
			checkUserRole([UserType.admin, UserType.instructor]),
			viewTeachingGrades
		);

	// @desc    Get / Delete / Update Teaching Grade
	// @route   GET/DELETE/PUT /api/grade/:id
	// @access  Private
	router
		.route('/grade/:id')
		.get(
			authorize,
			checkUserRole([UserType.admin, UserType.instructor]),
			viewGrade
		)
		.delete(
			authorize,
			checkUserRole([UserType.admin, UserType.instructor]),
			deleteGrade
		)
		.put(
			authorize,
			checkUserRole([UserType.admin, UserType.instructor]),
			validateGrade,
			updateGrade
		);

	// @desc    Finalize Grade
	// @route   PUT /api/grade/:gradeId/finalize
	// @access  Private
	router
		.route('/grade/:gradeId/finalize')
		.put(
			authorize,
			checkUserRole([UserType.admin, UserType.instructor]),
			finalizeGrade
		);

	// @desc    Finalize Teaching Grades
	// @route   PUT /api/grade/:statementId/finalize/all
	// @access  Private
	router
		.route('/grade/:statementId/finalize/all')
		.put(
			authorize,
			checkUserRole([UserType.admin, UserType.instructor]),
			finalizeGrades
		);

	// @desc    Download Teaching Grading Transcript
	// @route   GET /api/grade/:statementId
	// @access  Private
	router
		.route('/grade/:statementId/download-pdf')
		.get(
			authorize,
			checkUserRole([UserType.admin, UserType.instructor]),
			downloadTeachingGradingTranscript
		);

	// @desc    Student Teaching Grades
	// @route   GET /api/my-grades/teaching/:teachingId/details
	// @access  Private
	router
		.route('/my-grades/teaching/:teachingId/details')
		.get(
			authorize,
			checkUserRole([UserType.student]),
			viewStudentTeachingGrades
		);

	// @desc    Download Student Grades Transcript
	// @route   GET /api/my-grades/download-pdf
	// @access  Private
	router
		.route('/my-grades/download-pdf')
		.get(
			authorize,
			checkUserRole([UserType.student]),
			downloadStudentGradesTranscript
		);
};
