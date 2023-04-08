const mongoose = require('mongoose');
const Student = require('../users/student');
const Instructor = require('../users/instructor');
const Note = require('../note');
const calendar = require('../calendar');
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
			enum: ['Student', 'Instructor', 'Admin'],
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
		tokenVersion: {
			type: Number,
			default: 0,
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
		events: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Calendar',
			},
		],
	},
	{
		timestamps: true,
	}
);

userSchema.pre('create', async function (next) {
	if (this.isAdmin) {
		const existingAdmin = await this.constructor.findOne({ isAdmin: true });
		if (existingAdmin && !this.isNew) {
			const error = new Error('There can be only one admin user');
			return next(error);
		}
	}
	return next();
});

userSchema.post('findByIdAndDelete', async function (data) {
	if (data) {
		await Note.deleteMany({
			_id: {
				$in: data.notes,
			},
		});
	}
});

userSchema.post('findByIdAndDelete', async function (data) {
	if (data) {
		await calendar.deleteMany({
			_id: {
				$in: data.events,
			},
		});
	}
});

userSchema.post('findByIdAndDelete', async function (data) {
	if (data) {
		await Student.deleteOne({
			_id: {
				$in: data.student,
			},
		});
	}
});

userSchema.post('findByIdAndDelete', async function (data) {
	if (data) {
		await Instructor.deleteOne({
			_id: {
				$in: data.instructor,
			},
		});
	}
});

userSchema.post('deleteMany', async function (data) {
	if (data) {
		await Student.deleteMany({});
		await Instructor.deleteMany({});
	}
});

module.exports = mongoose.model('User', userSchema);
