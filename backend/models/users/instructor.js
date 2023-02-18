const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const instructorSchema = new Schema(
	{
		facultyType: {
			type: String,
			enum: ['DEP', 'EDIP', 'ETEP'],
			required: true,
		},
		degree: {
			type: String,
			enum: ['Assistant', 'Associate', 'Professor', '', undefined],
		},
		instructorEntranceYear: {
			type: Number,
			min: 1980,
			max: new Date().getFullYear(),
		},
		user: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: 'User',
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('Instructor', instructorSchema);
