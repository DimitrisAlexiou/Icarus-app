import { Request, Response } from 'express';
import { startSession } from 'mongoose';
import { getUsers, updateUserById, deleteUserById, deleteUsers } from '../../models/users/user';
import {
	Student,
	deleteStudentByUserId,
	deleteStudents,
	getStudents,
} from '../../models/users/student';
import {
	Instructor,
	deleteInstructorByUserId,
	deleteInstructors,
	getInstructors,
} from '../../models/users/instructor';
import { deleteEvents } from '../../models/calendar';
import { deleteNotes } from '../../models/note';
import { tryCatch } from '../../utils/tryCatch';
import CustomError from '../../utils/CustomError';

export const getAllUsers = tryCatch(async (_: Request, res: Response): Promise<Response> => {
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

export const deleteAllUsers = async (_: Request, res: Response): Promise<Response> => {
	const session = await startSession();

	try {
		session.startTransaction();

		await deleteUsers();
		await deleteInstructors();
		await deleteStudents();

		await session.commitTransaction();
	} catch (error) {
		await session.abortTransaction();
		console.error('❌ ', error);
		throw new CustomError('Users did not deleted.', 500);
	} finally {
		session.endSession();
	}

	return res.status(200).json({ message: 'Users existing in the system deleted.' });
};

export const deleteUser = async (req: Request, res: Response): Promise<Response> => {
	const { id } = req.params;
	const session = await startSession();

	try {
		session.startTransaction();

		const userToDelete = await deleteUserById(id, session);

		if (!userToDelete)
			throw new CustomError(
				'Seems like the user that you are trying to delete does not exist.',
				404
			);

		if (userToDelete.type === 'Student') await deleteStudentByUserId(id, session);

		if (userToDelete.type === 'Instructor') await deleteInstructorByUserId(id, session);

		await deleteEvents(id, session);
		await deleteNotes(id, session);

		await session.commitTransaction();
	} catch (error) {
		await session.abortTransaction();
		console.error('❌ ', error);
		throw new CustomError('User did not deleted.', 500);
	} finally {
		session.endSession();
	}

	return res.status(200).json({ message: 'User deleted.' });
};

export const activateUser = tryCatch(async (req: Request, res: Response): Promise<Response> => {
	const { id } = req.params;

	const user = await updateUserById(id, { isActive: true, loginFailedAttempts: 0 });
	if (!user)
		throw new CustomError(
			'Seems like the user account that you are trying to activate does not exist.',
			400
		);

	return res.status(200).json({ message: 'User account activated.', user });
});

export const deActivateUser = tryCatch(async (req: Request, res: Response): Promise<Response> => {
	const { id } = req.params;

	const user = await updateUserById(id, { isActive: false, loginFailedAttempts: 0 });
	if (!user)
		throw new CustomError(
			'Seems like the user account that you are trying to deactivate does not exist.',
			400
		);

	return res.status(200).json({ message: 'User account deactivated.', user });
});

export const getAllStudents = tryCatch(async (_: Request, res: Response): Promise<Response> => {
	const students = await getStudents();
	if (!students)
		throw new CustomError('Seems like there are no students registered in the system.', 404);

	return res.status(200).json(students);
});

export const getAllInstructors = tryCatch(async (_: Request, res: Response): Promise<Response> => {
	const instructors = await getInstructors();
	if (!instructors)
		throw new CustomError('Seems like there are no instructors registered in the system.', 404);

	return res.status(200).json(instructors);
});
