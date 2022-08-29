const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewStartDateSchema = new Schema(
	{
		start: {
			type: Number,
			required: true,
		},
	},
	{
		timestamps: true,
	},
);

module.exports = mongoose.model('ReviewStartDate', reviewStartDateSchema);
