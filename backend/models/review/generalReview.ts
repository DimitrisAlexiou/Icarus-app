import { Schema, model } from 'mongoose';
import { ReviewProps } from '../../types/ReviewProps';

export interface GeneralReviewProps extends ReviewProps {
	course_opinion: string;
	instructor_opinion: string;
	likes: string;
	dislikes: string;
}

const generalReviewSchema = new Schema<GeneralReviewProps>(
	{
		course_opinion: {
			type: String,
			required: true,
		},
		instructor_opinion: {
			type: String,
			required: true,
		},
		likes: {
			type: String,
			required: true,
		},
		dislikes: {
			type: String,
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

export const GeneralReview = model<GeneralReviewProps>(
	'GeneralReview',
	generalReviewSchema
);
