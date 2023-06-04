import { Schema, model } from 'mongoose';

export interface InstructorReviewProps {
	good_organization: number;
	clear_comprehensive_answers: number;
	student_participation: number;
	course_consistency: number;
	instructor_approachable: number;
	user: string;
	teaching: string;
}

const instructorReviewSchema = new Schema(
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

export const InstructorReview = model('InstructorReview', instructorReviewSchema);

export const getInstructorReviews = () => InstructorReview.find();
export const deleteInstructorReviews = () => InstructorReview.deleteMany();
export const getUserInstructorReviews = (userId: string) => InstructorReview.find({ user: userId });
export const getUserSubmittedInstructorReview = (userId: string) =>
	InstructorReview.findOne({ user: userId });
export const getInstructorReviewById = (id: string) => InstructorReview.findById(id);
export const createInstructorReview = (values: Record<string, any>) =>
	new InstructorReview(values).save().then((instructorReview) => instructorReview.toObject());
export const updateInstructorReviewById = (id: string, values: Record<string, any>) =>
	InstructorReview.findByIdAndUpdate(id, values);
export const deleteInstructorReviewById = (id: string) => InstructorReview.findByIdAndDelete(id);
