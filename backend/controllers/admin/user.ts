import { Request, Response } from 'express';
import { User, getUsers, getUserById, deleteUserById, deleteUsers } from '../../models/users/user';
import { Student, getStudents } from '../../models/users/student';
import { Instructor, getInstructors } from '../../models/users/instructor';

export const getAllUsers = async (_: Request, res: Response) => {
	try {
		const users = await getUsers()
			.populate({
				path: 'student',
				model: Student,
			})
			.populate({
				path: 'instructor',
				model: Instructor,
			});
		if (!users) return res.status(404).json({ message: 'Seems like there are no users.' });
		else return res.status(200).json(users);
	} catch (error) {
		console.error('❌ Error while finding users: ', error);
		return res.status(500).json({
			message: 'Something went wrong, try again later.',
		});
	}
};

export const deleteAllUsers = async (_: Request, res: Response) => {
	try {
		await deleteUsers();
		return res.status(200).json({ message: 'All users deleted.' });
	} catch (error) {
		console.error('❌ Error while deleting all users: ', error);
		return res.status(500).json({
			message: 'Something went wrong, unfortunately users did not deleted.',
		});
	}
};

export const deleteUser = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		await deleteUserById(id);
		return res.status(200).json({ message: 'User deleted.' });
	} catch (error) {
		console.error('❌ Error while deleting user: ', error);
		return res.status(500).json({
			message: 'Something went wrong, unfortunately user did not deleted.',
		});
	}
};

export const activateUser = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const user = await getUserById(id);
		if (user) {
			user.isActive = true;
			user.loginFailedAttempts = 0;
			await user.save();
			return res.status(200).json({ message: 'User account activated.' });
		} else {
			return res.status(400).json({ message: 'User not found.' });
		}
	} catch (error) {
		console.error('❌ Error while activating user: ', error);
		return res.status(500).json({
			message: 'Something went wrong, unfortunately user did not activated.',
		});
	}
};

export const createUser = async (req: Request, res: Response) => {
	try {
		const user = new User(req.body);
		const newUser = await user.save();
		return res.status(201).json(newUser);
	} catch (error) {
		console.error('❌ Error while creating user: ', error);
		return res.status(500).json({
			message: 'Something went wrong, unfortunately user did not created.',
		});
	}
};

export const getAllStudents = async (_: Request, res: Response) => {
	try {
		const students = await getStudents();
		if (!students)
			return res.status(404).json({ message: 'Seems like there are no students.' });
		else return res.status(200).json(students);
	} catch (error) {
		console.error('❌ Error while finding students: ', error);
		return res.status(500).json({
			message: 'Something went wrong, try again later.',
		});
	}
};

export const getAllInstructors = async (_: Request, res: Response) => {
	try {
		const instructors = await getInstructors();
		if (!instructors)
			return res.status(404).json({ message: 'Seems like there are no instructors.' });
		else return res.status(200).json(instructors);
	} catch (error) {
		console.error('❌ Error while finding instructors: ', error);
		return res.status(500).json({
			message: 'Something went wrong, try again later.',
		});
	}
};
