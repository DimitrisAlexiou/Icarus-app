import mongoose, { Schema, model, ClientSession } from 'mongoose';
import { INSTRUCTOR } from '../../utils/constants';

export enum FacultyType {
	DEP = 'DEP',
	EDIP = 'EDIP',
	ETEP = 'ETEP',
}

export enum Degree {
	Assistant = 'Assistant',
	Associate = 'Associate',
	Professor = 'Professor',
}

export interface InstructorProps extends Document {
	facultyType: FacultyType;
	degree: Degree;
	instructorEntranceYear: number;
	user: mongoose.Types.ObjectId;
}

const instructorSchema = new Schema<InstructorProps>(
	{
		facultyType: {
			type: String,
			enum: Object.values(FacultyType),
			required: true,
		},
		degree: {
			type: String,
			enum: Object.values(Degree),
		},
		instructorEntranceYear: {
			type: Number,
			min: 1980,
			max: new Date().getFullYear(),
		},
		user: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: 'User',
		},
	},
	{
		timestamps: true,
	}
);

export const Instructor = model<InstructorProps>(INSTRUCTOR, instructorSchema);

export const getInstructors = () =>
	Instructor.find().populate({
		path: 'user',
		select: 'name surname email',
	});
export const getInstructorById = (id: mongoose.Types.ObjectId) =>
	Instructor.findById(id).populate('user');
export const updateInstructorById = (
	id: string,
	instructor: Partial<InstructorProps>,
	options?: Record<string, any>
) => Instructor.findByIdAndUpdate(id, instructor, { new: true });
export const deleteInstructorByUserId = (id: string, session: ClientSession) =>
	Instructor.findOneAndDelete({ user: id }).session(session);
export const deleteInstructors = () => Instructor.deleteMany();
export const getTotalInstructors = () => Instructor.find().countDocuments();
