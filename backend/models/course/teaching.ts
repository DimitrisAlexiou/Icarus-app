import { Schema, model } from 'mongoose';
import { Course } from './course';

const teachingSchema = new Schema({
	labWeight: {
		type: Number,
		required: true,
		default: 0,
	},
	theoryWeight: {
		type: Number,
		required: true,
		default: 100,
	},
	theoryGrade: {
		type: Number,
		required: true,
		default: 4,
	},
	labGrade: {
		type: Number,
		required: true,
		default: 4,
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
		required: true,
		ref: 'Course',
	},
	semester: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: 'Semester',
	},
});

teachingSchema.pre('save', async function (next) {
	const course = await Course.findById(this.course);
	if (course.hasLab === true) {
		this.labWeight = 40;
		this.theoryWeight = 60;
		this.theoryGradeThreshold = 5;
		this.labGradeThreshold = 5;
	}
	next();
});

export const Teaching = model('Teaching', teachingSchema);

export const getTeachings = () => Teaching.find();
export const getTeachingById = (id: string) => Teaching.findById(id);
export const createTeaching = (values: Record<string, any>) =>
	new Teaching(values).save().then((teaching) => teaching.toObject());
export const updateTeachingById = (id: string, values: Record<string, any>) =>
	Teaching.findByIdAndUpdate(id, values);
export const deleteTeachingById = (id: string) => Teaching.findByIdAndDelete(id);
export const deleteTeachings = () => Teaching.deleteMany();
