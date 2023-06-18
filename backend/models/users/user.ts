import mongoose, { Schema, model, Document, ClientSession } from 'mongoose';
import { passwordRegex, emailRegex } from '../../utils/constants';

export enum UserType {
	student = 'Student',
	instructor = 'Instructor',
	admin = 'Admin',
}

export interface UserProps extends Document {
	name: string;
	surname: string;
	email: string;
	username: string;
	password: string;
	type: UserType;
	isActive: boolean;
	isAdmin: boolean;
	loginFailedAttempts: number;
	lastLogin: Date | null;
	tokenVersion: number;
	student: mongoose.Types.ObjectId | null;
	instructor: mongoose.Types.ObjectId | null;
	notes?: Array<mongoose.Types.ObjectId>;
	events?: Array<mongoose.Types.ObjectId>;
}

const userSchema: Schema = new Schema<UserProps>(
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
			lowercase: true,
			match: emailRegex,
		},
		username: {
			type: String,
			required: true,
			unique: true,
			lowercase: true,
		},
		password: {
			type: String,
			required: true,
			select: false,
			minlength: 8,
			match: passwordRegex,
		},
		type: {
			type: String,
			enum: Object.values(UserType),
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
			ref: UserType.student,
		},
		instructor: {
			type: Schema.Types.ObjectId,
			ref: UserType.instructor,
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

export const User = model<UserProps>('User', userSchema);

export const getUsers = () => User.find();
export const getUserById = (id: string) => User.findById(id);
export const getUserByUsername = (username: string) => User.findOne({ username });
export const updateUserById = (id: string, user: Record<string, any>) =>
	User.findByIdAndUpdate(id, user, { new: true });
export const deleteUserById = (id: string, session: ClientSession) =>
	User.findByIdAndDelete(id).session(session);
export const deleteUsers = () => User.deleteMany();
