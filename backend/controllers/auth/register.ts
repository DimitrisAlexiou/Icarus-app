import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import { User, createUser, deleteUserById } from '../../models/users/user';
import { Student } from '../../models/users/student';
import { Instructor } from '../../models/users/instructor';
import { generateToken } from '../../middleware/authMiddleware';

export const register = async (req: Request, res: Response) => {
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

	if (!name || !surname || !username || !email || !password) {
		if (!type && type === 'Student') {
			if (!studentId || !entranceYear || !studentType)
				return res
					.status(400)
					.json({ message: 'Please fill in all the student required fields.' });
		} else if (!type && type === 'Instructor') {
			if (!facultyType)
				return res
					.status(400)
					.json({ message: 'Please fill in all the instructor required fields.' });
		}
		return res.status(400).json({ message: 'Please fill in all the required fields.' });
	}

	try {
		const userExists = await User.findOne({ email: email });
		if (userExists) {
			return res
				.status(400)
				.json({ message: 'Seems like a user with this email already exists.' });
		} else {
			try {
				const usernameTaken = await User.findOne({ username: username });
				if (usernameTaken) {
					return res.status(400).json({ message: 'Seems like this username is taken.' });
				} else {
					try {
						const salt = await bcrypt.genSalt(12);
						const hashedPassword = await bcrypt.hash(password, salt);
						const user = await User.create({
							name,
							surname,
							username,
							email,
							password: hashedPassword,
							type,
							status: 'new',
						});
						if (user) {
							if (user.type === 'Student') {
								try {
									const student = await Student.create({
										studentId,
										studentType,
										entranceYear,
										user: user,
										status: 'new',
									});
									if (student) {
										user.student = student._id;
										await user.save();
										return res
											.status(201)
											.json({ user, token: generateToken({ id: user._id }) });
									} else {
										await deleteUserById(user._id.toString());
										return res
											.status(400)
											.json({ message: 'Invalid student data.' });
									}
								} catch (error) {
									await deleteUserById(user._id.toString());
									console.error('❌ Error while creating student: ', error);
									return res.status(500).json({
										message:
											'Something went wrong, unfortunately account did not created.',
									});
								}
							} else if (user.type === 'Instructor') {
								try {
									const instructor = await Instructor.create({
										facultyType,
										degree,
										instructorEntranceYear,
										user: user,
										status: 'new',
									});
									if (instructor) {
										user.instructor = instructor._id;
										await user.save();
										return res
											.status(201)
											.json({ user, token: generateToken({ id: user._id }) });
									} else {
										await deleteUserById(user._id.toString());
										return res
											.status(400)
											.json({ message: 'Invalid instructor data.' });
									}
								} catch (error) {
									await deleteUserById(user._id.toString());
									console.error('❌ Error while creating instructor: ', error);
									return res.status(500).json({
										message:
											'Something went wrong, unfortunately account did not created.',
									});
								}
							}
						} else {
							return res.status(400).json({ message: 'Invalid user data.' });
						}
					} catch (error) {
						console.error('❌ Error while creating user: ', error);
						return res.status(500).json({
							message:
								'Something went wrong, unfortunately user account did not created.',
						});
					}
				}
			} catch (error) {
				console.error('❌ Error while checking if username is taken: ', error);
				return res.status(500).json({
					message: 'Something went wrong, try again later.',
				});
			}
		}
	} catch (error) {
		console.error('❌ Error while finding existing user: ', error);
		return res.status(500).json({ message: 'Something went wrong, try again later.' });
	}
};
