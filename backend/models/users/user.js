const mongoose = require('mongoose');
const Student = require('../users/student');
const Instructor = require('../users/instructor');
const Note = require('../note');
const Schema = mongoose.Schema;

const userSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		surname: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		username: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		type: {
			type: String,
			enum: ['Student', 'Instructor'],
			required: true,
		},
		isActive: {
			type: Boolean,
			required: true,
			default: false,
		},
		isAdmin: {
			type: Boolean,
			required: true,
			default: false,
		},
		loginFailedAttempts: {
			type: Number,
			default: 0,
		},
		lastLogin: {
			type: Date,
			default: null,
		},
		student: {
			type: Schema.Types.ObjectId,
			ref: 'Student',
		},
		instructor: {
			type: Schema.Types.ObjectId,
			ref: 'Instructor',
		},
		notes: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Note',
			},
		],
	},
	{
		timestamps: true,
	}
);

userSchema.post('findOneAndDelete', async function (data) {
	if (data) {
		await Note.deleteMany({
			_id: {
				$in: data.notes,
			},
		});
	}
});

userSchema.post('findOneAndDelete', async function (data) {
	if (data) {
		await Student.deleteOne({
			_id: {
				$in: data.student,
			},
		});
	}
});

userSchema.post('findOneAndDelete', async function (data) {
	if (data) {
		await Instructor.deleteOne({
			_id: {
				$in: data.instructor,
			},
		});
	}
});

module.exports = mongoose.model('User', userSchema);
