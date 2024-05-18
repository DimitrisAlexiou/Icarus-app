import { Schema, model } from 'mongoose';
import { ReviewProps } from '../../types/ReviewProps';

export interface TeachingReviewProps extends ReviewProps {
	clear_course_objectives: number;
	course_material: number;
	course_comprehension: number;
	examination_method: number;
	course_difficulty: number;
	course_activities: number;
}

const teachingReviewSchema = new Schema<TeachingReviewProps>(
	{
		clear_course_objectives: {
			type: Number,
			required: true,
		},
		course_material: {
			type: Number,
			required: true,
		},
		course_comprehension: {
			type: Number,
			required: true,
		},
		examination_method: {
			type: Number,
			required: true,
		},
		course_difficulty: {
			type: Number,
			required: true,
		},
		course_activities: {
			type: Number,
			required: true,
		},
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
	},
	{
		timestamps: true,
	}
);

export const TeachingReview = model<TeachingReviewProps>(
	'TeachingReview',
	teachingReviewSchema
);
