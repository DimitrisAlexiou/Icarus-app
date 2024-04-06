import mongoose, { Schema, model } from 'mongoose';
import { Teaching, TeachingProps } from './teaching';
import { countGradesForStatementTeachingsByInstructor } from '../../models/course/grade/grade';

export enum Status {
	Finalized = 'Finalized',
	Pending = 'Pending',
}

export enum Type {
	Assessment = 'Assessment',
	Vaccine = 'Vaccine',
}

export interface StatementProps {
	_id?: string;
	teaching: TeachingProps[];
	user: mongoose.Types.ObjectId;
	semester: mongoose.Types.ObjectId;
	condition: Status;
	type: Type;
	isGraded: boolean;
	numberOfInstructorTeachings?: number;
	numberOfInstructorGrades?: number;
	numberOfInstructorGradedGrades?: number;
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
		isGraded: {
			type: Boolean,
			required: true,
			default: false,
		},
		numberOfInstructorTeachings: {
			type: Number,
		},
		numberOfInstructorGrades: {
			type: Number,
		},
		numberOfInstructorGradedGrades: {
			type: Number,
		},
	},
	{ timestamps: true }
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
				{
					path: 'labInstructors',
					populate: {
						path: 'user',
						select: 'name surname',
					},
				},
			],
		})
		.populate('user semester');
export const getUserCurrentStatement = (userId: string, semesterId: string) =>
	Statement.findOne({ user: userId, semester: semesterId })
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
				{
					path: 'labInstructors',
					populate: {
						path: 'user',
						select: 'name surname',
					},
				},
			],
		})
		.populate('user semester');
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
				{
					path: 'labInstructors',
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
				{
					path: 'labInstructors',
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
				{
					path: 'labInstructors',
					populate: {
						path: 'user',
						select: 'name surname',
					},
				},
			],
		})
		.populate('user semester');
export const getInstructorStatements = async (
	instructorId: mongoose.Types.ObjectId
) => {
	const teachings: any = await Teaching.find({
		$or: [
			{ theoryInstructors: instructorId },
			{ labInstructors: instructorId },
		],
	});

	const teachingIds = teachings.map((teaching: any) => teaching._id);

	const statements: StatementProps[] = await Statement.find({
		teaching: { $in: teachingIds },
	})
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
				{
					path: 'labInstructors',
					populate: {
						path: 'user',
						select: 'name surname',
					},
				},
			],
		})
		.populate('user semester');

	for (const statement of statements) {
		let totalGradesToSubmit = 0;
		const numberOfInstructorTeachings = statement.teaching.reduce(
			(total: number, teaching: any) => {
				const isTheoryInstructor = teaching.theoryInstructors.some(
					(instructor: mongoose.Types.ObjectId) =>
						instructor._id.equals(instructorId)
				);
				const isLabInstructor = teaching.labInstructors.some(
					(instructor: mongoose.Types.ObjectId) =>
						instructor._id.equals(instructorId)
				);
				if (isTheoryInstructor || isLabInstructor) {
					const theoryGradesCount = isTheoryInstructor
						? teaching.theoryExamination.length
						: 0;
					const labGradesCount = isLabInstructor
						? teaching.labExamination.length
						: 0;
					totalGradesToSubmit += theoryGradesCount + labGradesCount;
				}
				return total + (isTheoryInstructor || isLabInstructor ? 1 : 0);
			},
			0
		);
		statement.numberOfInstructorTeachings = numberOfInstructorTeachings;
		statement.numberOfInstructorGrades = totalGradesToSubmit;

		const gradedGradesCount =
			await countGradesForStatementTeachingsByInstructor(
				statement._id,
				instructorId
			);
		statement.numberOfInstructorGradedGrades = gradedGradesCount;
	}

	return statements;
};
export const deleteStatements = () => Statement.deleteMany();
export const getTotalStatements = () => Statement.find().countDocuments();
export const getUserStatementsTotalTeachings = async (userId: string) => {
	const userStatements: StatementProps[] = await Statement.find({
		user: userId,
	}).populate([
		{
			path: 'teaching',
			populate: { path: 'course' },
		},
	]);

	let totalTeachings = 0;
	let totalTeachingsECTS = 0;

	userStatements.forEach((statement: any) => {
		statement.teaching.forEach((teaching: any) => {
			totalTeachings++;
			totalTeachingsECTS += teaching.course.ects;
		});
	});

	return { totalTeachings, totalTeachingsECTS };
};
