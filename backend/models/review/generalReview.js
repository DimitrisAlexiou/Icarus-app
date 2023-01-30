const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const generalReviewSchema = new Schema(
	{
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
		// user: {
		// 	type: Schema.Types.ObjectId,
		// 	required: true,
		// 	ref: 'User',
		// },
		// teaching: {
		// 	type: Schema.Types.ObjectId,
		// 	required: true,
		// 	ref: 'Teaching',
		// },
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('GeneralReview', generalReviewSchema);
