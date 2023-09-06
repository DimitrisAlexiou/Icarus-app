import multer, { StorageEngine } from 'multer';
import { Request } from 'express';
import path from 'path';
import { FileExtensions } from 'models/course/document';
import CustomError from 'utils/CustomError';

interface MulterFile extends Express.Multer.File {
	fieldname: string;
}

const storage = multer.diskStorage({
	destination: function (
		req: Request,
		file: MulterFile,
		cb: (error: CustomError | null, destination: string) => void
	) {
		cb(null, 'document/uploads/'); // Destination folder
	},
	filename: function (
		req: Request,
		file: MulterFile,
		cb: (error: CustomError | null, filename: string) => void
	) {
		const customFilename = req.body.customFileName + path.extname(file.originalname);
		cb(null, customFilename); // Use the user-provided name as the filename
	},
});

export const upload = multer({
	storage: storage,
	limits: {
		fileSize: 8 * 1024 * 1024, // Maximum file size in bytes (8 MB)
	},
	fileFilter: function (
		req: Request,
		file: MulterFile,
		cb: (error: CustomError | null, acceptFile: boolean) => void
	) {
		const ext = path.extname(file.originalname).toLowerCase();
		if (Object.values(FileExtensions).some((extension) => extension === ext.slice(1)))
			cb(null, true);
		else cb(new CustomError('File type not supported.', 400), false);
	},
});
