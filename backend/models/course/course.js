const mongoose = require('mongoose');
const Teaching = require('./teaching');
const Schema = mongoose.Schema;

const courseSchema = new Schema(
	{
		courseId: {
			type: String,
			required: true,
		},
		title: {
			type: String,
			required: true,
		},
		type: {
			type: String,
			enum: ['Undergraduate', 'Master', 'Mixed'],
			required: true,
		},
		description: {
			type: String,
		},
		hasPrerequisites: {
			type: Boolean,
			required: true,
			default: false,
		},
		prerequisites: {
			type: [
				{
					prerequisite: {
						type: Schema.Types.ObjectId,
						ref: 'Course',
					},
					prerequisiteType: {
						type: String,
						enum: ['Hard', 'Soft'],
					},
				},
			],
			default: null,
		},
		semester: {
			type: Schema.Types.ObjectId,
			ref: 'Semester',
			required: true,
		},
		year: {
			type: String,
			enum: ['1', '2', '3', '4', '5'],
			required: true,
		},
		cycle: {
			type: Schema.Types.ObjectId,
			ref: 'Cycles',
			default: null,
		},
		ects: {
			type: Number,
			required: true,
		},
		hasLab: {
			type: Boolean,
			required: true,
			default: false,
		},
		isObligatory: {
			type: Boolean,
			required: true,
			default: true,
		},
		isActive: {
			type: Boolean,
			required: true,
			default: false,
		},
	},
	{
		timestamps: true,
	}
);

// courseSchema.post('findOneAndDelete', async function (data) {
// 	if (data) {
// 		await Teaching.deleteOne({
// 			_id: {
// 				$in: data.teaching,
// 			},
// 		});
// 	}
// });

module.exports = mongoose.model('Course', courseSchema);
