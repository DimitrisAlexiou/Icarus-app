const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = new Schema(
	{
		studentId: {
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
			enum: ['Undergraduate', 'Master', 'PhD'],
			required: true,
		},
		user: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: 'User',
		},
	},
	{
		timestamps: true,
	},
);

module.exports = mongoose.model('Student', studentSchema);
