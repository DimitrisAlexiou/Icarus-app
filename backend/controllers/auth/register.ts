import { startSession } from 'mongoose';
import { Request, Response } from 'express';
import { User, UserType } from '../../models/users/user';
import { Student } from '../../models/users/student';
import { Instructor } from '../../models/users/instructor';
import { generateToken } from '../../middleware/authMiddleware';
import bcrypt from 'bcryptjs';
import CustomError from '../../utils/CustomError';

export const register = async (
	req: Request,
	res: Response
): Promise<Response> => {
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
			if (
				type === UserType.student &&
				(!studentId || !entranceYear || !studentType)
			)
				throw new CustomError(
					'Please fill in all the student required fields.',
					400
				);
			else if (type === UserType.instructor && !facultyType)
				throw new CustomError(
					'Please fill in all the instructor required fields.',
					400
				);

			throw new CustomError('Please fill in all the required fields.', 400);
		}

		const userExists = await User.findOne({ email: email }).session(session);
		if (userExists)
			throw new CustomError(
				'Seems like a user with this email already exists.',
				400
			);

		const usernameTaken = await User.findOne({ username: username }).session(
			session
		);
		if (usernameTaken)
			throw new CustomError('Seems like this username is taken.', 400);

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

			return res
				.status(201)
				.json({ user, token: generateToken({ id: user._id }) });
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
				.json({ user, token: generateToken({ id: user._id }) });
		}
	} catch (error) {
		await session.abortTransaction();
		session.endSession();
		console.error('❌ ', error);
		throw new CustomError('Account did not created.', 500);
	}
};

// export const register = tryCatch(async (req: Request, res: Response): Promise<Response> => {
// 	const {
// 		name,
// 		surname,
// 		username,
// 		email,
// 		password,
// 		type,
// 		studentId,
// 		entranceYear,
// 		studentType,
// 		facultyType,
// 		degree,
// 		instructorEntranceYear,
// 	} = req.body;

// 	if (!name || !surname || !username || !email || !password) {
// 		if (type === UserType.student && (!studentId || !entranceYear || !studentType)) {
// 			throw new CustomError('Please fill in all the student required fields.', 400);
// 		} else if (type === UserType.instructor && !facultyType) {
// 			throw new CustomError('Please fill in all the instructor required fields.', 400);
// 		}
// 		throw new CustomError('Please fill in all the required fields.', 400);
// 	}

// 	const userExists = await User.findOne({ email: email });
// 	if (userExists) throw new CustomError('Seems like a user with this email already exists.', 400);

// 	const usernameTaken = await User.findOne({ username: username });
// 	if (usernameTaken) throw new CustomError('Seems like this username is taken.', 400);

// 	const salt = await bcrypt.genSalt(12);
// 	const hashedPassword = await bcrypt.hash(password, salt);

// 	const user = await User.create({
// 		name,
// 		surname,
// 		username,
// 		email,
// 		password: hashedPassword,
// 		type,
// 		status: 'new',
// 	});

// 	if (!user) throw new CustomError('Invalid user data.', 400);

// 	if (user.type === UserType.student) {
// 		try {
// 			const student = await Student.create({
// 				studentId,
// 				studentType,
// 				entranceYear,
// 				user: user,
// 				status: 'new',
// 			});
// 			if (!student) throw new CustomError('Invalid student data.', 400);

// 			user.student = student._id;
// 			await user.save();
// 			return res.status(201).json({ user, token: generateToken({ id: user._id }) });
// 			// return res.status(201).json({ user, token: generateToken(res, { id: user._id }) });
// 		} catch (error) {
// 			await deleteUserById(user._id.toString());
// 			console.error('❌ Error while creating student: ', error);
// 			return res.status(500).json({
// 				message: 'Something went wrong, unfortunately account did not created.',
// 			});
// 		}
// 	} else if (user.type === UserType.instructor) {
// 		try {
// 			const instructor = await Instructor.create({
// 				facultyType,
// 				degree,
// 				instructorEntranceYear,
// 				user: user,
// 				status: 'new',
// 			});
// 			if (!instructor) throw new CustomError('Invalid instructor data.', 400);

// 			user.instructor = instructor._id;
// 			await user.save();
// 			return res.status(201).json({ user, token: generateToken({ id: user._id }) });
// 			// return res.status(201).json({ user, token: generateToken(res, { id: user._id }) });
// 		} catch (error) {
// 			await deleteUserById(user._id.toString());
// 			console.error('❌ Error while creating instructor: ', error);
// 			return res.status(500).json({
// 				message: 'Something went wrong, unfortunately account did not created.',
// 			});
// 		}
// 	}
// });
