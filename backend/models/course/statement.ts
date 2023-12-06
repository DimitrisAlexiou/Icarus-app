import mongoose, { Schema, model } from 'mongoose';

export interface StatementProps {
	teaching: [mongoose.Types.ObjectId];
	user: mongoose.Types.ObjectId;
	semester: mongoose.Types.ObjectId;
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
			populate: {
				path: 'course',
			},
		})
		.populate('user')
		.populate('semester');
export const getStatementById = (id: string) => Statement.findById(id);
export const getStatementByTeachingId = (teachingId: string) =>
	Statement.findOne({ teaching: teachingId });
export const getUserSubmittedStatement = (userId: string, semesterId: string) =>
	Statement.findOne({ user: userId, semester: semesterId });
export const createStatement = (values: Record<string, any>) =>
	new Statement(values).save().then((statement) => statement.toObject());
export const updateStatementById = (id: string, values: Record<string, any>) =>
	Statement.findByIdAndUpdate(id, values, { new: true });
export const deleteStatementById = (id: string) =>
	Statement.findByIdAndDelete(id);
export const getStatements = () =>
	Statement.find()
		.populate({
			path: 'teaching',
			populate: {
				path: 'course',
			},
		})
		.populate('user')
		.populate('semester');
export const deleteStatements = () => Statement.deleteMany();
