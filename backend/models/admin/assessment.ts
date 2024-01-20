import mongoose, { Schema, model } from 'mongoose';

export interface AssessmentProps {
	period: number;
	vaccineStartDate: Date;
	vaccineEndDate: Date;
	semester: mongoose.Types.ObjectId;
}

const assessmentSchema = new Schema<AssessmentProps>(
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

export const Assessment = model<AssessmentProps>(
	'Assessment',
	assessmentSchema
);

export const getAssessments = () => Assessment.find();
export const getAssessmentBySemester = (semesterId: string) =>
	Assessment.findOne({ semester: semesterId }).populate('semester');
export const createAssessment = (values: AssessmentProps) =>
	new Assessment(values).save().then((assessment) => assessment.toObject());
export const updateAssessmentById = (id: string, assessment: AssessmentProps) =>
	Assessment.findByIdAndUpdate(id, assessment, { new: true });
export const deleteAssessmentById = (id: string) =>
	Assessment.findByIdAndDelete(id);
export const deleteAssessments = () => Assessment.deleteMany();
