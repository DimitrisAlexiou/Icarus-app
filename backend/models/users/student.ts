import mongoose, { Schema, model, ClientSession } from 'mongoose';
import { STUDENT } from '../../utils/constants';

export enum StudentType {
	Undergraduate = 'Undergraduate',
	Master = 'Master',
	PhD = 'PhD',
}

export interface StudentProps extends Document {
	studentId: string;
	studentType: StudentType;
	entranceYear: number;
	user: mongoose.Types.ObjectId;
	enrolledCourses?: Array<mongoose.Types.ObjectId>;
	passedTeachings?: Array<mongoose.Types.ObjectId>;
}

const studentSchema = new Schema<StudentProps>(
	{
		studentId: {
			type: String,
			required: true,
		},
		studentType: {
			type: String,
			enum: Object.values(StudentType),
			required: true,
		},
		entranceYear: {
			type: Number,
			min: 1980,
			max: new Date().getFullYear(),
			required: true,
		},
		user: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: 'User',
		},
		enrolledCourses: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Teaching',
			},
		],
		passedTeachings: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Teaching',
			},
		],
	},
	{
		timestamps: true,
	}
);

export const Student = model<StudentProps>(STUDENT, studentSchema);

export const getStudents = () =>
	Student.find().populate({
		path: 'user',
		populate: [{ path: 'notes' }, { path: 'events' }],
	});
export const getStudentById = (id: mongoose.Types.ObjectId) =>
	Student.findById(id).populate('user');
export const getStudentByUserId = (userId: string) =>
	Student.findOne({ user: userId });
export const updateStudentById = (
	id: string,
	student: Record<string, any>,
	options?: Record<string, any>
) => Student.findByIdAndUpdate(id, student, { new: true });
export const deleteStudentByUserId = (id: string, session: ClientSession) =>
	Student.findOneAndDelete({ user: id }).session(session);
export const deleteStudents = () => Student.deleteMany();
