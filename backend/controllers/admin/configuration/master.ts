import { Request, Response } from 'express';
import { AuthenticatedRequest } from '../../../interfaces/AuthRequest';
import { tryCatch } from '../../../utils/tryCatch';
import {
	createMasterProgram,
	deleteMasterProgramById,
	deleteMasterPrograms,
	getMasterProgramById,
	getMasterProgramByTitle,
	getMasterPrograms,
	getTotalMasterPrograms,
	updateMasterProgramById,
} from '../../../models/admin/master';
import CustomError from '../../../utils/CustomError';

export const defineMasterProgram = tryCatch(
	async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
		const { title, startDate, duration, ects } = req.body;

		if (!title || !startDate || !duration || !ects)
			throw new CustomError('Please provide the required fields.', 400);

		const existingMasterProgram = await getMasterProgramByTitle(title);
		if (existingMasterProgram) {
			throw new CustomError(
				'Seems like a master program with this title already exists.',
				409
			);
		}

		const master = await createMasterProgram({
			title,
			startDate,
			duration,
			ects,
		});

		return res.status(201).json({ message: 'Master program defined.', master });
	}
);

export const viewMasterPrograms = tryCatch(
	async (_: Request, res: Response): Promise<Response> => {
		const masterPrograms = await getMasterPrograms();
		if (!masterPrograms.length)
			throw new CustomError(
				'Seems like there are no defined master programs.',
				404
			);

		const totalMasterPrograms = await getTotalMasterPrograms();

		return res.status(200).json({ masterPrograms, totalMasterPrograms });
	}
);

export const viewMasterProgram = tryCatch(
	async (req: Request, res: Response): Promise<Response> => {
		const { id } = req.params;
		const master = await getMasterProgramById(id);

		if (!master)
			throw new CustomError(
				'Seems like the master porgram that you are trying to view does not exist.',
				404
			);

		return res.status(200).json(master);
	}
);

export const updateMasterProgram = tryCatch(
	async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
		const { title, startDate, duration, ects } = req.body;

		if (!title || !startDate || !duration || !ects)
			throw new CustomError('Please provide the master program title.', 400);

		const { id } = req.params;
		const updatedMaster = await updateMasterProgramById(id, {
			...req.body,
		});

		if (!updatedMaster)
			throw new CustomError(
				'Seems like there is no defined master program with this title.',
				404
			);

		return res
			.status(200)
			.json({ message: 'Master program updated.', updatedMaster });
	}
);

export const deleteMasterProgram = tryCatch(
	async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
		const { id } = req.params;

		const masterToDelete = await deleteMasterProgramById(id);

		if (!masterToDelete)
			throw new CustomError(
				'Seems like the master program that you are trying to delete does not exist.',
				404
			);

		return res
			.status(200)
			.json({ message: 'Master program deleted.', master: masterToDelete._id });
	}
);

export const deleteSystemMasterPrograms = tryCatch(
	async (_: AuthenticatedRequest, res: Response): Promise<Response> => {
		await deleteMasterPrograms();
		return res
			.status(200)
			.json({ message: 'Defined master programs deleted.' });
	}
);
