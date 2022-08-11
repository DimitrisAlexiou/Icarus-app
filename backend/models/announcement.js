const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
			ref: 'User',
		},
	},
	{
		timestamps: true,
	},
);

module.exports = mongoose.model('Announcement', announcementSchema);
