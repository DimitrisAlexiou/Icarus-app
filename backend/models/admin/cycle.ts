import { Schema, model } from 'mongoose';

export interface CycleProps {
	cycle: String;
}

const cycleSchema = new Schema(
	{
		cycle: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

export const Cycle = model<CycleProps>('Cycle', cycleSchema);

export const createCycle = async (cycles: string[]) => {
	const cyclesToInsert = cycles.map((name) => ({ cycle: name }));

	try {
		const insertedCycles = await Cycle.insertMany(cyclesToInsert);
		return insertedCycles.map((cycle) => cycle.toObject());
	} catch (error) {
		console.error('Error inserting cycles: ', error);
		throw error;
	}
};
export const updateCycleById = (id: string, cycle: CycleProps) =>
	Cycle.findByIdAndUpdate(id, cycle, { new: true });
export const getCycleById = (id: string) => Cycle.findById(id);
export const getCycleByName = (cycle: string) => Cycle.findOne({ cycle });
export const getCycles = () => Cycle.find();
export const deleteCycleById = (id: string) => Cycle.findByIdAndDelete(id);
export const deleteCycles = () => Cycle.deleteMany({});
