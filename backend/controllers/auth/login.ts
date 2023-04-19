import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import { getUserByUsername } from '../../models/users/user';
import { Student } from '../../models/users/student';
import { Instructor } from '../../models/users/instructor';
import { generateToken } from '../../middleware/authMiddleware';

export const login = async (req: Request, res: Response) => {
	const { username, password } = req.body;

	if (!username || !password)
		return res.status(400).json({ message: 'Please fill in all the required fields.' });

	try {
		const user = await getUserByUsername(username).select('+password');
		if (user && (await bcrypt.compare(password, user.password))) {
			if (user.lastLogin === null && user.isActive === false) {
				return res
					.status(400)
					.json({ message: 'Account is not yet active, it will be available soon.' });
			} else if (user.lastLogin !== null && user.isActive === false) {
				return res.status(400).json({
					message: 'Account is deactivated, please contact the admin.',
				});
			} else {
				user.lastLogin = new Date();
				user.loginFailedAttempts = 0;
				await user.save();
				let userType;
				if (user.type === 'Student')
					userType = await Student.findOne({ _id: user.student }).select('-_id');
				else if (user.type === 'Instructor')
					userType = await Instructor.findOne({ _id: user.instructor }).select('-_id');
				return res
					.status(200)
					.json({ user, userType, token: generateToken({ id: user._id }) });
			}
		} else {
			if (user && user.lastLogin !== null && user.isActive === true) {
				user.loginFailedAttempts++;
				if (user.loginFailedAttempts >= 3) user.isActive = false;
				await user.save();
			} else if (user && user.lastLogin !== null && user.isActive === false) {
				return res.status(400).json({
					message: 'Account is deactivated, please contact the admin.',
				});
			}
			return res.status(401).json({ message: 'Invalid user credentials.' });
		}
	} catch (error) {
		console.error('❌ Error while finding existing user: ', error);
		return res.status(500).json({ message: 'Something went wrong, try again later.' });
	}
};
