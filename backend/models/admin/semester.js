const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const semesterSchema = new Schema(
	{
		type: {
			type: String,
			enum: ['Winter', 'Spring', 'Any'],
			required: true,
		},
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
		grading: {
			type: Number,
			required: true,
		},
		// teachings: [
		// 	{
		// 		type: Schema.Types.ObjectId,
		// 		ref: Teaching,
		// 	},
		// ],
		// teachingReviews: [
		// 	{
		// 		type: Schema.Types.ObjectId,
		// 		ref: TeachingReview,
		// 	},
		// ],
		// instructorReviews: [
		// 	{
		// 		type: Schema.Types.ObjectId,
		// 		ref: InstructorReview,
		// 	},
		// ],
		// generalReviews: [
		// 	{
		// 		type: Schema.Types.ObjectId,
		// 		ref: GeneralReview,
		// 	},
		// ],
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('Semester', semesterSchema);
