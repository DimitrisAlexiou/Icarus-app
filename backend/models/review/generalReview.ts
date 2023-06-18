import mongoose, { Schema, model } from 'mongoose';

export interface GeneralReviewProps {
	course_opinion: string;
	instructor_opinion: string;
	likes: string;
	dislikes: string;
	user: mongoose.Types.ObjectId;
	teaching: mongoose.Types.ObjectId;
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

export const GeneralReview = model<GeneralReviewProps>('GeneralReview', generalReviewSchema);

export const getGeneralReviews = () => GeneralReview.find();
export const deleteGeneralReviews = () => GeneralReview.deleteMany();
export const getUserGeneralReviews = (userId: string) =>
	GeneralReview.find({ user: userId }).populate('teaching');
export const getGeneralReviewById = (id: string) => GeneralReview.findById(id).populate('teaching');
export const getUserSubmittedGeneralReview = (userId: string) =>
	GeneralReview.findOne({ user: userId });
export const createGeneralReview = (values: Record<string, any>) =>
	new GeneralReview(values).save().then((generalReview) => generalReview.toObject());
export const updateGeneralReviewById = (id: string, generalReview: Record<string, any>) =>
	GeneralReview.findByIdAndUpdate(id, generalReview, { new: true });
export const deleteGeneralReviewById = (id: string) => GeneralReview.findByIdAndDelete(id);
