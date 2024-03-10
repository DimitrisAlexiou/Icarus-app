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

export const examinationSchema = new Schema<ExaminationProps>(
	{
		type: {
			type: String,
			enum: Object.values(ExaminationType),
			required: true,
		},
		weight: {
			type: Number,
			default: 100,
			required: true,
		},
		lowerGradeThreshold: {
			type: Number,
			default: 5,
			required: true,
		},
	},
	{ _id: false }
);

export const Examination = model<ExaminationProps>(
	'Examination',
	examinationSchema
);
