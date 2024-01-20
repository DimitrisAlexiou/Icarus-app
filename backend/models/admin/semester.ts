import { Schema, model } from 'mongoose';
import CustomError from '../../utils/CustomError';

export enum SemesterType {
	Winter = 'Winter',
	Spring = 'Spring',
	Any = 'Any',
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
	{
		timestamps: true,
	}
);

export const Semester = model<SemesterProps>('Semester', semesterSchema);

export const getSemesters = () => Semester.find();
export const getSemesterById = (id: string) => Semester.findById(id);
export const getSemesterByType = (type: string) => Semester.findOne({ type });
export const getSemesterByTypeAndAcademicYear = (
	type: string,
	academicYear: string
) => Semester.findOne({ type, academicYear });
export const getCurrentSemester = async (currentDate: Date) => {
	const semesters = await Semester.find();

	for (const semester of semesters) {
		const startDate = new Date(semester.startDate);
		const endDate = new Date(semester.endDate);

		if (currentDate >= startDate && currentDate <= endDate) return semester;
	}

	throw new CustomError(
		'No active semester defined for the current period.',
		404
	);
};
export const createSemester = (values: SemesterProps) =>
	new Semester(values).save().then((semester) => semester.toObject());
export const updateSemesterById = (id: string, semester: SemesterProps) =>
	Semester.findByIdAndUpdate(id, semester, { new: true });
export const deleteSemesterById = (id: string) =>
	Semester.findByIdAndDelete(id);
export const deleteSemesters = () => Semester.deleteMany();
