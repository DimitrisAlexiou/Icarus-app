import { Request, Response, NextFunction } from 'express';
import { Types } from 'mongoose';
import rateLimit from 'express-rate-limit';
import jwt from 'jsonwebtoken';
import { User, getUserById } from '../models/users/user';
import { merge, get } from 'lodash';
import ExpressError from '../utils/expressError';

interface User {
	id?: string;
	type: string;
}

interface AuthenticatedRequest extends Request {
	user?: User;
}

interface Payload {
	id: Types.ObjectId;
}

export const generateToken = (payload: Payload): string => {
	return jwt.sign({ id: payload.id }, process.env.JWT_SECRET_KEY!, {
		expiresIn: 7200,
		// expiresIn: process.env.JWT_EXPIRES,
	});
};

export const authorize = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
	let token: string | undefined;

	if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
		try {
			token = req.headers.authorization.split(' ')[1];
			const decoded = jwt.verify(token as string, process.env.JWT_SECRET_KEY! as string) as {
				id: string;
			};
			req.user = (await getUserById(decoded.id).select('-password')) as User;

			if (!req.user) {
				res.status(401).json({ message: 'Unauthorized access. Please log in first.' });
				throw new ExpressError('❌ Not authorized!', 401);
			}
			merge(req, { identity: req.user });
			next();
		} catch (error) {
			if (error instanceof jwt.TokenExpiredError) {
				console.error('❌ TokenExpiredError: '.red.bold, error);
				return res.status(401).json({ message: 'Token has expired. Please log in again.' });
			}
			console.error('❌ Error while authorizing user: '.red.bold, error);
			res.status(401).json({ message: 'Unauthorized access. Please log in first.' });
			throw new ExpressError('❌ Not authorized!', 401);
		}
	}

	if (!token) {
		res.status(401).json({ message: 'Token is missing. Please log in first.' });
		throw new ExpressError('❌ Not authorized!', 401);
	}
};

// Limit requests to 5 per hour
export const resetPasswordLimiter = rateLimit({
	windowMs: 60 * 60 * 1000, // 1 hour
	max: 5,
	message: 'Too many password reset attempts, please try again later.',
});

export const checkUserRole = (allowedRoles: string[]) => {
	return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
		// check if user is authenticated
		if (!req.user) {
			return res.status(401).json({ message: 'Unauthorized! Please login first.' });
		}
		// check if user has any of the allowed roles
		if (!allowedRoles.includes(req.user.type)) {
			return res.status(403).json({ message: 'Forbidden' });
		}

		// user has one of the allowed roles, call next middleware function
		next();
	};
};

export const isOwner = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
	try {
		const userId = req.user.id;
		const currentUserId = get(req, 'identity._id') as string;

		if (!currentUserId) {
			return res.status(400);
		}

		if (currentUserId.toString() !== userId) {
			return res.status(403);
		}
		next();
	} catch (error) {
		console.log(error);
		return res.status(400);
	}
};
