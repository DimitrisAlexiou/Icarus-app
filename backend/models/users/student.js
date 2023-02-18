const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = new Schema(
	{
		studentId: {
			type: String,
			required: true,
		},
		studentType: {
			type: String,
			enum: ['Undergraduate', 'Master', 'PhD'],
			required: true,
		},
		entranceYear: {
			type: Number,
			min: 1980,
			max: new Date().getFullYear(),
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
	}
);

module.exports = mongoose.model('Student', studentSchema);
