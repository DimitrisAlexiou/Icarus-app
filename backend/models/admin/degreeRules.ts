import { Schema, model } from 'mongoose';

export interface DegreeRulesProps {
	cycles: number;
	cycleCourses: number;
	courses: number;
	practice: boolean;
}

const degreeRulesSchema = new Schema<DegreeRulesProps>(
	{
		cycles: {
			type: Number,
			required: true,
		},
		cycleCourses: {
			type: Number,
			required: true,
		},
		courses: {
			type: Number,
			required: true,
		},
		practice: {
			type: Boolean,
			required: true,
			default: false,
		},
	},
	{
		timestamps: true,
	}
);

export const DegreeRules = model<DegreeRulesProps>('DegreeRules', degreeRulesSchema);

export const getDegreeRules = () => DegreeRules.findOne();
export const createDegreeRules = (values: Record<string, any>) =>
	new DegreeRules(values).save().then((degreeRules) => degreeRules.toObject());
export const updateDegreeRulesById = (id: string, degreeRules: Record<string, any>) =>
	DegreeRules.findByIdAndUpdate(id, degreeRules, { new: true });
export const deleteDegreeRules = () => DegreeRules.deleteOne();
