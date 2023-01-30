const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cyclesSchema = new Schema({
	name: {
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
	// semester: {
	// 	type: Schema.Types.ObjectId,
	// 	ref: 'Semester',
	// },
});

// const cyclesSchema = new Schema({
// 	// number: {
// 	//     type: Number,
// 	//     required: true,
// 	// },
// 	cycles: [
// 		{
// 			type: String,
// 			required: true,
// 		},
// 	],
// });

module.exports = mongoose.model('Cycles', cyclesSchema);
