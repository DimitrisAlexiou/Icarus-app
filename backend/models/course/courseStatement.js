const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseStatementSchema = new Schema(
	{
		courses: [
			{
				type: String,
				required: true,
			},
		],
		user: {
			type: Schema.Types.ObjectId,
			ref: 'User',
		},
		semester: {
			type: Schema.Types.ObjectId,
			ref: 'Semester',
		},
	},
	{
		timestamps: true,
	},
);

module.exports = mongoose.model('CourseStatement', courseStatementSchema);
