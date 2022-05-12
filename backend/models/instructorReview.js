const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const instructorReviewSchema = new Schema(
	{
		user: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: 'User',
		},
		good_organization: {
			type: Number,
			required: true,
		},
		clear_comprehensive_answers: {
			type: Number,
			required: true,
		},
		student_participation: {
			type: Number,
			required: true,
		},
		course_consistency: {
			type: Number,
			required: true,
		},
		instructor_approachable: {
			type: Number,
			required: true,
		},
	},
	{
		timestamps: true,
	},
);

module.exports = mongoose.model('InstructorReview', instructorReviewSchema);
