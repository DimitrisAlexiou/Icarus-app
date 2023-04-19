import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import { User, getUserById, updateUserById } from '../../models/users/user';
import { generateToken } from '../../middleware/authMiddleware';

interface User {
	_id: string;
}

interface AuthenticatedRequest extends Request {
	user?: User;
}

export const resetPassword = async (req: AuthenticatedRequest, res: Response) => {
	try {
		const { oldPassword, newPassword } = req.body;
		const userId = req.user._id;

		// Check if old password matches the one stored in the database
		const user = await getUserById(userId);
		const passwordMatch = await bcrypt.compare(oldPassword, user.password);
		if (!passwordMatch) return res.status(401).json({ message: 'Invalid old password.' });

		// Check if the new password meets the requirements (e.g., length, complexity)
		const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[!@#$%^&*]).{8,}$/;
		if (!passwordRegex.test(newPassword))
			return res.status(400).json({ message: 'Invalid new password.' });

		// Hash the new password and update the user record in the database
		const salt = await bcrypt.genSalt(12);
		const hashedPassword = await bcrypt.hash(newPassword, salt);
		const updatedUser = await updateUserById(userId, {
			password: hashedPassword,
			$inc: { tokenVersion: 1 },
		});

		// Revoke all valid tokens attributed to the user
		// await User.updateOne({ _id: userId }, { $inc: { tokenVersion: 1 } });

		// Send an email to the user with the new password (optional)
		// const newRandomPassword = generateRandomPassword(); // your custom function
		// await sendEmail(
		// 	user.email,
		// 	'Your new password',
		// 	`Your new password is ${newRandomPassword}`
		// );

		// Sign a new JWT token with the updated user data and send it in the response
		const token = generateToken({ id: updatedUser._id });
		// res.setHeader('Authorization', `Bearer ${token}`);
		res.status(200).json({ updatedUser, token });
	} catch (error) {
		console.error(error);
		res.status(500).json({
			message: 'Something went wrong, unfortunately password did not reset.',
		});
	}
};
