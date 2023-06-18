import { Schema, model } from 'mongoose';

export interface CyclesProps {
	names: [
		{
			cycle: string;
		}
	];
}

const cyclesSchema = new Schema<CyclesProps>(
	{
		names: [
			{
				cycle: {
					type: String,
					required: true,
				},
			},
		],
	},
	{
		timestamps: true,
	}
);

export const Cycles = model<CyclesProps>('Cycles', cyclesSchema);

export const createCycles = (values: Record<string, any>) =>
	new Cycles(values).save().then((cycles) => cycles.toObject());
export const updateCyclesById = (id: string, cycles: Record<string, any>) =>
	Cycles.findByIdAndUpdate(id, cycles, { new: true });
export const getCycles = () => Cycles.findOne();
export const deleteCycles = () => Cycles.deleteOne();

// import { Schema, model } from 'mongoose';

// export interface CycleProps {
// 	name: String;
// }

// const cycleSchema = new Schema<CycleProps>({
// 	name: {
// 		type: String,
// 		required: true,
// 	},
// });

// export const Cycles = model<CycleProps>('Cycles', cycleSchema);

// export const createCycle = (cycle: CycleProps) =>
// 	new Cycles(cycle).save().then((cycle) => cycle.toObject());
// export const updateCycleById = (id: string, cycle: CycleProps) =>
// 	Cycles.findByIdAndUpdate(id, cycle);
// export const getCycleById = (id: string) => Cycles.findById(id);
// export const getCycles = () => Cycles.find();
// export const deleteCycleById = (id: string) => Cycles.findByIdAndDelete(id);
// export const deleteCycles = () => Cycles.deleteMany({});
