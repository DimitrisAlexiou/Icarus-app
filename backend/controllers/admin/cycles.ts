import { Request, Response } from 'express';
import { createCycles, updateCyclesById, deleteCycles, getCycles } from '../../models/admin/cycles';

export const defineCycles = async (req: Request, res: Response) => {
	const { names } = req.body;

	if (!names) return res.status(400).json({ message: 'Please provide the required fields.' });

	try {
		const existingCycles = await getCycles();
		if (existingCycles) {
			return res.status(400).json({ message: 'Seems like cycles are already defined.' });
		} else {
			try {
				const cycles = await createCycles({
					names,
					status: 'new',
				});
				return res.status(201).json(cycles);
			} catch (error) {
				console.error('❌ Error while defining cycles: ', error);
				return res.status(500).json({
					message: 'Something went wrong, unfortunately the cycles did not defined.',
				});
			}
		}
	} catch (error) {
		console.error('❌ Error while checking if cycles already defined: ', error);
		return res.status(500).json({
			message: 'Something went wrong, try again later!',
		});
	}
};

export const viewCycles = async (_: Request, res: Response) => {
	try {
		const cycles = await getCycles();
		if (!cycles)
			return res.status(404).json({ message: 'Seems like there are no defined cycles.' });
		else return res.status(200).json(cycles);
	} catch (error) {
		console.error('❌ Error while finding current cycles: ', error);
		return res.status(500).json({ message: 'Something went wrong, try again later.' });
	}
};

export const updateCycles = async (req: Request, res: Response) => {
	const { names } = req.body;

	if (!names) return res.status(400).json({ message: 'Please provide the required fields.' });

	try {
		const { id } = req.params;
		const updatedCycles = await updateCyclesById(id, {
			...req.body,
		});
		if (!updatedCycles)
			return res.status(404).json({ message: 'Seems like there are no defined cycles.' });
		else return res.status(200).json(updatedCycles);
	} catch (error) {
		console.error('❌ Error while updating current cycles: ', error);
		return res.status(500).json({
			message: 'Something went wrong, unfortunately the cycles did not updated.',
		});
	}
};

export const deleteAllCycles = async (_: Request, res: Response) => {
	try {
		await deleteCycles();
		return res.status(200).json({ message: 'Cycles deleted.' });
	} catch (error) {
		console.error('❌ Error while deleting cycles', error);
		return res.status(500).json({
			message: 'Something went wrong, unfortunately defined cycles did not deleted.',
		});
	}
};
