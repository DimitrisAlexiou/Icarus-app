import { Request, Response } from 'express';
import { createCycles, updateCyclesById, deleteCycles, getCycles } from '../../models/admin/cycles';
import { tryCatch } from '../../utils/tryCatch';
import CustomError from '../../utils/CustomError';

export const defineCycles = tryCatch(async (req: Request, res: Response) => {
	const { names } = req.body;

	if (!names) throw new CustomError('Please fill in all the required fields.', 400);

	const existingCycles = await getCycles();
	if (existingCycles) throw new CustomError('Seems like cycles are already defined.', 400);

	const cycles = await createCycles({
		names,
		status: 'new',
	});

	// const cycles = await Promise.all(
	// 	names.map(async (name: string) => {
	// 		const cycleData = {
	// 			name,
	// 		};
	// 		const cycle = await createCycle(cycleData);
	// 		return cycle;
	// 	})
	// );

	return res.status(201).json(cycles);
});

export const viewCycles = tryCatch(async (_: Request, res: Response) => {
	const cycles = await getCycles();
	if (!cycles) throw new CustomError('Seems like there are no defined cycles.', 404);

	return res.status(200).json(cycles);
});

export const updateCycles = tryCatch(async (req: Request, res: Response) => {
	const { names } = req.body;

	if (!names) throw new CustomError('Please fill in all the required fields.', 400);

	const { id } = req.params;
	const updatedCycles = await updateCyclesById(id, {
		...req.body,
	});
	if (!updatedCycles) throw new CustomError('Seems like there are no defined cycles.', 404);

	return res.status(200).json(updatedCycles);
});

export const deleteAllCycles = tryCatch(async (_: Request, res: Response) => {
	await deleteCycles();
	return res.status(200).json({ message: 'Defined cycles deleted.' });
});
