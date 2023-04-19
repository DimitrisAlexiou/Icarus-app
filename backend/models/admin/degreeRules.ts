import { Schema, model } from 'mongoose';

const degreeRulesSchema = new Schema(
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

export const DegreeRules = model('DegreeRules', degreeRulesSchema);

export const getDegreeRules = () => DegreeRules.find();
export const createDegreeRules = (values: Record<string, any>) =>
	new DegreeRules(values).save().then((degreeRules) => degreeRules.toObject());
export const updateDegreeRulesById = (id: string, values: Record<string, any>) =>
	DegreeRules.findByIdAndUpdate(id, values);
export const deleteDegreeRules = () => DegreeRules.deleteOne();
