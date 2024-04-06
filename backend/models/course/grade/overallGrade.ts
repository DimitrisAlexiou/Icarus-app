import mongoose, { Schema, model } from 'mongoose';

export interface OverallGradeProps {
	user: mongoose.Types.ObjectId;
	teaching: mongoose.Types.ObjectId;
	statement: mongoose.Types.ObjectId;
	overallGrade: number;
	overallGradeCalculated: boolean;
}

const overallGradeSchema = new Schema<OverallGradeProps>(
	{
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
		statement: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: 'Statement',
		},
		overallGrade: {
			type: Number,
			default: 0,
			min: 0,
			max: 10,
		},
		overallGradeCalculated: {
			type: Boolean,
			default: false,
			required: true,
		},
	},
	{ timestamps: true }
);

export const OverallGrade = model<OverallGradeProps>(
	'OverallGrade',
	overallGradeSchema
);

export const addOverallGrade = (values: OverallGradeProps) =>
	new OverallGrade(values)
		.save()
		.then((overallGrade) => overallGrade.toObject());
export const deleteOverallGrades = () => OverallGrade.deleteMany();
export const getOverallGrades = () => OverallGrade.find();
export const getOverallGradeById = (id: string) =>
	OverallGrade.findById(id)
		.populate({
			path: 'user',
			populate: {
				path: 'student',
			},
		})
		.populate({
			path: 'teaching',
			populate: {
				path: 'course',
			},
		});
export const getCalculatedOverallGrade = (
	user: mongoose.Types.ObjectId,
	statement: mongoose.Types.ObjectId,
	teaching: mongoose.Types.ObjectId
) =>
	OverallGrade.findOne({
		user: user,
		statement: statement,
		teaching: teaching,
		overallGradeCalculated: true,
	});
export const deleteStudentOverallGrades = (userId: string) =>
	OverallGrade.deleteMany({
		user: userId,
	});
export const getStudentOverallGrades = (userId: string) =>
	OverallGrade.find({
		user: userId,
	})
		.populate({
			path: 'teaching',
			populate: {
				path: 'course',
			},
		})
		.populate({
			path: 'statement',
			populate: {
				path: 'semester',
			},
		});
export const getStudentOverallRecentGrades = (
	userId: string,
	statementId: string
) =>
	OverallGrade.find({
		user: userId,
		statement: statementId,
	})
		.populate({
			path: 'teaching',
			populate: [
				{
					path: 'course',
				},
				{
					path: 'theoryInstructors',
					populate: {
						path: 'user',
						select: 'name surname',
					},
				},
				{
					path: 'labInstructors',
					populate: {
						path: 'user',
						select: 'name surname',
					},
				},
			],
		})
		.populate('statement');
export const getStudentTeachingOverallGrade = (
	userId: string,
	teachingId: string
) =>
	OverallGrade.findOne({
		user: userId,
		teaching: teachingId,
	});
