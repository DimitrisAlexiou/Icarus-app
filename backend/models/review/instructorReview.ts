import { Schema, model } from 'mongoose';
import { ReviewProps } from '../../types/ReviewProps';

export interface InstructorReviewProps extends ReviewProps {
	good_organization: number;
	clear_comprehensive_answers: number;
	student_participation: number;
	course_consistency: number;
	instructor_approachable: number;
}

const instructorReviewSchema = new Schema<InstructorReviewProps>(
	{
		good_organization: {
			type: Number,
			required: true,
		},
		clear_comprehensive_answers: {
			type: Number,
			required: true,
		},
		student_participation: {
			type: Number,
			required: true,
		},
		course_consistency: {
			type: Number,
			required: true,
		},
		instructor_approachable: {
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

export const InstructorReview = model<InstructorReviewProps>(
	'InstructorReview',
	instructorReviewSchema
);
