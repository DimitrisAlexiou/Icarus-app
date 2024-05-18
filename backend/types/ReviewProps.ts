import mongoose from 'mongoose';

export interface ReviewProps {
	user: mongoose.Types.ObjectId;
	teaching: mongoose.Types.ObjectId;
}

export interface AnonymizedReviewProps extends Omit<ReviewProps, 'user'> {
	user: string;
}
