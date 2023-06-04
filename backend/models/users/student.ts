import { Schema, model } from 'mongoose';

export interface StudentProps {
	studentId: string;
	studentType: string;
	entranceYear: number;
	user: string;
}

const studentSchema = new Schema(
	{
		studentId: {
			type: String,
			required: true,
		},
		studentType: {
			type: String,
			enum: ['Undergraduate', 'Master', 'PhD'],
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
	},
	{
		timestamps: true,
	}
);

export const Student = model('Student', studentSchema);

export const getStudents = () => Student.find();
