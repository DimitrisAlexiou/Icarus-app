import { Schema, model } from 'mongoose';

export interface SemesterProps {
	type: string;
	startDate: Date;
	endDate: Date;
	grading: number;
}

const semesterSchema = new Schema(
	{
		type: {
			type: String,
			enum: ['Winter', 'Spring', 'Any'],
			required: true,
		},
		startDate: {
			type: Date,
			default: Date.now,
			required: true,
		},
		endDate: {
			type: Date,
			default: Date.now,
			required: true,
		},
		grading: {
			type: Number,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

export const Semester = model('Semester', semesterSchema);

export const getSemesters = () => Semester.find();
export const getSemesterByType = (type: string) => Semester.findOne({ type });
export const getCurrentSemester = (currentDate: Date) =>
	Semester.findOne({ startDate: { $lte: currentDate }, endDate: { $gte: currentDate } });
export const createSemester = (values: Record<string, any>) =>
	new Semester(values).save().then((semester) => semester.toObject());
export const updateSemesterById = (id: string, values: Record<string, any>) =>
	Semester.findByIdAndUpdate(id, values);
export const deleteSemesterById = (id: string) => Semester.findByIdAndDelete(id);
export const deleteSemesters = () => Semester.deleteMany();
