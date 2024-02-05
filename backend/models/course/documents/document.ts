import { Schema, model } from 'mongoose';

export enum DocumentType {
	PDF = 'application/pdf',
	PPTX = 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
	DOCX = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
	XLSX = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
	ZIP = 'application/zip',
	GZ = 'application/gzip',
	TXT = 'text/plain',
	JPG = 'image/jpeg',
	JPEG = 'image/jpeg',
	PNG = 'image/png',
}

export enum FileExtensions {
	PDF = 'pdf',
	PPTX = 'pptx',
	DOCX = 'docx',
	EXCEL = 'xlsx',
	ZIP = 'zip',
	GZ = 'gz',
	TXT = 'txt',
	JPG = 'jpg',
	JPEG = 'jpeg',
	PNG = 'png',
}

export interface DocumentProps {
	name: string;
	size: number;
	type: DocumentType;
	lastModifiedDate: Date;
}

export const documentSchema = new Schema<DocumentProps>(
	{
		name: {
			type: String,
		},
		size: {
			type: Number,
			max: 8 * 1024 * 1024,
		},
		type: {
			type: String,
			enum: Object.values(DocumentType),
		},
		lastModifiedDate: {
			type: Date,
		},
	},
	{ _id: false }
);

export const Document = model<DocumentProps>('Document', documentSchema);

// export const getDocumentById = (id: string) => Document.findById(id);
// export const deleteDocumentById = (id: string) =>
// 	Document.findByIdAndDelete(id);
// export const getDocumentsByDirectoryId = (directoryId: string) =>
// 	Document.find({ directory: directoryId });
// export const deleteDocumentsByDirectoryId = (directoryId: string) =>
// 	Document.deleteMany({ directory: directoryId });
