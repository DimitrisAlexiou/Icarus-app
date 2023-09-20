import express from 'express';
import {
	deleteTeaching,
	viewTeaching,
	updateTeaching,
	viewTeachings,
	deleteSystemTeachings,
	assignTheoryInstructorsToTeaching,
	unassignTheoryInstructorsFromTeaching,
	updateTheoryInstructorsForTeaching,
	assignLabInstructorsToTeaching,
	unassignLabInstructorsFromTeaching,
	assignLabGradingToTeaching,
	assignTheoryGradingToTeaching,
	unassignTheoryGradingFromTeaching,
	unassignLabGradingFromTeaching,
} from '../../controllers/course/teaching';
import { validateInstructorsAssignment, validateTeaching } from '../../middleware/validations';
import { authorize, checkUserRole } from '../../middleware/authMiddleware';
import { UserType } from '../../models/users/user';

export default (router: express.Router) => {
	// @desc    Get / Delete Teachings
	// @route   GET/DELETE /api/course/teaching
	// @access  Private
	router
		.route('/teaching')
		.get(authorize, viewTeachings)
		.delete(authorize, checkUserRole([UserType.admin]), deleteSystemTeachings);

	// @desc    Get / Delete / Update Teaching
	// @route   GET/DELETE/PUT /api/course/teaching/:id
	// @access  Private
	router
		.route('/teaching/:id')
		.get(authorize, viewTeaching)
		.delete(authorize, checkUserRole([UserType.admin, UserType.instructor]), deleteTeaching)
		.put(
			authorize,
			checkUserRole([UserType.admin, UserType.instructor]),
			validateTeaching,
			updateTeaching
		);

	// @desc    Assign Teaching Theory Instructor/s
	// @route   PATCH /api/course/teaching/:id/assign/theory
	// @access  Private
	router.route('/teaching/:id/assign/theory').patch(
		authorize,
		checkUserRole([UserType.admin]),
		// validateInstructorsAssignment,
		assignTheoryInstructorsToTeaching
	);

	// @desc    Unassign Teaching Theory Instructor/s
	// @route   PATCH /api/course/teaching/:id/unassign/theory
	// @access  Private
	router
		.route('/teaching/:id/unassign/theory')
		.patch(authorize, checkUserRole([UserType.admin]), unassignTheoryInstructorsFromTeaching);

	// @desc    Update Teaching Theory Instructor/s
	// @route   PATCH /api/course/teaching/:id/update-assign/theory
	// @access  Private
	router
		.route('/teaching/:id/update-assign/theory')
		.patch(authorize, checkUserRole([UserType.admin]), updateTheoryInstructorsForTeaching);

	// @desc    Assign Teaching Lab Instructor/s
	// @route   PATCH /api/course/teaching/:id/assign/lab
	// @access  Private
	router
		.route('/teaching/:id/assign/lab')
		.patch(authorize, checkUserRole([UserType.admin]), assignLabInstructorsToTeaching);

	// @desc    Unassign Teaching Lab Instructor/s
	// @route   PATCH /api/course/teaching/:id/unassign/lab
	// @access  Private
	router
		.route('/teaching/:id/unassign/lab')
		.patch(authorize, checkUserRole([UserType.admin]), unassignLabInstructorsFromTeaching);

	// @desc    Assign Teaching Theory Grading
	// @route   PATCH /api/course/teaching/:id/assign/theory/grading
	// @access  Private
	router
		.route('/teaching/:id/assign/theory/grading')
		.patch(
			authorize,
			checkUserRole([UserType.admin, UserType.instructor]),
			assignTheoryGradingToTeaching
		);

	// @desc    Unassign Teaching Theory Grading
	// @route   PATCH /api/course/teaching/:id/unassign/theory/grading
	// @access  Private
	router
		.route('/teaching/:id/unassign/theory/grading')
		.patch(
			authorize,
			checkUserRole([UserType.admin, UserType.instructor]),
			unassignTheoryGradingFromTeaching
		);

	// @desc    Assign Teaching Lab Grading
	// @route   PATCH /api/course/teaching/:id/assign/lab/grading
	// @access  Private
	router
		.route('/teaching/:id/assign/lab/grading')
		.patch(
			authorize,
			checkUserRole([UserType.admin, UserType.instructor]),
			assignLabGradingToTeaching
		);

	// @desc    Unassign Teaching Lab Grading
	// @route   PATCH /api/course/teaching/:id/unassign/lab/grading
	// @access  Private
	router
		.route('/teaching/:id/unassign/lab/grading')
		.patch(
			authorize,
			checkUserRole([UserType.admin, UserType.instructor]),
			unassignLabGradingFromTeaching
		);
};
