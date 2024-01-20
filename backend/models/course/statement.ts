import mongoose, { Schema, model } from 'mongoose';

export enum Status {
	Finalized = 'Finalized',
	Pending = 'Pending',
}

export enum Type {
	Assessment = 'Assessment',
	Vaccine = 'Vaccine',
}

export interface StatementProps {
	teaching: mongoose.Types.ObjectId[];
	user: mongoose.Types.ObjectId;
	semester: mongoose.Types.ObjectId;
	condition: Status;
	type: Type;
}

const statementSchema = new Schema<StatementProps>(
	{
		teaching: [
			{
				type: Schema.Types.ObjectId,
				required: true,
				ref: 'Teaching',
			},
		],
		user: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: 'User',
		},
		semester: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: 'Semester',
		},
		condition: {
			type: String,
			enum: Object.values(Status),
			required: true,
		},
		type: {
			type: String,
			enum: Object.values(Type),
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

export const Statement = model<StatementProps>('Statement', statementSchema);

export const getUserStatements = (userId: string) =>
	Statement.find({ user: userId })
		.populate({
			path: 'teaching',
			populate: [
				{
					path: 'course',
					populate: {
						path: 'cycle',
					},
				},
				{
					path: 'theoryInstructors',
					populate: {
						path: 'user',
						select: 'name surname',
					},
				},
			],
		})
		.populate('user')
		.populate('semester');
export const getStatementById = (id: string) =>
	Statement.findById(id)
		.populate({
			path: 'teaching',
			populate: [
				{
					path: 'course',
					populate: {
						path: 'cycle',
					},
				},
				{
					path: 'theoryInstructors',
					populate: {
						path: 'user',
						select: 'name surname',
					},
				},
			],
		})
		.populate('user semester');
export const getStatementByTeachingId = (teachingId: string) =>
	Statement.findOne({ teaching: teachingId });
export const getStatementsByTeachingId = (teachingId: string) =>
	Statement.find({ teaching: teachingId })
		.populate({
			path: 'teaching',
			populate: {
				path: 'course',
				select: 'title',
			},
		})
		.populate({
			path: 'user',
			select: 'name surname',
			populate: {
				path: 'student',
				select: 'studentId',
			},
		});
export const getUserSubmittedStatement = (
	userId: string,
	semesterId: string,
	type: string
) => Statement.findOne({ user: userId, semester: semesterId, type: type });
export const createStatement = (values: StatementProps) =>
	new Statement(values).save().then((statement) => statement.toObject());
export const updateStatementById = (id: string, values: StatementProps) =>
	Statement.findByIdAndUpdate(id, values, { new: true })
		.populate({
			path: 'teaching',
			populate: [
				{
					path: 'course',
					populate: {
						path: 'cycle',
					},
				},
				{
					path: 'theoryInstructors',
					populate: {
						path: 'user',
						select: 'name surname',
					},
				},
			],
		})
		.populate('user semester');
export const deleteStatementById = (id: string) =>
	Statement.findByIdAndDelete(id);
export const getStatements = () =>
	Statement.find()
		.populate({
			path: 'teaching',
			populate: [
				{
					path: 'course',
					populate: {
						path: 'cycle',
					},
				},
				{
					path: 'theoryInstructors',
					populate: {
						path: 'user',
						select: 'name surname',
					},
				},
			],
		})
		.populate('user')
		.populate('semester');
export const deleteStatements = () => Statement.deleteMany();
