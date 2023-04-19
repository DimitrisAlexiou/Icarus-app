import { Schema, model } from 'mongoose';

const cyclesSchema = new Schema({
	names: [
		{
			cycle: {
				type: String,
				required: true,
			},
		},
	],
});

export const Cycles = model('Cycles', cyclesSchema);

export const createCycles = (values: Record<string, any>) =>
	new Cycles(values).save().then((cycles) => cycles.toObject());
export const updateCyclesById = (id: string, values: Record<string, any>) =>
	Cycles.findByIdAndUpdate(id, values);
export const getCycles = () => Cycles.findOne();
export const deleteCycles = () => Cycles.deleteOne();
