import multer from 'multer';
import path from 'path';
import { existsSync, mkdirSync } from 'fs';
import { allowedFileTypes } from '../../utils/constants';
import { AuthenticatedRequest } from '../../interfaces/AuthRequest';
import { DocumentType } from '../../models/course/documents/document';
import CustomError from '../../utils/CustomError';

// interface MulterFile extends Express.Multer.File {
// 	fieldname: string;
// }

// // Set up multer for file uploads
// const storage = multer.diskStorage({
// 	destination: (
// 		req: AuthenticatedRequest,
// 		file: MulterFile,
// 		cb: (error: CustomError | null, destination: string) => void
// 	) => {
// 		const { directory } = req.params as { directory: string };
// 		const uploadPath = path.join(__dirname, 'uploads', directory);

// 		if (!fs.existsSync(uploadPath))
// 			fs.mkdirSync(uploadPath, { recursive: true });

// 		cb(null, uploadPath);
// 	},
// 	filename: (
// 		req: AuthenticatedRequest,
// 		file: MulterFile,
// 		cb: (error: CustomError | null, filename: string) => void
// 	) => {
// 		const customFilename =
// 			req.body.customFileName + path.extname(file.originalname);

// 		cb(null, customFilename); // Use the user-provided name as the filename
// 	},
// });

// export const upload = multer({
// 	storage: storage,
// 	limits: {
// 		fileSize: 8 * 1024 * 1024, // Maximum file size in bytes (8 MB)
// 	},
// 	fileFilter: (
// 		_: AuthenticatedRequest,
// 		file: MulterFile,
// 		cb: (error: CustomError | null, acceptFile: boolean) => void
// 	) => {
// 		const ext = path.extname(file.originalname).toLowerCase();
// 		if (
// 			Object.values(FileExtensions).some(
// 				(extension) => extension === ext.slice(1)
// 			)
// 		)
// 			cb(null, true);
// 		else cb(new CustomError('File type not supported.', 400), false);
// 	},
// });
// export const mapFileTypeToEnum = (fileType: string): DocumentType => {
// 	switch (fileType) {
// 		case 'application/pdf':
// 			return DocumentType.PDF;
// 		case 'application/vnd.openxmlformats-officedocument.presentationml.presentation':
// 			return DocumentType.PPTX;
// 		case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
// 			return DocumentType.DOCX;
// 		case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
// 			return DocumentType.XLSX;
// 		case 'application/zip':
// 			return DocumentType.ZIP;
// 		case 'application/gzip':
// 			return DocumentType.GZ;
// 		case 'text/plain':
// 			return DocumentType.TXT;
// 		case 'image/jpeg':
// 		case 'image/jpg':
// 			return DocumentType.JPG;
// 		case 'image/png':
// 			return DocumentType.PNG;
// 		default:
// 			throw new CustomError('Unsupported file type.', 400);
// 	}
// };

export const mapFileTypeToEnum = (
	fileType: string
): DocumentType | undefined => {
	const mapping: Record<string, DocumentType> = {
		'application/pdf': DocumentType.PDF,
		'application/vnd.openxmlformats-officedocument.presentationml.presentation':
			DocumentType.PPTX,
		'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
			DocumentType.DOCX,
		'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
			DocumentType.XLSX,
		'application/zip': DocumentType.ZIP,
		'application/gzip': DocumentType.GZ,
		'text/plain': DocumentType.TXT,
		'image/jpeg': DocumentType.JPG,
		'image/jpg': DocumentType.JPG,
		'image/png': DocumentType.PNG,
	};

	return mapping[fileType];
};

const uploadsDir = path.join(__dirname, 'uploads');
if (!existsSync(uploadsDir)) mkdirSync(uploadsDir);

// Define storage for uploaded files
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, uploadsDir);
	},
	filename: (req, file, cb) => {
		const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
		cb(null, `${uniqueSuffix}-${file.originalname}`);
	},
});

// File filter to accept only pdf, doc, docx, xls, xlsx, and images
const fileFilter = (req: any, file: any, cb: any) => {
	if (allowedFileTypes.includes(file.mimetype)) cb(null, true);
	else
		cb(
			new Error(
				'Invalid file type. Accepted types: pdf, pptx, docx, xlsx, zip, gz, txt, jpg, jpeg, png.'
			)
		);
};

const maxFileSizeMB: number = parseInt(process.env.MAX_FILE_SIZE_MB || '8', 10);
const maxFileSizeBytes: number = maxFileSizeMB * 1024 * 1024;

export const upload = multer({
	storage: storage,
	fileFilter: fileFilter,
	limits: { fileSize: maxFileSizeBytes },
});
