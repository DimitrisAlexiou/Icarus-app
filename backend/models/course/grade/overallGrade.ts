import mongoose, { Schema, model } from 'mongoose';

export interface OverallGradeProps {
	user: mongoose.Types.ObjectId;
	teaching: mongoose.Types.ObjectId;
	overallGrade: number;
}

const overallGradeSchema = new Schema<OverallGradeProps>(
	{
		user: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: 'User',
		},
		teaching: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: 'Teaching',
		},
		overallGrade: {
			type: Number,
			default: 0,
			min: 0,
			max: 10,
		},
	},
	{ timestamps: true }
);

export const OverallGrade = model<OverallGradeProps>(
	'OverallGrade',
	overallGradeSchema
);
