const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const degreeRulesSchema = new Schema(
	{
		cycles: {
			type: Number,
			required: true,
		},
		cycleCourses: {
			type: Number,
			required: true,
		},
		courses: {
			type: Number,
			required: true,
		},
		practice: {
			type: Boolean,
			required: true,
			default: false,
		},
	},
	{
		timestamps: true,
	},
);

module.exports = mongoose.model('DegreeRules', degreeRulesSchema);
