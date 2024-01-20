import { Response } from 'express';
import { AuthenticatedRequest } from '../../../interfaces/AuthRequest';
import { tryCatch } from '../../../utils/tryCatch';
import {
	createdirectory,
	deleteDirectoriesByTeachingId,
	deleteDirectoryById,
	getDirectoriesByTeachingId,
	getDirectoryById,
	updateDirectoryById,
} from '../../../models/course/documents/directory';
import { getTeachingById } from '../../../models/course/teaching';
import CustomError from '../../../utils/CustomError';

export const createDirectory = tryCatch(
	async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
		const { name } = req.body;
		if (!name) throw new CustomError('Please provide a directory name.', 400);

		const { id } = req.params;
		const teaching = await getTeachingById(id);

		if (!teaching)
			throw new CustomError(
				'Seems like this course teaching does not exist.',
				404
			);

		const directory = await createdirectory({
			name,
			teaching: teaching._id,
			status: 'new',
		});

		teaching.directories.push(directory._id);
		await teaching.save();

		return res.status(201).json({ message: 'Directory created!', teaching });
	}
);

export const viewDirectory = tryCatch(
	async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
		const { id } = req.params;
		const directory = await getDirectoryById(id);

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

		const { id } = req.params;
		const updatedDirectory = await updateDirectoryById(id, { ...req.body });

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
		const { id } = req.params;
		const directoryToDelete = await deleteDirectoryById(id);

		if (!directoryToDelete)
			throw new CustomError(
				'Seems like the teaching directory that you are trying to delete does not exist.',
				404
			);

		return res
			.status(200)
			.json({
				message: 'Teaching directory deleted.',
				directory: directoryToDelete._id,
			});
	}
);

export const viewDirectories = tryCatch(
	async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
		const { id } = req.params;
		const teaching = await getTeachingById(id);

		if (!teaching)
			throw new CustomError(
				'Seems like this course teaching does not exist.',
				404
			);

		const directories = await getDirectoriesByTeachingId(id);

		if (!directories)
			throw new CustomError(
				'Seems like the teaching does not have any directories.',
				404
			);

		return res.status(200).json(directories);
	}
);

export const deleteTeachingDirectories = tryCatch(
	async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
		const { id } = req.params;

		const teaching = await getTeachingById(id);

		if (!teaching)
			throw new CustomError(
				'Seems like this course teaching does not exist.',
				404
			);

		await deleteDirectoriesByTeachingId(id);

		return res.status(200).json({ message: 'Teaching directories deleted.' });
	}
);
