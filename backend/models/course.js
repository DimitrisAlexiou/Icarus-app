const mongoose = require('mongoose');
// const Review = require('./Review');
const Schema = mongoose.Schema;

const courseSchema = new Schema(
	{
		cid: {
			type: String,
			required: true,
		},
		title: {
			type: String,
			required: true,
		},
		type: {
			type: String,
			enum: ['Undergraduate', 'Master', 'Mixed'],
			required: true,
		},
		description: {
			type: String,
		},
		prerequisites: {
			type: String,
		},
		semester: {
			type: String,
			enum: ['Winter', 'Spring', 'Any'],
			required: true,
		},
		year: {
			type: String,
			enum: ['1', '2', '3', '4', '5'],
			required: true,
		},
		isActive: {
			type: Boolean,
			required: true,
			default: false,
		},
		hasLab: {
			type: Boolean,
			required: true,
			default: false,
		},
		isObligatory: {
			type: Boolean,
			required: true,
			default: false,
		},
		cycle: {
			type: String,
			enum: [
				'Security',
				'Software Engineering',
				'Information Systems',
				'Communication Systems',
				'AI',
			],
			required: true,
		},
		ects: {
			type: Number,
			required: true,
		},

		// reviews: [
		// 	{
		// 		type: Schema.Types.ObjectId,
		// 		ref: 'Review',
		// 	},
		// ],
	},
	{
		timestamps: true,
	},
);

// courseSchema.post('findOneAndDelete', async function (data) {
// 	if (data) {
// 		await Review.deleteMany({
// 			_id: {
// 				$in: data.reviews,
// 			},
// 		});
// 	}
// });

module.exports = mongoose.model('Course', courseSchema);
