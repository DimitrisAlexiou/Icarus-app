import { Request, Response } from 'express';
import { updateUserById, getUserById, UserProps, UserType } from '../models/users/user';
import { Student } from '../models/users/student';
import { Instructor } from '../models/users/instructor';
import { tryCatch } from '../utils/tryCatch';
import CustomError from '../utils/CustomError';

interface AuthenticatedRequest extends Request {
	user?: UserProps;
}

export const viewProfile = tryCatch(
	async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
		const id = req.user.id;
		const user = await getUserById(id);

		if (!user)
			throw new CustomError(
				'Seems like the user that you are trying to view does not exist.',
				404
			);

		if (user.type === UserType.student)
			await user.populate({
				path: 'student',
				model: Student,
			});

		if (user.type === UserType.instructor)
			await user.populate({
				path: 'instructor',
				model: Instructor,
			});

		return res.status(200).json(user);
	}
);

export const updateProfile = tryCatch(
	async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
		const id = req.user.id;
		const user = await updateUserById(id, { ...req.body });

		if (!user)
			throw new CustomError(
				'Seems like the user that you are trying to update does not exist.',
				404
			);

		return res.status(200).json(user);
	}
);
