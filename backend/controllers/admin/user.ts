import { Request, Response } from 'express';
import { startSession } from 'mongoose';
import {
	getUsers,
	updateUserById,
	deleteUserById,
	deleteUsers,
	UserType,
	User,
} from '../../models/users/user';
import {
	Student,
	deleteStudentByUserId,
	deleteStudents,
	getStudents,
	updateStudentById,
} from '../../models/users/student';
import {
	Instructor,
	deleteInstructorByUserId,
	deleteInstructors,
	getInstructors,
	updateInstructorById,
} from '../../models/users/instructor';
import { deleteEvents } from '../../models/calendar';
import { deleteNotes } from '../../models/note';
import { tryCatch } from '../../utils/tryCatch';
import bcrypt from 'bcryptjs';
import CustomError from '../../utils/CustomError';

export const addUser = async (req: Request, res: Response): Promise<Response> => {
	const {
		name,
		surname,
		username,
		email,
		password,
		type,
		studentId,
		entranceYear,
		studentType,
		facultyType,
		degree,
		instructorEntranceYear,
	} = req.body;

	const session = await startSession();

	try {
		session.startTransaction();

		if (!name || !surname || !username || !email || !password) {
			if (type === UserType.student && (!studentId || !entranceYear || !studentType))
				throw new CustomError('Please fill in all the student required fields.', 400);
			else if (type === UserType.instructor && !facultyType)
				throw new CustomError('Please fill in all the instructor required fields.', 400);

			throw new CustomError('Please fill in all the required fields.', 400);
		}

		const userExists = await User.findOne({ email: email }).session(session);
		if (userExists)
			throw new CustomError('Seems like a user with this email already exists.', 400);

		const usernameTaken = await User.findOne({ username: username }).session(session);
		if (usernameTaken) throw new CustomError('Seems like this username is taken.', 400);

		const salt = await bcrypt.genSalt(12);
		const hashedPassword = await bcrypt.hash(password, salt);

		const user = new User({
			name,
			surname,
			username,
			email,
			password: hashedPassword,
			type,
			status: 'new',
		});

		await user.save({ session });

		if (user.type === UserType.student) {
			const student = new Student({
				studentId,
				studentType,
				entranceYear,
				user: user,
				status: 'new',
			});

			await student.save({ session });

			user.student = student._id;
			await user.save({ session });

			await session.commitTransaction();
			session.endSession();

			return res.status(201).json({ message: 'Student account created successfully.', user });
		} else if (user.type === UserType.instructor) {
			const instructor = new Instructor({
				facultyType,
				degree,
				instructorEntranceYear,
				user: user,
				status: 'new',
			});

			await instructor.save({ session });

			user.instructor = instructor._id;
			await user.save({ session });

			await session.commitTransaction();
			session.endSession();

			return res
				.status(201)
				.json({ message: 'Instructor account created successfully.', user });
		}
	} catch (error) {
		await session.abortTransaction();
		session.endSession();
		console.error('❌ ', error);
		throw new CustomError('Account did not created.', 500);
	}
};

export const getSystemUsers = tryCatch(async (_: Request, res: Response): Promise<Response> => {
	const users = await getUsers()
		.populate({
			path: 'student',
			model: Student,
		})
		.populate({
			path: 'instructor',
			model: Instructor,
		});

	if (!users.length)
		throw new CustomError('Seems like there are no users registered in the system.', 404);

	return res.status(200).json(users);
});

export const deleteSystemUsers = async (_: Request, res: Response): Promise<Response> => {
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
	let userToDelete;

	try {
		session.startTransaction();

		userToDelete = await deleteUserById(id, session);

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

	return res.status(200).json({ message: 'User deleted.', user: userToDelete._id });
};

export const updateUser = async (req: Request, res: Response): Promise<Response> => {
	const {
		username,
		name,
		surname,
		email,
		type,
		isAdmin,
		loginFailedAttempts,
		studentId,
		studentType,
		entranceYear,
		facultyType,
		degree,
		instructorEntranceYear,
	} = req.body;

	const session = await startSession();

	try {
		session.startTransaction();

		if (!name || !surname || !username || !email) {
			if (type === UserType.student && (!studentId || !entranceYear || !studentType)) {
				throw new CustomError('Please fill in all the student required fields.', 400);
			} else if (
				type === UserType.instructor &&
				(!facultyType || !degree || !instructorEntranceYear)
			) {
				throw new CustomError('Please fill in all the instructor required fields.', 400);
			}
			throw new CustomError('Please fill in all the user required fields.', 400);
		}

		const { id } = req.params;
		const updatedUser = await updateUserById(
			id,
			{
				name,
				surname,
				username,
				email,
				type,
				isAdmin,
				loginFailedAttempts,
			},
			{ session }
		);

		if (!updatedUser)
			throw new CustomError(
				'Seems like the user account that you are trying to update does not exist.',
				404
			);

		if (type === UserType.student) {
			const student = await updateStudentById(
				updatedUser.student.toString(),
				{
					studentId,
					studentType,
					entranceYear,
				},
				{ session }
			);

			if (!student) throw new CustomError('Student not found.', 404);

			await updatedUser.populate('student');
		} else if (type === UserType.instructor) {
			const instructor = await updateInstructorById(
				updatedUser.instructor.toString(),
				{
					facultyType,
					degree,
					instructorEntranceYear,
				},
				{ session }
			);

			if (!instructor) throw new CustomError('Instructor not found.', 404);

			await updatedUser.populate('instructor');
		}

		await session.commitTransaction();
		session.endSession();

		return res.status(200).json({ message: 'User account updated.', updatedUser });
	} catch (error) {
		await session.abortTransaction();
		session.endSession();
		console.error('❌ ', error);
		throw new CustomError('User account did not updated.', 500);
	}
};

export const activateUser = tryCatch(async (req: Request, res: Response): Promise<Response> => {
	const { id } = req.params;

	const activatedUser = await updateUserById(id, { isActive: true, loginFailedAttempts: 0 });
	if (!activatedUser)
		throw new CustomError(
			'Seems like the user account that you are trying to activate does not exist.',
			400
		);

	return res.status(200).json({ message: 'User account activated.', activatedUser });
});

export const deActivateUser = tryCatch(async (req: Request, res: Response): Promise<Response> => {
	const { id } = req.params;

	const deactivatedUser = await updateUserById(id, { isActive: false, loginFailedAttempts: 0 });
	if (!deactivatedUser)
		throw new CustomError(
			'Seems like the user account that you are trying to deactivate does not exist.',
			400
		);

	return res.status(200).json({ message: 'User account deactivated.', deactivatedUser });
});

export const getSystemStudents = tryCatch(async (_: Request, res: Response): Promise<Response> => {
	const students = await getStudents();
	if (!students.length)
		throw new CustomError('Seems like there are no students registered in the system.', 404);

	return res.status(200).json(students);
});

export const getSystemInstructors = tryCatch(
	async (_: Request, res: Response): Promise<Response> => {
		const instructors = await getInstructors();
		if (!instructors.length)
			throw new CustomError(
				'Seems like there are no instructors registered in the system.',
				404
			);

		return res.status(200).json(instructors);
	}
);
