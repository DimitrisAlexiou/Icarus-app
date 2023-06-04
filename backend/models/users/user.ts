import mongoose, { Schema, model, Document } from 'mongoose';
import { Note } from '../note';
import { Calendar } from '../calendar';

export interface UserProps extends Document {
	name: string;
	surname: string;
	email: string;
	username: string;
	password: string;
	type: 'Student' | 'Instructor' | 'Admin';
	isActive: boolean;
	isAdmin: boolean;
	loginFailedAttempts: number;
	lastLogin: Date | null;
	tokenVersion: number;
	student: string | null;
	instructor: string | null;
	notes?: Array<mongoose.Types.ObjectId>;
	events?: Array<mongoose.Types.ObjectId>;
}

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
			select: false,
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

// userSchema.pre<UserProps>('create', async function (next) {
// 	if (this.isAdmin) {
// 		const existingAdmin = await this.constructor.findOne({ isAdmin: true });
// 		if (existingAdmin && !this.isNew) {
// 			const error = new Error('There can be only one admin user');
// 			return next(error);
// 		}
// 	}
// 	return next();
// });

userSchema.pre('findOneAndDelete', async function (next) {
	try {
		const userId = this.getQuery()['_id'];
		await Note.deleteMany({ owner: userId });
		next();
	} catch (error) {
		next(error);
	}
});

userSchema.pre('findOneAndDelete', async function (next) {
	try {
		const userId = this.getQuery()['_id'];
		await Calendar.deleteMany({ owner: userId });
		next();
	} catch (error) {
		next(error);
	}
});

//TODO Pre 'remove' middleware to remove associated student/instructor when a user is removed
userSchema.pre<UserProps>('deleteOne', async function (next) {
	try {
		if (this.student) await model('Student').findByIdAndDelete(this.student).exec();

		if (this.instructor) await model('Instructor').findByIdAndDelete(this.instructor).exec();

		next();
	} catch (err) {
		next(err);
	}
});

export const User = model('User', userSchema);

export const getUsers = () => User.find();
export const getUserById = (id: string) => User.findById(id);
export const getUserByUsername = (username: string) => User.findOne({ username });
export const createUser = (values: Record<string, any>) =>
	new User(values).save().then((user) => user.toObject());
export const updateUserById = (id: string, values: Record<string, any>) =>
	User.findByIdAndUpdate(id, values);
export const deleteUserById = (id: string) => User.findByIdAndDelete(id);
export const deleteUsers = () => User.deleteMany();
