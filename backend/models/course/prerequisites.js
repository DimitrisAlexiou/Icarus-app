const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const prerequisitesSchema = new Schema({
	prerequisiteType: {
		type: String,
		enum: ['Hard', 'Soft'],
		required: true,
	},
	prerequisite: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: 'Course',
	},
	// course: {
	// 	type: Schema.Types.ObjectId,
	// 	required: true,
	// 	ref: 'Course',
	// },
});

module.exports = mongoose.model('Prerequisites', prerequisitesSchema);
