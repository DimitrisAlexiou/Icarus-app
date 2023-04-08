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
			required: true,
		},
		file: {
			type: String,
		},
		categories: [
			{
				type: String,
			},
		],
		importance: {
			type: Boolean,
			default: false,
		},
		owner: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('Note', noteSchema);
