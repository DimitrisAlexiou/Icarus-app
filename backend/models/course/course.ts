import { Schema, model } from 'mongoose';
import { Teaching } from './teaching';

const courseSchema = new Schema(
	{
		courseId: {
			type: String,
			required: true,
		},
		title: {
			type: String,
			required: true,
		},
		type: {
			type: String,
			enum: ['Undergraduate', 'Master', 'Mixed'],
			required: true,
		},
		description: {
			type: String,
		},
		hasPrerequisites: {
			type: Boolean,
			required: true,
			default: false,
		},
		prerequisites: {
			type: [
				{
					prerequisite: {
						type: Schema.Types.ObjectId,
						ref: 'Course',
					},
					prerequisiteType: {
						type: String,
						enum: ['Hard', 'Soft'],
					},
				},
			],
			default: null,
		},
		semester: {
			type: Schema.Types.ObjectId,
			ref: 'Semester',
			required: true,
		},
		year: {
			type: String,
			enum: ['1', '2', '3', '4', '5'],
			required: true,
		},
		cycle: {
			type: Schema.Types.ObjectId,
			ref: 'Cycles',
			default: null,
		},
		ects: {
			type: Number,
			required: true,
		},
		hasLab: {
			type: Boolean,
			required: true,
			default: false,
		},
		isObligatory: {
			type: Boolean,
			required: true,
			default: true,
		},
		isActive: {
			type: Boolean,
			required: true,
			default: false,
		},
	},
	{
		timestamps: true,
	}
);

courseSchema.pre('findOneAndDelete', async function (next) {
	try {
		const courseId = this.getQuery()['_id'];
		await Teaching.deleteOne({ course: courseId });
		next();
	} catch (error) {
		next(error);
	}
});

export const Course = model('Course', courseSchema);

export const getCourses = () => Course.find();
export const getCourseById = (id: string) => Course.findById(id);
export const getCourseByCourseId = (courseId: string) => Course.findOne({ courseId });
export const createCourse = (values: Record<string, any>) =>
	new Course(values).save().then((course) => course.toObject());
export const updateCourseById = (id: string, values: Record<string, any>) =>
	Course.findByIdAndUpdate(id, values);
export const deleteCourseById = (id: string) => Course.findByIdAndDelete(id);
export const deleteCourses = () => Course.deleteMany();
