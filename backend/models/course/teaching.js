const mongoose = require('mongoose');
const Course = require('./course');
const Schema = mongoose.Schema;

const teachingSchema = new Schema({
	labWeight: {
		type: Number,
		required: true,
		default: 0,
	},
	theoryWeight: {
		type: Number,
		required: true,
		default: 100,
	},
	theoryGrade: {
		type: Number,
		required: true,
		default: 4,
	},
	labGrade: {
		type: Number,
		required: true,
		default: 4,
	},
	theoryGradeThreshold: {
		type: Number,
		required: true,
		default: 5,
	},
	labGradeThreshold: {
		type: Number,
		required: true,
		default: 0,
	},
	books: [
		{
			type: String,
		},
	],
	course: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: 'Course',
	},
	semester: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: 'Semester',
	},
});

teachingSchema.pre('save', async function (next) {
	if (Course.hasLab === true) {
		labWeight.default = 40;
		theoryWeight.default = 60;
		theoryGradeThreshold.default = 5;
		labGradeThreshold.default = 5;
	}
	next();
});

module.exports = mongoose.model('Teaching', teachingSchema);
