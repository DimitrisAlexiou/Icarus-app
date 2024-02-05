import express from 'express';
import { authorize } from '../../../middleware/authMiddleware';
import { upload } from '../../../utils/multer/documentFileUpload';

export default (router: express.Router) => {
	// @desc    Post Document
	// @route   POST /api/v1/upload/:directoryId
	// @access  Private
	router
		.route('/upload/:directoryId')
		.post(authorize, upload.single('document'));
};
