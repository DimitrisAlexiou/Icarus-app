import { Schema, model } from 'mongoose';

export enum SemesterType {
	Winter = 'Winter',
	Spring = 'Spring',
	Any = 'Any',
}

export enum Exams {
	FEB = 'February',
	JUN = 'June',
	SEP = 'September',
}

export interface SemesterProps {
	type: SemesterType;
	academicYear: string;
	startDate?: Date;
	endDate?: Date;
	grading: number;
}

const semesterSchema = new Schema<SemesterProps>(
	{
		type: {
			type: String,
			enum: Object.values(SemesterType),
			required: true,
		},
		academicYear: {
			type: String,
			required: true,
		},
		startDate: {
			type: Date,
			required: function () {
				return this.type !== SemesterType.Any;
			},
		},
		endDate: {
			type: Date,
			required: function () {
				return this.type !== SemesterType.Any;
			},
		},
		grading: {
			type: Number,
			required: function () {
				return this.type !== SemesterType.Any;
			},
		},
	},
	{ timestamps: true }
);

export const Semester = model<SemesterProps>('Semester', semesterSchema);

export const getSemesters = () => Semester.find();
export const getSemesterById = (id: string) => Semester.findById(id);
export const getSemesterByType = (type: string) => Semester.findOne({ type });
export const getSemesterByTypeAndAcademicYear = (
	type: string,
	academicYear: string
) => Semester.findOne({ type, academicYear });
export const getCurrentSemester = (currentDate: Date) =>
	Semester.findOne({
		startDate: { $lte: currentDate },
		endDate: { $gte: currentDate },
	});
export const getPreviousSemester = (currentDate: Date) =>
	Semester.findOne({
		endDate: { $lt: currentDate },
	}).sort({ endDate: -1 });
export const createSemester = (values: SemesterProps) =>
	new Semester(values).save().then((semester) => semester.toObject());
export const updateSemesterById = (id: string, semester: SemesterProps) =>
	Semester.findByIdAndUpdate(id, semester, { new: true });
export const deleteSemesterById = (id: string) =>
	Semester.findByIdAndDelete(id);
export const deleteSemesters = () => Semester.deleteMany();
export const getTotalSemesters = () => Semester.find().countDocuments();
