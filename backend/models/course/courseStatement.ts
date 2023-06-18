import mongoose, { Schema, model } from 'mongoose';

export interface CourseStatementProps {
	courses: [mongoose.Types.ObjectId];
	user: mongoose.Types.ObjectId;
	semester: mongoose.Types.ObjectId;
}

const courseStatementSchema = new Schema<CourseStatementProps>(
	{
		courses: [
			{
				type: Schema.Types.ObjectId,
				required: true,
				ref: 'Course',
			},
		],
		user: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: 'User',
		},
		semester: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: 'Semester',
		},
	},
	{
		timestamps: true,
	}
);

export const CourseStatement = model<CourseStatementProps>(
	'CourseStatement',
	courseStatementSchema
);

export const getCourseStatements = () => CourseStatement.find();
export const getCourseStatementById = (id: string) => CourseStatement.findById(id);
export const createCourseStatement = (values: Record<string, any>) =>
	new CourseStatement(values).save().then((courseStatement) => courseStatement.toObject());
export const updateCourseStatementById = (id: string, values: Record<string, any>) =>
	CourseStatement.findByIdAndUpdate(id, values, { new: true });
export const deleteCourseStatementById = (id: string) => CourseStatement.findByIdAndDelete(id);
export const deleteCourseStatements = () => CourseStatement.deleteMany();
