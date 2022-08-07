const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const prerequisitesSchema = new Schema({
	type: {
		type: String,
		enum: ['hard', 'soft'],
		required: true,
	},
	course: {
		type: Schema.Types.ObjectId,
		ref: 'Course',
	},
});

module.exports = mongoose.model('Prerequisites', prerequisitesSchema);
