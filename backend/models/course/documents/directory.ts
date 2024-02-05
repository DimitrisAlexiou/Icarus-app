import { Schema, model } from 'mongoose';
import { DocumentProps, documentSchema } from './document';

export interface DirectoryProps {
	name: string;
	items: DocumentProps[];
}

const directorySchema = new Schema<DirectoryProps>({
	name: {
		type: String,
		required: true,
	},
	items: [documentSchema],
});

export const Directory = model<DirectoryProps>('Directory', directorySchema);

export const createDirectory = (values: DirectoryProps) =>
	new Directory(values).save().then((directory) => directory.toObject());
export const getDirectoryById = (id: string) => Directory.findById(id);
export const getDirectoryByName = (name: string) => Directory.findOne({ name });
export const updateDirectoryById = (id: string, directory: DirectoryProps) =>
	Directory.findByIdAndUpdate(id, directory, { new: true });
export const deleteDirectoryById = (id: string) =>
	Directory.findByIdAndDelete(id);
export const getDirectoriesByTeachingId = (teachingId: string) =>
	Directory.find({ teaching: teachingId });
export const deleteDirectoriesByTeachingId = (teachingId: string) =>
	Directory.deleteMany({ teaching: teachingId });
