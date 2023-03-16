const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema(
	{
		startDate: {
			type: Date,
			default: Date.now,
			required: true,
		},
		endDate: {
			type: Date,
			default: Date.now,
			required: true,
		},
		start: {
			type: Number,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('Review', reviewSchema);
