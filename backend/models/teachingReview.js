const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const teachingReviewSchema = new Schema(
	{
		user: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: 'User',
		},
		clear_course_objectives: {
			type: Number,
			required: true,
		},
		course_material: {
			type: Number,
			required: true,
		},
		course_comprehension: {
			type: Number,
			required: true,
		},
		examination_method: {
			type: Number,
			required: true,
		},
		course_difficulty: {
			type: Number,
			required: true,
		},
		course_activities: {
			type: Number,
			required: true,
		},
	},
	{
		timestamps: true,
	},
);

module.exports = mongoose.model('TeachingReview', teachingReviewSchema);
