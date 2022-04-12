const mongoose = require('mongoose');
// const Review = require('./Review');
const Schema = mongoose.Schema;

const courseSchema = new Schema({
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
		enum: ['undergraduate', 'master', 'mixed'],
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
		enum: ['winter', 'spring', 'any'],
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
	},
	hasLab: {
		type: Boolean,
		required: true,
	},
	isObligatory: {
		type: Boolean,
		required: true,
	},
	cycle: {
		type: String,
		enum: [
			'security',
			'software engineering',
			'information systems',
			'communication systems',
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
});

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
