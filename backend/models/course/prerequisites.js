const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const prerequisitesSchema = new Schema({
	type: {
		type: String,
		enum: ['None', 'Hard', 'Soft'],
		required: true,
	},
	prerequisite: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: 'Course',
	},
	// course: {
	// 	type: Schema.Types.ObjectId,
	// 	ref: 'Course',
	// },
});

module.exports = mongoose.model('Prerequisites', prerequisitesSchema);
