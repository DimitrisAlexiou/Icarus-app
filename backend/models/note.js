const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const noteSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
		},
		text: {
			type: String,
			required: true,
		},
		postDate: {
			type: Date,
			default: Date.now,
		},
		file: {
			data: Buffer,
			contentType: String,
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

module.exports = mongoose.model('Note', noteSchema);
