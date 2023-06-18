import mongoose, { ClientSession, Schema, model } from 'mongoose';

export interface TeachingProps {
	labWeight: number;
	theoryWeight: number;
	theoryGrade: number;
	labGrade: number;
	theoryGradeThreshold: number;
	labGradeThreshold: number;
	books?: string[];
	course: mongoose.Types.ObjectId;
	semester: mongoose.Types.ObjectId;
	instructor?: mongoose.Types.ObjectId[];
}

const teachingSchema = new Schema<TeachingProps>(
	{
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
			ref: 'Course',
			required: true,
		},
		semester: {
			type: Schema.Types.ObjectId,
			ref: 'Semester',
			required: true,
		},
		instructor: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Instructor',
			},
		],
	},
	{
		timestamps: true,
	}
);

export const Teaching = model<TeachingProps>('Teaching', teachingSchema);

export const getTeachings = () => Teaching.find().populate('course').populate('semester');
export const getTeachingById = (id: string) =>
	Teaching.findById(id).populate('course').populate('semester');
export const createTeaching = (teaching: Record<string, any>, options?: Record<string, any>) =>
	new Teaching(teaching).save().then((teaching) => teaching.toObject());
export const updateTeachingById = (id: string, teaching: TeachingProps) =>
	Teaching.findByIdAndUpdate(id, teaching, { new: true });
export const deleteTeachingById = (id: string) => Teaching.findByIdAndDelete(id);
export const deleteTeachingByCourseId = (courseId: string, session: ClientSession) => {
	return Teaching.findOneAndDelete({ course: courseId }).session(session);
};
export const deleteTeachings = () => Teaching.deleteMany();
