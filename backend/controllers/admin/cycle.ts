import { Request, Response } from 'express';
import {
	createCycle,
	updateCycleById,
	getCycles,
	getCycleByName,
	getCycleById,
	deleteCycleById,
	deleteCycles,
} from '../../models/admin/cycle';
import { getTeachingsByCycleId } from '../../models/course/teaching';
import { cycleSchema } from '../../utils/schemas';
import { tryCatch } from '../../utils/tryCatch';
import CustomError from '../../utils/CustomError';

export const defineCycle = tryCatch(
	async (req: Request, res: Response): Promise<Response> => {
		const { cycle } = req.body;

		if (!cycle)
			throw new CustomError('Please provide at least one cycle.', 400);

		const validatedCycles = await Promise.all(
			cycle.map(async (cycle: string) => {
				const { error, value } = cycleSchema.validate({ cycle: cycle });
				if (error) {
					console.error('❌ Cycle schema validation: ', error);
					throw new CustomError(error.message, 400);
				}
				return value.cycle;
			})
		);

		const existingCycles = await Promise.all(
			validatedCycles.map(async (cycle: string) => getCycleByName(cycle))
		);

		const existingCycle = existingCycles
			.filter((cycle) => cycle !== null)
			.map((cycle) => cycle.cycle);

		if (existingCycle.length > 0) {
			throw new CustomError(
				`The following cycles are already defined: ${existingCycle.join(
					', '
				)}.`,
				400
			);
		}

		const cycles = await createCycle(validatedCycles);

		return res.status(201).json({ message: 'Cycles defined.', cycles });
	}
);

export const viewCycles = tryCatch(
	async (_: Request, res: Response): Promise<Response> => {
		const cycles = await getCycles();
		if (!cycles.length)
			throw new CustomError('Seems like there are no defined cycles.', 404);

		return res.status(200).json(cycles);
	}
);

export const viewCycle = tryCatch(
	async (req: Request, res: Response): Promise<Response> => {
		const { id } = req.params;
		const cycle = await getCycleById(id);

		if (!cycle)
			throw new CustomError(
				'Seems like the cycle that you are trying to view does not exist.',
				404
			);

		return res.status(200).json(cycle);
	}
);

export const updateCycle = tryCatch(
	async (req: Request, res: Response): Promise<Response> => {
		const { cycle } = req.body;

		if (!cycle) throw new CustomError('Please provide the cycle name.', 400);

		const { id } = req.params;
		const updatedCycle = await updateCycleById(id, {
			...req.body,
		});
		if (!updatedCycle)
			throw new CustomError(
				'Seems like there is no defined cycle with this name.',
				404
			);

		return res.status(200).json({ message: 'Cycle updated.', updatedCycle });
	}
);

export const deleteCycle = tryCatch(
	async (req: Request, res: Response): Promise<Response> => {
		const { id } = req.params;

		// const teachings = await getTeachingsByCycleId(id);
		// console.log(teachings);

		// if (teachings && teachings.length)
		// 	throw new CustomError(
		// 		'This cycle cannot be deleted because it has at least one active teaching.',
		// 		400
		// 	);

		const cycleToDelete = await deleteCycleById(id);

		if (!cycleToDelete)
			throw new CustomError(
				'Seems like the cycle that you are trying to delete does not exist.',
				404
			);

		return res
			.status(200)
			.json({ message: 'Cycle deleted.', cycle: cycleToDelete._id });
	}
);

export const deleteSystemCycles = tryCatch(
	async (_: Request, res: Response): Promise<Response> => {
		await deleteCycles();
		return res.status(200).json({ message: 'Defined cycles deleted.' });
	}
);
