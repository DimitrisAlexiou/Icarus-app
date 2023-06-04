import { Request, Response } from 'express';
import { User, getUsers, getUserById, deleteUserById, deleteUsers } from '../../models/users/user';
import { Student, getStudents } from '../../models/users/student';
import { Instructor, getInstructors } from '../../models/users/instructor';
import { tryCatch } from '../../utils/tryCatch';
import CustomError from '../../utils/CustomError';

export const getAllUsers = tryCatch(async (_: Request, res: Response) => {
	const users = await getUsers()
		.populate({
			path: 'student',
			model: Student,
		})
		.populate({
			path: 'instructor',
			model: Instructor,
		});

	if (!users)
		throw new CustomError('Seems like there are no users registered in the system.', 404);

	return res.status(200).json(users);
});

export const deleteAllUsers = tryCatch(async (_: Request, res: Response) => {
	await deleteUsers();
	return res.status(200).json({ message: 'Users existing in the system deleted.' });
});

export const deleteUser = tryCatch(async (req: Request, res: Response) => {
	const { id } = req.params;
	const userToDelete = await deleteUserById(id);
	if (!userToDelete)
		throw new CustomError(
			'Seems like the user that you are trying to delete does not exist.',
			404
		);

	return res.status(200).json({ message: 'User deleted.' });
});

export const activateUser = tryCatch(async (req: Request, res: Response) => {
	const { id } = req.params;
	const user = await getUserById(id);
	if (!user)
		throw new CustomError(
			'Seems like the user account that you are trying to activate does not exist.',
			400
		);

	user.isActive = true;
	user.loginFailedAttempts = 0;
	await user.save();
	return res.status(200).json({ message: 'User account activated.' });
});

export const createUser = tryCatch(async (req: Request, res: Response) => {
	const user = new User(req.body);
	const newUser = await user.save();
	return res.status(201).json(newUser);
});

export const getAllStudents = tryCatch(async (_: Request, res: Response) => {
	const students = await getStudents();
	if (!students)
		throw new CustomError('Seems like there are no students registered in the system.', 404);

	return res.status(200).json(students);
});

export const getAllInstructors = tryCatch(async (_: Request, res: Response) => {
	const instructors = await getInstructors();
	if (!instructors)
		throw new CustomError('Seems like there are no instructors registered in the system.', 404);

	return res.status(200).json(instructors);
});
