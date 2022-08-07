const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const teachingSchema = new Schema({
	labWeight: {
		type: Number,
	},
	theoryWeight: {
		type: Number,
		required: true,
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
		default: 5,
	},
	books: [
		{
			type: String,
		},
	],
	course: {
		type: Schema.Types.ObjectId,
		ref: 'Course',
	},
});

module.exports = mongoose.model('Teaching', teachingSchema);
