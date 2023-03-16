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
	const course = await Course.findById(this.course);
	if (course.hasLab === true) {
		this.labWeight = 40;
		this.theoryWeight = 60;
		this.theoryGradeThreshold = 5;
		this.labGradeThreshold = 5;
	}
	next();
});

module.exports = mongoose.model('Teaching', teachingSchema);
