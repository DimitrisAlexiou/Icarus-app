const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const calendarSchema = new Schema(
	{
		eventId: {
			type: String,
			unique: true,
			required: true,
		},
		title: {
			type: String,
			required: true,
		},
		start: {
			type: Date,
			required: true,
		},
		end: {
			type: Date,
			required: true,
		},
		allDay: {
			type: Boolean,
			required: true,
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

module.exports = mongoose.model('Calendar', calendarSchema);
