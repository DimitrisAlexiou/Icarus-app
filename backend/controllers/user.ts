import { Request, Response } from 'express';
import { updateUserById, deleteUserById, getUserById, UserProps } from '../models/users/user';
import { Student } from '../models/users/student';
import { Instructor } from '../models/users/instructor';
import { tryCatch } from '../utils/tryCatch';
import CustomError from '../utils/CustomError';

interface AuthenticatedRequest extends Request {
	user?: UserProps;
}

export const viewProfile = tryCatch(async (req: AuthenticatedRequest, res: Response) => {
	const id = req.user.id;
	const user = await getUserById(id)
		.populate({
			path: 'student',
			model: Student,
		})
		.populate({
			path: 'instructor',
			model: Instructor,
		});

	if (!user)
		throw new CustomError(
			'Seems like the user that you are trying to view does not exist.',
			404
		);

	return res.status(200).json(user);
});

export const updateProfile = tryCatch(async (req: AuthenticatedRequest, res: Response) => {
	const id = req.user.id;
	const user = await updateUserById(id, { ...req.body });

	if (!user)
		throw new CustomError(
			'Seems like the user that you are trying to update does not exist.',
			404
		);

	return res.status(200).json(user);
});

export const deleteUser = tryCatch(async (req: AuthenticatedRequest, res: Response) => {
	const id = req.user.id;
	const userToDelete = await deleteUserById(id);

	if (!userToDelete)
		throw new CustomError(
			'Seems like the user that you are trying to delete does not exist.',
			404
		);

	return res.status(200).json({ message: 'User deleted.' });
});
