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

		const user = await getUserByUsername(username).select('+password');
		if (user && (await bcrypt.compare(password, user.password))) {
			if (user.lastLogin === null && user.isActive === false) {
				throw new CustomError(
					'Account is not yet active, it will be available soon.',
					400
				);
			} else if (user.lastLogin !== null && user.isActive === false) {
				throw new CustomError(
					'Account is deactivated due to three login failed attempts, please contact the admin.',
					400
				);
			} else {
				user.lastLogin = new Date();
				user.loginFailedAttempts = 0;
				await user.save();
				if (user.type === UserType.student) await user.populate('student');
				else if (user.type === UserType.instructor)
					await user.populate('instructor');
				return res
					.status(200)
					.json({ user, token: generateToken({ id: user._id }) });
				// return res.status(200).json({ user, token: generateToken(res, { id: user._id }) });
			}
		} else {
			if (user && user.lastLogin !== null && user.isActive === true) {
				user.loginFailedAttempts++;
				if (user.loginFailedAttempts >= 3) {
					user.isActive = false;
					await user.save();
					throw new CustomError(
						'Account is deactivated due to three login failed attempts, please contact the admin.',
						400
					);
				} else {
					await user.save();
				}
			} else if (user && user.lastLogin !== null && user.isActive === false) {
				throw new CustomError(
					'Account is deactivated due to three login failed attempts, please contact the admin.',
					400
				);
			}
			throw new CustomError('Invalid user credentials.', 401);
		}
	}
);
