import mongoose, { Schema, model } from 'mongoose';
import { getStatementById } from '../statement';
import { TeachingProps } from '../teaching';

export enum Examination {
	Theory = 'Theory',
	Lab = 'Lab',
}

interface ExamType {
	type: string;
	examination: Examination;
	grade: number;
	examId: mongoose.Types.ObjectId;
}

interface Statement {
	_id: mongoose.Types.ObjectId;
	user?: {
		_id: mongoose.Types.ObjectId;
		student: mongoose.Types.ObjectId;
	};
	semester?: {
		_id: mongoose.Types.ObjectId;
	};
}

export interface GradeProps {
	exam: ExamType;
	isFinalized: boolean;
	teaching: mongoose.Types.ObjectId;
	user: mongoose.Types.ObjectId;
	statement: Statement;
}

const gradeSchema = new Schema<GradeProps>(
	{
		exam: {
			type: {
				type: String,
				required: true,
			},
			examination: {
				type: String,
				enum: Object.values(Examination),
				required: true,
			},
			examId: {
				type: Schema.Types.ObjectId,
				required: true,
				ref: 'Examination',
			},
			grade: {
				type: Number,
				min: 0,
				max: 10,
				required: true,
			},
		},
		isFinalized: {
			type: Boolean,
			default: false,
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
		user: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: 'User',
		},
	},
	{ timestamps: true }
);

export const Grade = model<GradeProps>('Grade', gradeSchema);

export const getGrades = () =>
	Grade.find()
		.populate({
			path: 'user',
			populate: {
				path: 'instructor',
			},
		})
		.populate('teaching statement');
export const getRecentGrades = (userId: string) =>
	Grade.find({ user: userId })
		.sort({ updatedAt: -1, createdAt: -1 })
		.limit(15)
		.populate({
			path: 'teaching',
			populate: {
				path: 'course',
			},
		});
export const getStudentRecentGrades = (statementId: string) =>
	Grade.find({ statement: statementId })
		.sort({ updatedAt: -1, createdAt: -1 })
		.limit(15)
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
export const getStudentTeachingGrades = (
	teachingId: string,
	statementId: mongoose.Types.ObjectId
) =>
	Grade.find({
		teaching: teachingId,
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
export const getGradesByTeachingInStatement = (
	teachingId: mongoose.Types.ObjectId,
	statementId: mongoose.Types.ObjectId
) =>
	Grade.find({
		teaching: teachingId,
		statement: statementId,
	}).populate('teaching statement');
export const getGradesByStatementTeachings = (
	statementId: string,
	teachings: TeachingProps[]
) =>
	Grade.find({
		statement: statementId,
		teaching: { $in: teachings.map((teaching) => teaching._id) },
	})
		.populate({
			path: 'statement',
			populate: {
				path: 'user',
			},
		})
		.populate('teaching');
export const getTeachingGrades = (statementId: string) =>
	Grade.find({
		statement: statementId,
	})
		.populate({
			path: 'user',
			populate: {
				path: 'instructor',
			},
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
				path: 'user semester',
			},
		});
export const getGradeById = (id: string) =>
	Grade.findById(id)
		.populate({
			path: 'user',
			populate: {
				path: 'instructor',
			},
		})
		.populate('teaching statement');
export const getSubmittedGrade = (
	examType: string,
	examination: string,
	examId: mongoose.Types.ObjectId,
	teachingId: string,
	statementId: string
) =>
	Grade.findOne({
		'exam.type': examType,
		'exam.examination': examination,
		'exam.examId': examId,
		teaching: teachingId,
		statement: statementId,
	}).populate('teaching statement');
export const addGrade = (values: GradeProps) =>
	new Grade(values).save().then((grade) => grade.toObject());
export const updateGradeById = (id: string, values: GradeProps) =>
	Grade.findByIdAndUpdate(id, values, { new: true })
		.populate({
			path: 'user',
			populate: {
				path: 'instructor',
			},
		})
		.populate({
			path: 'statement',
			populate: {
				path: 'user',
			},
		})
		.populate('teaching');
export const deleteGradeById = (id: string) => Grade.findByIdAndDelete(id);
export const deleteGrades = () => Grade.deleteMany();
export const countGradesForStatementTeachingsByInstructor = async (
	statementId: string,
	instructorId: mongoose.Types.ObjectId
) => {
	const statement = await getStatementById(statementId);
	if (!statement) return 0;

	const gradedGradesCount = await Promise.all(
		statement.teaching.map(async (teaching) => {
			let count = 0;
			if (
				teaching.theoryInstructors.some((instr) =>
					instr._id.equals(instructorId)
				)
			) {
				const theoryGrades = await Grade.countDocuments({
					statement: statementId,
					teaching: teaching._id,
					'exam.examination': Examination.Theory,
				});
				count += theoryGrades;
			}
			if (
				teaching.labInstructors.some((instr) => instr._id.equals(instructorId))
			) {
				const labGrades = await Grade.countDocuments({
					statement: statementId,
					teaching: teaching._id,
					'exam.examination': Examination.Lab,
				});
				count += labGrades;
			}
			return count;
		})
	);

	const totalGradedGradesCount = gradedGradesCount.reduce(
		(total, count) => total + count,
		0
	);

	return totalGradedGradesCount;
};
