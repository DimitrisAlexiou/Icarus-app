import mongoose, { ClientSession, Schema, model } from 'mongoose';
import { INSTRUCTOR } from '../../utils/constants';

export enum ExaminationType {
	Progress = 'Progress',
	Final = 'Final',
	Exercise = 'Exercise',
	Project = 'Project',
}

interface Examination {
	type: ExaminationType;
	weight: number;
	lowerGradeThreshold: number;
}

export interface TeachingProps {
	labWeight: number;
	theoryWeight: number;
	theoryGradeRetentionYears: number;
	labGradeRetentionYears: number;
	theoryGradeThreshold: number;
	labGradeThreshold: number;
	books?: string[];
	course: mongoose.Types.ObjectId;
	semester: mongoose.Types.ObjectId;
	theoryInstructors?: mongoose.Types.ObjectId[];
	labInstructors?: mongoose.Types.ObjectId[];
	theoryExamination?: Examination[];
	labExamination?: Examination[];
	directories: mongoose.Types.ObjectId[];
}

const examinationSchema = new Schema<Examination>(
	{
		type: {
			type: String,
			enum: Object.values(ExaminationType),
			required: true,
		},
		weight: {
			type: Number,
			required: true,
			default: 100,
		},
		lowerGradeThreshold: {
			type: Number,
			required: true,
			default: 5,
		},
	},
	{ _id: false }
);

const teachingSchema = new Schema<TeachingProps>(
	{
		theoryWeight: {
			type: Number,
			required: true,
			default: 100,
		},
		labWeight: {
			type: Number,
			required: true,
			default: 0,
		},
		theoryGradeRetentionYears: {
			type: Number,
			required: true,
			default: 4,
		},
		labGradeRetentionYears: {
			type: Number,
			required: true,
			default: 0,
		},
		theoryGradeThreshold: {
			type: Number,
			required: true,
			default: 5,
		},
		labGradeThreshold: {
			type: Number,
			required: true,
			default: 0,
		},
		books: [
			{
				type: String,
			},
		],
		course: {
			type: Schema.Types.ObjectId,
			ref: 'Course',
			required: true,
		},
		semester: {
			type: Schema.Types.ObjectId,
			ref: 'Semester',
			required: true,
		},
		theoryInstructors: [
			{
				type: Schema.Types.ObjectId,
				ref: INSTRUCTOR,
			},
		],
		labInstructors: [
			{
				type: Schema.Types.ObjectId,
				ref: INSTRUCTOR,
			},
		],
		theoryExamination: [examinationSchema],
		labExamination: [examinationSchema],
		directories: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Directory',
				required: true,
			},
		],
	},
	{
		timestamps: true,
	}
);

teachingSchema.methods.isTheoryGradeValid = function () {
	const currentYear = new Date().getFullYear();
	const teachingYear = new Date(this.createdAt).getFullYear();
	const yearsPassed = currentYear - teachingYear;
	return yearsPassed <= this.theoryGradeRetentionYears;
};

teachingSchema.methods.isLabGradeValid = function () {
	const currentYear = new Date().getFullYear();
	const teachingYear = new Date(this.createdAt).getFullYear();
	const yearsPassed = currentYear - teachingYear;
	return yearsPassed <= this.labGradeRetentionYears;
};

export const Teaching = model<TeachingProps>('Teaching', teachingSchema);

export const getTeachings = () =>
	Teaching.find()
		.populate('semester')
		.populate({
			path: 'course',
			populate: {
				path: 'cycle',
			},
		})
		.populate({
			path: 'theoryInstructors',
			populate: {
				path: 'user',
				select: 'surname',
			},
		})
		.populate({
			path: 'labInstructors',
			populate: {
				path: 'user',
				select: 'surname',
			},
		});
export const getTeachingById = (id: string) =>
	Teaching.findById(id)
		.populate('semester')
		.populate({
			path: 'course',
			populate: {
				path: 'cycle',
			},
		})
		.populate({
			path: 'theoryInstructors',
			populate: {
				path: 'user',
				select: 'surname',
			},
		})
		.populate({
			path: 'labInstructors',
			populate: {
				path: 'user',
				select: 'surname',
			},
		});
export const getTeachingByCourseId = (id: string) =>
	Teaching.findOne({ course: id })
		.populate('semester')
		.populate({
			path: 'course',
			populate: {
				path: 'cycle',
			},
		})
		.populate({
			path: 'theoryInstructors',
			populate: {
				path: 'user',
				select: 'surname',
			},
		})
		.populate({
			path: 'labInstructors',
			populate: {
				path: 'user',
				select: 'surname',
			},
		});
//TODO: make this work, it should return all teachings for a cycle
export const getTeachingsByCycleId = (id: string) =>
	Teaching.find({
		'course.cycle': new mongoose.Types.ObjectId(id),
	});
export const getActiveTeachingsBySemesterId = (semesterId: string) =>
	Teaching.find({ semester: semesterId });
export const createTeaching = (
	teaching: Record<string, any>,
	options?: Record<string, any>
) => new Teaching(teaching).save().then((teaching) => teaching.toObject());
export const updateTeachingById = (id: string, teaching: TeachingProps) =>
	Teaching.findByIdAndUpdate(id, teaching, { new: true })
		.populate('semester')
		.populate({
			path: 'course',
			populate: {
				path: 'cycle',
			},
		})
		.populate({
			path: 'theoryInstructors',
			populate: {
				path: 'user',
				select: 'surname',
			},
		})
		.populate({
			path: 'labInstructors',
			populate: {
				path: 'user',
				select: 'surname',
			},
		});
export const deleteTeachingById = (id: string) =>
	Teaching.findByIdAndDelete(id);
export const deleteTeachingByCourseId = (
	courseId: string,
	session: ClientSession
) => Teaching.findOneAndDelete({ course: courseId }).session(session);
export const deleteTeachings = () => Teaching.deleteMany();
export const assignTheoryInstructors = (
	id: string,
	instructors: mongoose.Types.ObjectId[]
) =>
	Teaching.findByIdAndUpdate(
		id,
		{ theoryInstructors: instructors },
		{ new: true }
	).populate({
		path: 'theoryInstructors',
		populate: {
			path: 'user',
			select: 'surname',
		},
	});
export const assignLabInstructors = (
	id: string,
	instructors: mongoose.Types.ObjectId[]
) =>
	Teaching.findByIdAndUpdate(
		id,
		{ labInstructors: instructors },
		{ new: true }
	).populate({
		path: 'labInstructors',
		populate: {
			path: 'user',
			select: 'surname',
		},
	});

export const unassignTheoryInstructors = (id: string) =>
	Teaching.findByIdAndUpdate(id, { theoryInstructors: [] }, { new: true });
export const unassignLabInstructors = (id: string) =>
	Teaching.findByIdAndUpdate(id, { labInstructors: [] }, { new: true });
export const assignTheoryGrading = (id: string, examinations: Examination[]) =>
	Teaching.findByIdAndUpdate(
		id,
		{ theoryExamination: examinations },
		{ new: true }
	);
export const assignLabGrading = (id: string, examinations: Examination[]) =>
	Teaching.findByIdAndUpdate(
		id,
		{ labExamination: examinations },
		{ new: true }
	);
export const unassignTheoryGrading = (id: string) =>
	Teaching.findByIdAndUpdate(id, { theoryExamination: [] }, { new: true });
export const unassignLabGrading = (id: string) =>
	Teaching.findByIdAndUpdate(id, { labExamination: [] }, { new: true });
