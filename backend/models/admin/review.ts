import mongoose, { Schema, model } from 'mongoose';

export interface ReviewProps {
	period: number;
	startAfter: number;
	semester: mongoose.Types.ObjectId;
}

const reviewSchema = new Schema<ReviewProps>(
	{
		period: {
			type: Number,
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
	{ timestamps: true }
);

export const Review = model<ReviewProps>('Review', reviewSchema);

export const getReviewBySemester = (semesterId: string) =>
	Review.findOne({ semester: semesterId }).populate('semester');
export const getReview = () => Review.find();
export const createReview = (values: ReviewProps) =>
	new Review(values).save().then((review) => review.toObject());
export const updateReviewById = (id: string, review: ReviewProps) =>
	Review.findByIdAndUpdate(id, review, { new: true });
export const deleteReviewById = (id: string) => Review.findByIdAndDelete(id);
export const deleteReview = () => Review.deleteMany();
