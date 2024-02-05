import { Response } from 'express';
import { AuthenticatedRequest } from '../../../interfaces/AuthRequest';
import { tryCatch } from '../../../utils/tryCatch';
import {
	createDirectory,
	deleteDirectoriesByTeachingId,
	deleteDirectoryById,
	getDirectoriesByTeachingId,
	getDirectoryById,
	getDirectoryByName,
	updateDirectoryById,
} from '../../../models/course/documents/directory';
import { getTeachingById } from '../../../models/course/teaching';
import CustomError from '../../../utils/CustomError';
import {
	DocumentProps,
	DocumentType,
} from '../../../models/course/documents/document';
import { mapFileTypeToEnum } from '../../../utils/multer/documentFileUpload';

export const createTeachingDirectory = tryCatch(
	async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
		const { name, items } = req.body;
		console.log(req.files);
		console.log(req.body);

		if (!name) throw new CustomError('Please provide a directory name.', 400);

		const { teachingId } = req.params;
		const teaching = await getTeachingById(teachingId);

		if (!teaching)
			throw new CustomError(
				'Seems like this course teaching does not exist.',
				404
			);

		const existingDirectory = await getDirectoryByName(name);
		if (existingDirectory)
			throw new CustomError(
				'Seems like a directory with this name already exists.',
				409
			);

		let mappedItems: DocumentProps[] = [];

		if (items && items.length > 0) {
			mappedItems = items.map((file: DocumentProps) => ({
				name: file.name,
				size: file.size,
				type: mapFileTypeToEnum(file.type) || DocumentType.PDF,
				lastModifiedDate: file.lastModifiedDate,
			}));
		}

		// let items: DocumentProps[] = [];

		// // Check if files were uploaded
		// if (req.files && (req.files as Express.Multer.File[]).length > 0) {
		// 	items = (req.files as Express.Multer.File[]).map((file) => ({
		// 		name: file.filename,
		// 		size: file.size,
		// 		type: mapFileTypeToEnum(file.mimetype),
		// 		lastModifiedDate: Date.now(),
		// 		// lastModifiedDate: file.lastModifiedDate,
		// 	}));
		// }

		const directory = await createDirectory({
			name,
			items: mappedItems,
		});

		teaching.directories.push(directory._id);
		(await teaching.save()).populate({
			path: 'directories',
			model: 'Directory',
		});

		return res
			.status(201)
			.json({ message: 'Directory created!', teaching: teaching });
	}
);

export const viewDirectory = tryCatch(
	async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
		const { teachingId, directoryId } = req.params;
		const teaching = await getTeachingById(teachingId);

		if (!teaching)
			throw new CustomError(
				'Seems like this course teaching does not exist.',
				404
			);

		const directory = await getDirectoryById(directoryId);

		if (!directory)
			throw new CustomError(
				'Seems like the teaching directory that you are trying to view does not exist.',
				404
			);

		return res.status(200).json(directory);
	}
);

export const updateDirectory = tryCatch(
	async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
		const { name } = req.body;

		if (!name) throw new CustomError('Please provide a directory name.', 400);

		const { teachingId, directoryId } = req.params;
		const teaching = await getTeachingById(teachingId);

		if (!teaching)
			throw new CustomError(
				'Seems like this course teaching does not exist.',
				404
			);

		const updatedDirectory = await updateDirectoryById(directoryId, {
			...req.body,
		});

		if (!updatedDirectory)
			throw new CustomError(
				'Seems like the directory that you are trying to update does not exist.',
				404
			);

		return res
			.status(200)
			.json({ message: 'Directory updated!', directory: updatedDirectory });
	}
);

export const deleteDirectory = tryCatch(
	async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
		const { teachingId, directoryId } = req.params;
		const teaching = await getTeachingById(teachingId);

		if (!teaching)
			throw new CustomError(
				'Seems like this course teaching does not exist.',
				404
			);

		const directoryToDelete = await deleteDirectoryById(directoryId);

		if (!directoryToDelete)
			throw new CustomError(
				'Seems like the teaching directory that you are trying to delete does not exist.',
				404
			);

		return res.status(200).json({
			message: 'Teaching directory deleted.',
			directory: directoryToDelete._id,
		});
	}
);

export const viewDirectories = tryCatch(
	async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
		const { teachingId } = req.params;
		const teaching = await getTeachingById(teachingId);

		if (!teaching)
			throw new CustomError(
				'Seems like this course teaching does not exist.',
				404
			);

		const directories = await getDirectoriesByTeachingId(teachingId);

		if (!directories)
			throw new CustomError(
				'Seems like this teaching does not have any directories.',
				404
			);

		return res.status(200).json(directories);
	}
);

export const deleteDirectories = tryCatch(
	async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
		const { teachingId } = req.params;

		const teaching = await getTeachingById(teachingId);

		if (!teaching)
			throw new CustomError(
				'Seems like this course teaching does not exist.',
				404
			);

		await deleteDirectoriesByTeachingId(teachingId);

		return res.status(200).json({ message: 'Teaching directories deleted.' });
	}
);
