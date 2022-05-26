const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const instructorSchema = new Schema({
	facultyType: {
		type: String,
		enum: ['DEP', 'EDIP', 'ETEP'],
		required: true,
	},
	degree: {
		type: String,
		enum: ['Assistant', 'Associate', 'Professor'],
	},
	entranceYear: {
		type: Number,
	},
});

module.exports = mongoose.model('Instructor', instructorSchema);
