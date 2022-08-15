const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const semesterSchema = new Schema(
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
	},
	{
		timestamps: true,
	},
);

module.exports = mongoose.model('Semester', semesterSchema);
