import mongoose, { ClientSession, Schema, model } from 'mongoose';

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

export const GeneralReview = model<GeneralReviewProps>(
	'GeneralReview',
	generalReviewSchema
);

export const createGeneralReview = (values: GeneralReviewProps) =>
	new GeneralReview(values)
		.save()
		.then((generalReview) => generalReview.toObject());
export const getGeneralReviewById = (id: string) =>
	GeneralReview.findById(id).populate('teaching');
export const getUserSubmittedGeneralReview = (
	userId: string,
	teachingId: string
) => GeneralReview.findOne({ user: userId, teaching: teachingId });
export const updateGeneralReviewById = (
	id: string,
	generalReview: GeneralReviewProps
) => GeneralReview.findByIdAndUpdate(id, generalReview, { new: true });
export const deleteGeneralReviewById = (id: string) =>
	GeneralReview.findByIdAndDelete(id);
export const getUserGeneralReviews = (userId: string) =>
	GeneralReview.find({ user: userId })
		.populate({
			path: 'teaching',
			populate: {
				path: 'course',
				select: 'title',
			},
		})
		.populate('user');
export const deleteUserGeneralReviews = (
	userId: string,
	session: ClientSession
) => GeneralReview.deleteMany({ user: userId }).session(session);
export const getGeneralReviews = () => GeneralReview.find();
export const deleteGeneralReviews = () => GeneralReview.deleteMany();
export const getTotalGeneralReviews = () =>
	GeneralReview.find().countDocuments();
