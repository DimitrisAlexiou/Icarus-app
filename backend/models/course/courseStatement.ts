import { Schema, model } from 'mongoose';

const courseStatementSchema = new Schema(
	{
		courses: [
			{
				type: Schema.Types.ObjectId,
				required: true,
				ref: 'CourseStatement',
			},
		],
		user: {
			type: Schema.Types.ObjectId,
			ref: 'User',
		},
		semester: {
			type: Schema.Types.ObjectId,
			ref: 'Semester',
		},
	},
	{
		timestamps: true,
	}
);

export const CourseStatement = model('CourseStatement', courseStatementSchema);

export const getCourseStatements = () => CourseStatement.find();
export const getCourseStatementById = (id: string) => CourseStatement.findById(id);
export const createCourseStatement = (values: Record<string, any>) =>
	new CourseStatement(values).save().then((courseStatement) => courseStatement.toObject());
export const updateCourseStatementById = (id: string, values: Record<string, any>) =>
	CourseStatement.findByIdAndUpdate(id, values);
export const deleteCourseStatementById = (id: string) => CourseStatement.findByIdAndDelete(id);
export const deleteCourseStatements = () => CourseStatement.deleteMany();
