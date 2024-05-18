import mongoose, { ClientSession } from 'mongoose';
import { AnonymizedReviewProps, ReviewProps } from '../../types/ReviewProps';

export enum ReviewType {
	Teaching = 'Teaching',
	Instructor = 'Instructor',
	General = 'General',
}

export const createReview = <T extends ReviewProps>(
	ReviewModel: mongoose.Model<T>,
	values: T
) => new ReviewModel(values).save().then((review: any) => review.toObject());

export const getReviewById = (ReviewModel: mongoose.Model<any>, id: string) =>
	ReviewModel.findById(id).populate('teaching');

export const getUserSubmittedReview = (
	ReviewModel: mongoose.Model<any>,
	userId: string,
	teachingId: string
) => ReviewModel.findOne({ user: userId, teaching: teachingId });

export const updateReviewById = <T extends ReviewProps>(
	ReviewModel: mongoose.Model<T>,
	id: string,
	review: T
) => ReviewModel.findByIdAndUpdate(id, review, { new: true });

export const deleteReviewById = (
	ReviewModel: mongoose.Model<any>,
	id: string
) => ReviewModel.findByIdAndDelete(id);

export const getUserReviews = (
	ReviewModel: mongoose.Model<any>,
	userId: string
) =>
	ReviewModel.find({ user: userId })
		.populate({
			path: 'teaching',
			populate: {
				path: 'course',
				select: 'title',
			},
		})
		.populate('user');
export const deleteUserReviews = (
	ReviewModel: mongoose.Model<any>,
	userId: string,
	session: ClientSession
) => ReviewModel.deleteMany({ user: userId }).session(session);

export const getReviews = (ReviewModel: mongoose.Model<any>) =>
	ReviewModel.find().populate({
		path: 'teaching',
		populate: {
			path: 'course',
			select: 'title',
		},
	});

export const deleteReviews = (ReviewModel: mongoose.Model<any>) =>
	ReviewModel.deleteMany();

export const getTotalReviews = (ReviewModel: mongoose.Model<any>) =>
	ReviewModel.find().countDocuments();

export const anonymizeReview = <T extends AnonymizedReviewProps>(
	review: T,
	encryptUserId: (userId: string) => string
) => {
	review.user = encryptUserId(review.user.toString());
	return review;
};

export const decryptReview = <T extends ReviewProps>(
	review: T,
	decryptHashedUserId: (hashedUserId: string) => string
) => {
	review.user = new mongoose.Types.ObjectId(
		decryptHashedUserId(review.user.toString())
	);
	return review;
};
