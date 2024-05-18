import mongoose, { Schema, model } from 'mongoose';
import { DocumentProps, documentSchema } from './document';

export interface DirectoryProps {
	name: string;
	teaching: mongoose.Types.ObjectId;
	files: DocumentProps[];
}

const directorySchema = new Schema<DirectoryProps>({
	name: {
		type: String,
		required: true,
	},
	teaching: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: 'Teaching',
	},
	files: [documentSchema],
});

export const Directory = model<DirectoryProps>('Directory', directorySchema);

export const createDirectory = (values: DirectoryProps) =>
	new Directory(values).save().then((directory) => directory.toObject());
export const getDirectoryById = (id: string) =>
	Directory.findById(id).populate({
		path: 'teaching',
		populate: {
			path: 'course',
		},
	});
export const getDirectoryByName = (name: string) =>
	Directory.findOne({ name }).populate({
		path: 'teaching',
		populate: {
			path: 'course',
		},
	});
export const updateDirectoryById = (id: string, directory: DirectoryProps) =>
	Directory.findByIdAndUpdate(id, directory, { new: true });
export const deleteDirectoryById = (id: string) =>
	Directory.findByIdAndDelete(id);
export const getDirectoriesByTeachingId = (teachingId: string) =>
	Directory.find({ teaching: teachingId }).populate({
		path: 'teaching',
		populate: {
			path: 'course',
		},
	});
export const deleteDirectoriesByTeachingId = (teachingId: string) =>
	Directory.deleteMany({ teaching: teachingId });
export const deleteDirectories = () => Directory.deleteMany();
export const getDirectories = () =>
	Directory.find().populate({
		path: 'teaching',
		populate: {
			path: 'course',
		},
	});
