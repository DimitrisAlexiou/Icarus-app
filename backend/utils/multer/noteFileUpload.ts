import path from 'path';
import fs from 'fs';
import multer, { StorageEngine } from 'multer';
import { AuthenticatedRequest } from '../../interfaces/AuthRequest';
import {
	allowedFileTypes,
	noteFileUploadDestinationPath,
	teachingFileUploadDestination,
} from '../../utils/constants';
import CustomError from '../../utils/CustomError';

interface FileUploadOptions {
	destinationPath: string;
}

const generateFileUploadStorage = ({
	destinationPath,
}: FileUploadOptions): StorageEngine => {
	return multer.diskStorage({
		destination: (
			_: AuthenticatedRequest,
			file: Express.Multer.File,
			cb: any
		) => {
			// Create the necessary directories if they don't exist
			fs.mkdirSync(destinationPath, { recursive: true });
			// Generate a unique filename here or keep the original filename
			const filename = file.originalname;
			// Build the final destination path including the filename
			const filePath = path.join(destinationPath, filename);

			cb(null, filePath);
		},
		filename: (_: AuthenticatedRequest, file: Express.Multer.File, cb: any) => {
			// Generate a unique filename here or keep the original filename
			cb(null, Date.now() + '-' + file.originalname);
		},
	});
};

const fileFilter = (
	_: AuthenticatedRequest,
	file: Express.Multer.File,
	cb: any
) => {
	// Check if the file type is allowed
	if (allowedFileTypes.includes(file.mimetype))
		// Pass null as the first argument to accept the file
		cb(null, true);

	// Pass an error message as the first argument to reject the file
	cb(new CustomError('File type not supported.', 400), false);
};

export const teachingFileUpload = multer({
	storage: generateFileUploadStorage({
		destinationPath: teachingFileUploadDestination,
	}),
	limits: {
		fileSize: 8 * 1024 * 1024, // Set the file size limit here (8 MB)
	},
	fileFilter: fileFilter,
});

export const noteFileUpload = multer({
	storage: generateFileUploadStorage({
		destinationPath: noteFileUploadDestinationPath,
	}),
	limits: {
		fileSize: 8 * 1024 * 1024, // Set the file size limit here (8 MB)
	},
	fileFilter: fileFilter,
});
