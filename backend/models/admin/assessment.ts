import { Schema, model } from 'mongoose';

export interface AssessmentProps {
	period: number;
	vaccineStartDate: Date;
	vaccineEndDate: Date;
	semester: string;
}

const assessmentSchema = new Schema(
	{
		period: {
			type: Number,
			required: true,
		},
		vaccineStartDate: {
			type: Date,
			default: Date.now,
			required: true,
		},
		vaccineEndDate: {
			type: Date,
			default: Date.now,
			required: true,
		},
		semester: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: 'Semester',
		},
	},
	{
		timestamps: true,
	}
);

export const Assessment = model('Assessment', assessmentSchema);

export const getAssessments = () => Assessment.find();
export const getAssessmentBySemester = (semesterId: string) =>
	Assessment.findOne({ semester: semesterId });
export const createAssessment = (values: Record<string, any>) =>
	new Assessment(values).save().then((assessment) => assessment.toObject());
export const updateAssessmentById = (id: string, values: Record<string, any>) =>
	Assessment.findByIdAndUpdate(id, values);
export const deleteAssessmentById = (id: string) => Assessment.findByIdAndDelete(id);
export const deleteAssessments = () => Assessment.deleteMany();
