const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = new Schema({
	sid: {
		type: String,
		required: true,
	},
	entranceYear: {
		type: Number,
		min: 4,
		max: 4,
		required: true,
	},
	studentType: {
		type: String,
		enum: ['undergraduate', 'master', 'PhD'],
		required: true,
	},
});

module.exports = mongoose.model('Student', studentSchema);
