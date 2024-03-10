import mongoose, { Schema, model } from 'mongoose';
import { getStatementById } from '../statement';
import { TeachingProps } from '../teaching';

enum Examination {
	Theory = 'Theory',
	Lab = 'Lab',
}

interface ExamType {
	type: string;
	examination: Examination;
	grade: number;
}

export interface GradeProps {
	exam: ExamType;
	isFinalized: boolean;
	teaching: mongoose.Types.ObjectId;
	user: mongoose.Types.ObjectId;
	statement: mongoose.Types.ObjectId;
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
		.populate('teaching statement');
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
	teachingId: string,
	statementId: string
) =>
	Grade.findOne({
		'exam.type': examType,
		'exam.examination': examination,
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
		.populate('teaching statement');
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
export const getGradesByStatementTeachings = (
	statementId: string,
	teachings: TeachingProps[]
) =>
	Grade.find({
		statement: statementId,
		teaching: { $in: teachings.map((teaching) => teaching._id) },
	});
