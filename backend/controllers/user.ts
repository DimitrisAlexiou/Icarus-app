import { Request, Response } from 'express';
import { updateUserById, deleteUserById, getUserById } from '../models/users/user';
import { Student } from '../models/users/student';
import { Instructor } from '../models/users/instructor';

interface User {
	id: string;
}

interface AuthenticatedRequest extends Request {
	user?: User;
}

export const viewProfile = async (req: AuthenticatedRequest, res: Response) => {
	try {
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
			return res.status(404).json({ message: 'Seems like there is no user with this ID.' });
		else return res.status(200).json(user);
	} catch (error) {
		console.error('❌ Error while finding user', error);
		return res.status(500).json({ message: 'Something went wrong, try again later.' });
	}
};

export const updateProfile = async (req: AuthenticatedRequest, res: Response) => {
	try {
		const id = req.user.id;
		const user = await updateUserById(id, req.body);
		return res.status(200).json(user);
	} catch (error) {
		console.error('❌ Error while finding user', error);
		return res.status(500).json({ message: 'Something went wrong, try again later.' });
	}
};

export const deleteUser = async (req: AuthenticatedRequest, res: Response) => {
	try {
		const id = req.user.id;
		await deleteUserById(id);
		return res.status(200).json({ message: 'User deleted.' });
	} catch (error) {
		console.error('❌ Error while deleting user', error);
		return res
			.status(500)
			.json({ message: 'Something went wrong, unfortunately account did not deleted.' });
	}
};
