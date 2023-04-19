import { Schema, model } from 'mongoose';

const teachingReviewSchema = new Schema(
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

export const TeachingReview = model('TeachingReview', teachingReviewSchema);

export const getTeachingReviews = () => TeachingReview.find();
export const deleteTeachingReviews = () => TeachingReview.deleteMany();
export const getUserTeachingReviews = (userId: string) => TeachingReview.find({ user: userId });
export const getUserSubmittedTeachingReview = (userId: string) =>
	TeachingReview.findOne({ user: userId });
export const getTeachingReviewById = (id: string) => TeachingReview.findById(id);
export const createTeachingReview = (values: Record<string, any>) =>
	new TeachingReview(values).save().then((teachingReview) => teachingReview.toObject());
export const updateTeachingReviewById = (id: string, values: Record<string, any>) =>
	TeachingReview.findByIdAndUpdate(id, values);
export const deleteTeachingReviewById = (id: string) => TeachingReview.findByIdAndDelete(id);
