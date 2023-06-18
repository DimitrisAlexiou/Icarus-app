import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import { UserProps, getUserById, updateUserById } from '../../models/users/user';
import { generateToken } from '../../middleware/authMiddleware';
import { tryCatch } from '../../utils/tryCatch';
import { passwordRegex } from '../../utils/constants';
import CustomError from '../../utils/CustomError';

interface AuthenticatedRequest extends Request {
	user?: UserProps;
}

export const changePassword = tryCatch(
	async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
		const { oldPassword, newPassword } = req.body;
		const userId = req.user._id;

		// Check if old password matches the one stored in the database
		const user = await getUserById(userId);
		const oldPasswordMatch = await bcrypt.compare(oldPassword, user.password);
		if (!oldPasswordMatch) throw new CustomError('Invalid old password.', 401);

		// Check if the new password is the same as the old password
		const newPasswordMatch = await bcrypt.compare(newPassword, user.password);
		if (newPasswordMatch) {
			throw new CustomError('New password must be different from the old password.', 400);
		}

		// Check if the new password meets the requirements (e.g., length, complexity)
		const passwordValidation = passwordRegex;
		if (!passwordValidation.test(newPassword))
			throw new CustomError('Invalid new password.', 400);

		// Hash the new password and update the user record in the database
		const salt = await bcrypt.genSalt(12);
		const hashedPassword = await bcrypt.hash(newPassword, salt);
		// Update the user with the new password and revoke all valid tokens attributed to the user
		const updatedUser = await updateUserById(userId, {
			password: hashedPassword,
			$inc: { tokenVersion: 1 },
		});

		// Send an email to the user with the new password (optional)
		// const newRandomPassword = generateRandomPassword();
		// await sendEmail(
		// 	user.email,
		// 	'Your new password',
		// 	`Your new password is ${newRandomPassword}`
		// );

		// Sign a new JWT token with the updated user data and send it in the response
		return res.status(200).json({ updatedUser, token: generateToken({ id: updatedUser._id }) });
		// .json({ updatedUser, token: generateToken(res, { id: updatedUser._id }) });
	}
);
