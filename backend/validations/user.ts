import Joi from 'joi';
import {
	nameRegex,
	passwordRegex,
	studentIdRegex,
	surnameRegex,
	usernameRegex,
} from '../utils/constants';
import { UserType } from '../models/users/user';
import { StudentType } from '../models/users/student';
import { Degree, FacultyType } from '../models/users/instructor';

export const userSchema = Joi.object({
	name: Joi.string().max(40).pattern(new RegExp(nameRegex)).required(),
	surname: Joi.string().max(40).pattern(new RegExp(surnameRegex)).required(),
	username: Joi.string().pattern(new RegExp(usernameRegex)).required(),
	email: Joi.string()
		.email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'gr'] } })
		.lowercase()
		.required(),
	password: Joi.string().min(8).pattern(new RegExp(passwordRegex)).required(),
	type: Joi.string().valid(UserType.student, UserType.instructor).required(),
	studentId: Joi.string().when('type', {
		is: UserType.student,
		then: Joi.string().pattern(new RegExp(studentIdRegex)).required(),
		otherwise: Joi.string(),
	}),
	entranceYear: Joi.number().when('type', {
		is: UserType.student,
		then: Joi.number().min(1980).max(new Date().getFullYear()).required(),
		otherwise: Joi.number(),
	}),
	studentType: Joi.string().when('type', {
		is: UserType.student,
		then: Joi.string()
			.valid(StudentType.Undergraduate, StudentType.Master, StudentType.PhD)
			.required(),
		otherwise: Joi.string(),
	}),
	facultyType: Joi.string().when('type', {
		is: UserType.instructor,
		then: Joi.string()
			.valid(FacultyType.DEP, FacultyType.EDIP, FacultyType.ETEP)
			.required(),
		otherwise: Joi.string(),
	}),
	degree: Joi.string().when('type', {
		is: UserType.instructor,
		then: Joi.string().valid(
			Degree.Assistant,
			Degree.Associate,
			Degree.Professor
		),
		otherwise: Joi.string(),
	}),
	instructorEntranceYear: Joi.number().when('type', {
		is: UserType.instructor,
		then: Joi.number().min(1980).max(new Date().getFullYear()),
		otherwise: Joi.number(),
	}),
});

export const profileSchema = Joi.object({
	name: Joi.string().max(40).pattern(new RegExp(nameRegex)),
	surname: Joi.string().max(40).pattern(new RegExp(surnameRegex)),
	username: Joi.string().pattern(new RegExp(usernameRegex)),
	email: Joi.string()
		.lowercase()
		.email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'gr'] } }),
	type: Joi.string().valid(UserType.student, UserType.instructor),
	degree: Joi.string().when('type', {
		is: UserType.instructor,
		then: Joi.string().valid(
			Degree.Assistant,
			Degree.Associate,
			Degree.Professor,
			`Degree type should be one of the following: [${Degree.Assistant}, ${Degree.Associate}, ${Degree.Professor}]`
		),
		otherwise: Joi.string(),
	}),
});
