const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gradingDurationSchema = new Schema(
	{
		period: {
			type: Number,
			required: true,
		},
	},
	{
		timestamps: true,
	},
);

module.exports = mongoose.model('GradingDuration', gradingDurationSchema);
