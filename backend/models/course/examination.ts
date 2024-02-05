import { Schema, model } from 'mongoose';

export enum ExaminationType {
	Progress = 'Progress',
	Final = 'Final',
	Exercise = 'Exercise',
	Project = 'Project',
}

export interface ExaminationProps {
	type: ExaminationType;
	weight: number;
	lowerGradeThreshold: number;
}

const examinationSchema = new Schema<ExaminationProps>(
	{
		type: {
			type: String,
			enum: Object.values(ExaminationType),
			required: true,
		},
		weight: {
			type: Number,
			required: true,
			default: 100,
		},
		lowerGradeThreshold: {
			type: Number,
			required: true,
			default: 5,
		},
	},
	{ _id: false }
);

export const Examination = model<ExaminationProps>(
	'Examination',
	examinationSchema
);
