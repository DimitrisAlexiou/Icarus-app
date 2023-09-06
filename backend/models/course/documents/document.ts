import { Schema, model } from 'mongoose';

enum DocumentIType {
	File = 'file',
	Directory = 'directory',
}

enum DocumentSize {
	FourMB = 4 * 1024 * 1024,
	EightMB = 8 * 1024 * 1024,
}

export enum FileExtensions {
	PDF = 'pdf',
	PPTX = 'pptx',
	DOCX = 'docx',
	ZIP = 'zip',
	GZ = 'gz',
	TXT = 'txt',
	JPG = 'jpg',
	JPEG = 'jpeg',
	PNG = 'png',
}

export interface DocumentProps {
	name: string;
	type: DocumentType;
	size: DocumentSize;
	extension: FileExtensions;
	directory: Schema.Types.ObjectId;
}

const documentSchema = new Schema<DocumentProps>({
	name: {
		type: String,
		required: true,
	},
	type: {
		type: String,
		enum: Object.values(DocumentType),
		required: true,
	},
	size: {
		type: Number,
		enum: Object.values(DocumentSize),
		required: true,
	},
	extension: {
		type: String,
		required: true,
		enum: Object.values(FileExtensions),
	},
	directory: {
		type: Schema.Types.ObjectId,
		ref: 'Directory',
		required: true,
	},
});

export const Document = model<DocumentProps>('Document', documentSchema);

export const createDocument = (values: Record<string, any>) =>
	new Document(values).save().then((document) => document.toObject());
export const getDocumentById = (id: string) => Document.findById(id);
export const updateDocumentById = (id: string, document: Record<string, any>) =>
	Document.findByIdAndUpdate(id, document, { new: true });
export const deleteDocumentById = (id: string) => Document.findByIdAndDelete(id);
export const getDocumentsByDirectoryId = (directoryId: string) =>
	Document.find({ directory: directoryId });
export const deleteDocumentsByDirectoryId = (directoryId: string) =>
	Document.deleteMany({ directory: directoryId });
