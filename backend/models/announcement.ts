import { Schema, model } from 'mongoose';

const announcementSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
		},
		text: {
			type: String,
			required: true,
		},
		publishDate: {
			type: Date,
			default: Date.now,
			required: true,
		},
		updateDate: {
			type: Date,
			default: Date.now,
		},
		isVisible: {
			type: Boolean,
			required: true,
			default: false,
		},
		user: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: 'User',
		},
	},
	{
		timestamps: true,
	}
);

export const Announcement = model('Announcement', announcementSchema);
