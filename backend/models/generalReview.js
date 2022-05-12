const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const generalReviewSchema = new Schema(
	{
		user: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: 'User',
		},
		course_opinion: {
			type: String,
			required: true,
		},
		instructor_opinion: {
			type: String,
			required: true,
		},
		likes: {
			type: String,
			required: true,
		},
		dislikes: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	},
);

module.exports = mongoose.model('GeneralReview', generalReviewSchema);
