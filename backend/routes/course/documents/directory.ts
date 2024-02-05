import express from 'express';
import { UserType } from '../../../models/users/user';
import { authorize, checkUserRole } from '../../../middleware/authMiddleware';
import {
	createTeachingDirectory,
	deleteDirectory,
	deleteDirectories,
	updateDirectory,
	viewDirectories,
	viewDirectory,
} from '../../../controllers/course/documents/directory';
import { validateDirectory } from '../../../middleware/validations';
import { upload } from '../../../utils/multer/documentFileUpload';

export default (router: express.Router) => {
	// @desc    Get / Post / Delete Directory
	// @route   GET/POST/DELETE /api/v1/teaching/:teachingId/portfolio/directory
	// @access  Private
	router
		.route('/teaching/:teachingId/portfolio/directory')
		.get(authorize, viewDirectories)
		.post(
			authorize,
			checkUserRole([UserType.admin, UserType.instructor]),
			upload.array('items', 10),
			// validateDirectory,
			createTeachingDirectory
		)
		.delete(
			authorize,
			checkUserRole([UserType.admin, UserType.instructor]),
			deleteDirectories
		);

	// @desc    Get / Put / Delete Directory
	// @route   GET/PUT/DELETE /api/v1/teaching/:teachingId/portfolio/directory/:directoryId
	// @access  Private
	router
		.route('/teaching/:teachingId/portfolio/directory/:directoryId')
		.get(authorize, viewDirectory)
		.put(
			authorize,
			checkUserRole([UserType.admin, UserType.instructor]),
			upload.array('items', 10),
			validateDirectory,
			updateDirectory
		)
		.delete(
			authorize,
			checkUserRole([UserType.admin, UserType.instructor]),
			deleteDirectory
		);
};
