import mongoose, { ClientSession, Schema, model } from 'mongoose';

export interface InstructorReviewProps {
	good_organization: number;
	clear_comprehensive_answers: number;
	student_participation: number;
	course_consistency: number;
	instructor_approachable: number;
	user: mongoose.Types.ObjectId;
	teaching: mongoose.Types.ObjectId;
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

export const createInstructorReview = (values: InstructorReviewProps) =>
	new InstructorReview(values)
		.save()
		.then((instructorReview) => instructorReview.toObject());
export const getInstructorReviewById = (id: string) =>
	InstructorReview.findById(id).populate('teaching');
export const getUserSubmittedInstructorReview = (
	userId: string,
	teachingId: string
) => InstructorReview.findOne({ user: userId, teaching: teachingId });
export const updateInstructorReviewById = (
	id: string,
	instructorReview: InstructorReviewProps
) => InstructorReview.findByIdAndUpdate(id, instructorReview, { new: true });
export const deleteInstructorReviewById = (id: string) =>
	InstructorReview.findByIdAndDelete(id);
export const getUserInstructorReviews = (userId: string) =>
	InstructorReview.find({ user: userId })
		.populate({
			path: 'teaching',
			populate: {
				path: 'course',
				select: 'title',
			},
		})
		.populate('user');
export const deleteUserInstructorReviews = (
	userId: string,
	session: ClientSession
) => InstructorReview.deleteMany({ user: userId }).session(session);
export const getInstructorReviews = () => InstructorReview.find();
export const deleteInstructorReviews = () => InstructorReview.deleteMany();
