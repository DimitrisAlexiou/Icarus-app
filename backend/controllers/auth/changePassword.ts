import bcrypt from 'bcryptjs';
import { Response } from 'express';
import { AuthenticatedRequest } from '../../interfaces/AuthRequest';
import { getUserById, updateUserById } from '../../models/users/user';
import { generateToken, revokedTokens } from '../../middleware/authMiddleware';
import { tryCatch } from '../../utils/tryCatch';
import { passwordRegex } from '../../utils/constants';
import CustomError from '../../utils/CustomError';

export const changePassword = tryCatch(
	async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
		const { newPassword } = req.body;
		const userId = req.user.id;

		// Check if old password matches the one stored in the database
		const user = await getUserById(userId);
		if (!user)
			return res
				.status(401)
				.json({ message: 'Unauthorized access. Please log in first.' });

		const oldPasswordMatch = await bcrypt.compare(newPassword, user.password);
		if (!oldPasswordMatch) throw new CustomError('Invalid old password.', 401);

		// Check if the new password is the same as the old password
		const newPasswordMatch = await bcrypt.compare(newPassword, user.password);
		if (newPasswordMatch)
			return res.status(400).json({
				message: 'New password must be different from the old password.',
			});
		// throw new CustomError('New password must be different from the old password.', 400);

		// Check if the new password meets the requirements (e.g., length, complexity)
		const passwordValidation = passwordRegex;
		if (!passwordValidation.test(newPassword))
			return res.status(400).json({ message: 'Invalid new password.' });
		// throw new CustomError('Invalid new password.', 400);

		// Hash the new password and update the user record in the database
		const salt = await bcrypt.genSalt(12);
		const newHashedPassword = await bcrypt.hash(newPassword, salt);
		// Update the user with the new password and revoke all valid tokens attributed to the user
		const updatedUser = await updateUserById(userId, {
			password: newHashedPassword,
			tokenVersion: 1,
		});

		// Revoke the user's token by adding it to the revokedTokens array
		const tokenToRevoke = req.headers.authorization.split(' ')[1];
		revokedTokens.push(tokenToRevoke);

		// Send an email to the user with the new password (optional)
		// const newRandomPassword = generateRandomPassword();
		// await sendEmail(
		// 	user.email,
		// 	'Your new password',
		// 	`Your new password is ${newRandomPassword}`
		// );

		// Sign a new JWT token with the updated user data and send it in the response
		return res.status(200).json({
			updatedUser,
			message: 'Password changed successfully.',
			token: generateToken({ id: updatedUser._id }),
		});
	}
);
