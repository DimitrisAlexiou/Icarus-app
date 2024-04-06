import { Response } from 'express';
import { startSession } from 'mongoose';
import { AuthenticatedRequest } from '../interfaces/AuthRequest';
import { updateUserById, getUserById, UserType } from '../models/users/user';
import { Student, getStudentPassedTeachings } from '../models/users/student';
import { Instructor, updateInstructorById } from '../models/users/instructor';
import { tryCatch } from '../utils/tryCatch';
import CustomError from '../utils/CustomError';

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

export const updateProfile = async (
	req: AuthenticatedRequest,
	res: Response
): Promise<Response> => {
	const { username, name, surname, email, type, degree } = req.body;

	const session = await startSession();

	try {
		session.startTransaction();

		if (!name || !surname || !username || !email) {
			if (type === UserType.instructor && !degree)
				throw new CustomError('Please provide the instructor degree.', 400);

			throw new CustomError(
				'Please fill in all the user required fields.',
				400
			);
		}

		const { id } = req.params;

		const updatedUser = await updateUserById(
			id,
			{ name, surname, username, email },
			{ session }
		);

		if (!updatedUser)
			throw new CustomError(
				'Seems like the user profile that you are trying to update does not exist.',
				404
			);

		if (type === UserType.instructor) {
			const instructor = await updateInstructorById(
				updatedUser.instructor.toString(),
				{
					degree,
				},
				{ session }
			);

			if (!instructor)
				throw new CustomError('Instructor profile not found.', 404);

			await updatedUser.populate('instructor');
		}

		await session.commitTransaction();
		session.endSession();

		return res
			.status(200)
			.json({ message: 'User profile updated.', updatedUser });
	} catch (error) {
		await session.abortTransaction();
		session.endSession();
		console.error('❌ ', error);
		throw new CustomError('User profile did not updated.', 500);
	}
};

export const viewPassedTeachings = tryCatch(
	async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
		const id = req.user.id;
		const user = await getStudentPassedTeachings(id);

		if (!user)
			throw new CustomError(
				'Seems like the user that you are trying to view does not exist.',
				404
			);

		return res.status(200).json(user);
	}
);
