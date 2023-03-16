const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const assessmentSchema = new Schema(
	{
		period: {
			type: Number,
			required: true,
		},
		vaccineStartDate: {
			type: Date,
			default: Date.now,
			required: true,
		},
		vaccineEndDate: {
			type: Date,
			default: Date.now,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('Assessment', assessmentSchema);
