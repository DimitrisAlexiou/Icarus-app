import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import { UserType, getUserByUsername } from '../../models/users/user';
import { generateToken } from '../../middleware/authMiddleware';
import { tryCatch } from '../../utils/tryCatch';
import CustomError from '../../utils/CustomError';

export const login = tryCatch(
	async (req: Request, res: Response): Promise<Response> => {
		const { username, password } = req.body;

		if (!username || !password)
			throw new CustomError('Please fill in all the required fields.', 400);

		const retrievedUser = await getUserByUsername(username).select('+password');
		if (
			retrievedUser &&
			(await bcrypt.compare(password, retrievedUser.password))
		) {
			if (
				retrievedUser.lastLogin === null &&
				retrievedUser.isActive === false
			) {
				throw new CustomError(
					'Account is not yet active, it will be available soon.',
					400
				);
			} else if (
				retrievedUser.lastLogin !== null &&
				retrievedUser.isActive === false
			) {
				throw new CustomError(
					'Account is deactivated due to three login failed attempts, please contact the admin.',
					400
				);
			} else {
				retrievedUser.lastLogin = new Date();
				retrievedUser.loginFailedAttempts = 0;
				await retrievedUser.save();
				if (retrievedUser.type === UserType.student)
					await retrievedUser.populate('student');
				else if (retrievedUser.type === UserType.instructor)
					await retrievedUser.populate('instructor');

				const { password, ...user } = retrievedUser.toObject();
				return res.status(200).json({
					user,
					token: generateToken({ id: retrievedUser._id }),
				});
				// return res.status(200).json({ retrievedUser, token: generateToken(res, { id: retrievedUser._id }) });
			}
		} else {
			if (
				retrievedUser &&
				retrievedUser.lastLogin !== null &&
				retrievedUser.isActive === true
			) {
				retrievedUser.loginFailedAttempts++;
				if (retrievedUser.loginFailedAttempts >= 3) {
					retrievedUser.isActive = false;
					await retrievedUser.save();
					throw new CustomError(
						'Account is deactivated due to three login failed attempts, please contact the admin.',
						400
					);
				} else {
					await retrievedUser.save();
				}
			} else if (
				retrievedUser &&
				retrievedUser.lastLogin !== null &&
				retrievedUser.isActive === false
			) {
				throw new CustomError(
					'Account is deactivated due to three login failed attempts, please contact the admin.',
					400
				);
			}
			throw new CustomError('Invalid user credentials.', 401);
		}
	}
);
