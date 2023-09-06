import mongoose, { Schema, model } from 'mongoose';

export interface DirectoryProps {
	name: string;
	items: mongoose.Types.ObjectId[];
	teaching: Schema.Types.ObjectId;
}

const directorySchema = new Schema<DirectoryProps>({
	name: {
		type: String,
		required: true,
	},
	items: [{ type: Schema.Types.ObjectId, ref: 'Document', required: true }],
	teaching: {
		type: Schema.Types.ObjectId,
		ref: 'Teaching',
		required: true,
	},
});

export const Directory = model<DirectoryProps>('Directory', directorySchema);

export const createdirectory = (values: Record<string, any>) =>
	new Directory(values).save().then((directory) => directory.toObject());
export const getDirectoryById = (id: string) => Directory.findById(id);
export const updateDirectoryById = (id: string, directory: Record<string, any>) =>
	Directory.findByIdAndUpdate(id, directory, { new: true });
export const deleteDirectoryById = (id: string) => Directory.findByIdAndDelete(id);
export const getDirectoriesByTeachingId = (teachingId: string) =>
	Directory.find({ teaching: teachingId });
export const deleteDirectoriesByTeachingId = (teachingId: string) =>
	Directory.deleteMany({ teaching: teachingId });
