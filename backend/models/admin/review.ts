import { Schema, model } from 'mongoose';

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
		start: {
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

export const getReviewByStartingDate = (startDate: Date) => Review.findOne({ startDate });
export const getReview = () => Review.findOne();
export const createReview = (values: Record<string, any>) =>
	new Review(values).save().then((review) => review.toObject());
export const updateReviewById = (id: string, values: Record<string, any>) =>
	Review.findByIdAndUpdate(id, values);
export const deleteReviewById = (id: string) => Review.findByIdAndDelete(id);
