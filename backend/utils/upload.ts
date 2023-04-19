import multer, { StorageEngine } from 'multer';
import { Request } from 'express';

const storage: StorageEngine = multer.diskStorage({
	destination: function (req: Request, file: Express.Multer.File, cb: any) {
		cb(null, 'uploads/'); // specify the destination folder for uploads
	},
	filename: function (req: Request, file: Express.Multer.File, cb: any) {
		cb(null, Date.now() + '-' + file.originalname); // specify a unique filename for the uploaded file
	},
});

export const upload = multer({ storage });
