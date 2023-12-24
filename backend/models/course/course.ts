import { SemesterType } from '../../models/admin/semester';
import mongoose, { Schema, model } from 'mongoose';

export enum CourseType {
	Undergraduate = 'Undergraduate',
	Master = 'Master',
	Mixed = 'Mixed',
}

export enum PrerequisiteType {
	Hard = 'Hard',
	Soft = 'Soft',
}

export interface CourseProps {
	courseId: string;
	title: string;
	type: CourseType;
	description: string;
	prerequisites: [
		{
			prerequisite: mongoose.Types.ObjectId;
			prerequisiteType: PrerequisiteType;
		}
	];
	semester: SemesterType;
	cycle: mongoose.Types.ObjectId;
	master: mongoose.Types.ObjectId;
	year: number;
	ects: number;
	hasLab: boolean;
	isObligatory: boolean;
	hasPrerequisites: boolean;
	isActive: boolean;
}

const courseSchema = new Schema<CourseProps>(
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
			enum: Object.values(CourseType),
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
						enum: Object.values(PrerequisiteType),
					},
				},
			],
			default: null,
		},
		semester: {
			type: String,
			enum: Object.values(SemesterType),
			required: true,
		},
		year: {
			type: Number,
			enum: [1, 2, 3, 4, 5],
			required: true,
		},
		cycle: {
			type: Schema.Types.ObjectId,
			ref: 'Cycle',
			default: null,
		},
		master: {
			type: Schema.Types.ObjectId,
			ref: 'MasterProgram',
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

export const Course = model<CourseProps>('Course', courseSchema);

export const getCourses = () =>
	Course.find()
		.populate({
			path: 'prerequisites.prerequisite',
			select: 'title',
		})
		.populate('cycle')
		.populate('master');
export const getCourseById = (id: string) =>
	Course.findById(id)
		.populate({
			path: 'prerequisites.prerequisite',
			select: 'title',
		})
		.populate('cycle')
		.populate('master');
export const getCourseByCourseId = (courseId: string) =>
	Course.findOne({ courseId });
export const createCourse = (values: Record<string, any>) =>
	new Course(values).save().then((course) => course.toObject());
export const updateCourseById = (
	id: string,
	course: Record<string, any>,
	options?: Record<string, any>
) => Course.findByIdAndUpdate(id, course, { new: true });
export const deleteCourseById = (id: string) => Course.findByIdAndDelete(id);
export const deleteCourses = () => Course.deleteMany();
