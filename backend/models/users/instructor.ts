import { Schema, model } from 'mongoose';

export interface InstructorProps {
	facultyType: string;
	degree: string;
	instructorEntranceYear: number;
	user: string;
}

const instructorSchema = new Schema(
	{
		facultyType: {
			type: String,
			enum: ['DEP', 'EDIP', 'ETEP'],
			required: true,
		},
		degree: {
			type: String,
			enum: ['Assistant', 'Associate', 'Professor', '', undefined],
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

export const Instructor = model('Instructor', instructorSchema);

export const getInstructors = () => Instructor.find();
