import mongoose from 'mongoose';
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
import {
	getTeachingByDirectoryId,
	getTeachingById,
} from '../../../models/course/teaching';
import { DocumentProps } from '../../../models/course/documents/document';
import { mapFileTypeToEnum } from '../../../utils/multer/documentFileUpload';
import CustomError from '../../../utils/CustomError';

export const createTeachingDirectory = tryCatch(
	async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
		const { name } = req.body;
		const files = req.files as Express.Multer.File[];
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

		const mappedFiles: DocumentProps[] = files.map((file) => ({
			name: file.filename,
			size: file.size,
			type: mapFileTypeToEnum(file.mimetype),
			lastModifiedDate: new Date(),
		}));

		const directory = await createDirectory({
			name,
			teaching: new mongoose.Types.ObjectId(teachingId),
			files: mappedFiles,
		});

		teaching.directories.push(directory._id);
		(await teaching.save()).populate({
			path: 'directories',
			model: 'Directory',
		});

		return res.status(201).json({
			message: 'Directory created!',
			directory: directory,
		});
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

		const { directoryId } = req.params;
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
			.json({ message: 'Directory updated!', updatedDirectory });
	}
);

export const deleteDirectory = tryCatch(
	async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
		const { directoryId } = req.params;

		const directoryToDelete = await deleteDirectoryById(directoryId);
		if (!directoryToDelete)
			throw new CustomError(
				'Seems like the teaching directory that you are trying to delete does not exist.',
				404
			);

		const teaching = await getTeachingByDirectoryId(directoryId);
		if (!teaching)
			throw new CustomError(
				'Seems like the teaching associated with this directory does not exist.',
				404
			);

		teaching.directories = teaching.directories.filter(
			(dirId) => dirId.toString() !== directoryId
		);

		await teaching.save();

		return res.status(200).json({
			message: 'Teaching directory deleted.',
			directory: directoryToDelete._id,
		});
	}
);

export const viewTeachingDirectories = tryCatch(
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

export const deleteTeachingDirectories = tryCatch(
	async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
		const { teachingId } = req.params;

		const teaching = await getTeachingById(teachingId);
		if (!teaching)
			throw new CustomError(
				'Seems like this course teaching does not exist.',
				404
			);

		const directories = await getDirectoriesByTeachingId(teachingId);

		for (const directory of directories) {
			await deleteDirectoryById(directory._id.toString());
			teaching.directories = teaching.directories.filter(
				(dirId) => dirId.toString() !== directory._id.toString()
			);
		}

		await teaching.save();

		return res.status(200).json({ message: 'Teaching directories deleted.' });
	}
);
