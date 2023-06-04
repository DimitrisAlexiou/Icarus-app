import { Schema, model } from 'mongoose';

export interface ReviewProps {
	startDate: Date;
	endDate: Date;
	startAfter: number;
	semester: string;
}

const reviewSchema = new Schema(
	{
		startDate: {
			type: Date,
			default: Date.now,
			required: true,
		},
		endDate: {
			type: Date,
			default: Date.now,
			required: true,
		},
		startAfter: {
			type: Number,
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

export const Review = model('Review', reviewSchema);

export const getReviewBySemester = (semesterId: string) => Review.findOne({ semester: semesterId });
export const getReview = () => Review.find();
export const createReview = (values: Record<string, any>) =>
	new Review(values).save().then((review) => review.toObject());
export const updateReviewById = (id: string, values: Record<string, any>) =>
	Review.findByIdAndUpdate(id, values);
export const deleteReviewById = (id: string) => Review.findByIdAndDelete(id);
export const deleteReview = () => Review.deleteMany();
