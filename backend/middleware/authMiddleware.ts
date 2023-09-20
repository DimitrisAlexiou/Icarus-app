import { Request, Response, NextFunction } from 'express';
import { Types } from 'mongoose';
import { User, getUserById } from '../models/users/user';
import { merge, get } from 'lodash';
import { rateLimit } from 'express-rate-limit';
import jwt from 'jsonwebtoken';

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

export const generateToken = (payload: Payload) => {
	return jwt.sign({ id: payload.id }, process.env.JWT_SECRET_KEY!, {
		expiresIn: '2h',
	});
};

// export const generateToken = (res: Response, payload: Payload) => {
// 	const token = jwt.sign({ id: payload.id }, process.env.JWT_SECRET_KEY!, {
// 		expiresIn: 7200,
// 	});

// 	res.cookie('token', token, {
// 		httpOnly: true,
// 		secure: process.env.NODE_ENV !== 'development',
// 		sameSite: 'strict',
// 		maxAge: 2 * 24 * 60 * 60 * 1000,
// 	});
// };

export const authorize = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
	let token: string | undefined;

	if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
		try {
			token = req.headers.authorization.split(' ')[1];
			const decoded = jwt.verify(token as string, process.env.JWT_SECRET_KEY! as string) as {
				id: string;
			};
			req.user = (await getUserById(decoded.id).select('-password')) as User;

			if (!req.user)
				return res
					.status(401)
					.json({ message: 'Unauthorized access. Please log in first.' });

			merge(req, { identity: req.user });
			next();
		} catch (error) {
			if (error instanceof jwt.TokenExpiredError) {
				// console.error('❌ TokenExpiredError: '.red.bold, error);
				return res.status(401).json({ message: 'Token has expired. Please log in again.' });
			}
			console.error('❌ Error while authorizing user: '.red.bold, error);
			return res.status(401).json({ message: 'Unauthorized access. Please log in first.' });
		}
	}

	if (!token) return res.status(401).json({ message: 'Token is missing. Please log in first.' });
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
		if (!req.user)
			return res.status(401).json({ message: 'Unauthorized access! Please login first.' });

		// check if user has any of the allowed roles
		if (!allowedRoles.includes(req.user.type))
			return res.status(403).json({ message: 'Forbidden! Cannot access this resource.' });

		// user has one of the allowed roles, call next middleware function
		next();
	};
};

export const isOwner = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
	try {
		const userId = req.user.id;
		const currentUserId = get(req, 'identity._id') as string;

		if (!currentUserId) return res.status(400);

		if (currentUserId.toString() !== userId)
			return res.status(403).json({ message: 'Forbidden! Cannot access this resource.' });

		next();
	} catch (error) {
		console.error('❌ Error while checking user ownership: '.red.bold, error);
		return res.status(400);
	}
};

// Maintain a blacklist of revoked tokens
export const revokedTokens: string[] = [];

// Middleware to check token revocation status
export const checkTokenRevocation = (
	req: AuthenticatedRequest,
	res: Response,
	next: NextFunction
) => {
	// Assuming the token is stored in a cookie
	const token = req.cookies.token;

	if (revokedTokens.includes(token))
		return res.status(401).json({ message: 'Token has been revoked. Please log in again.' });

	next();
};

// Generate a refresh token along with the access token
export const generateTokens = (payload: Payload, res: Response) => {
	const accessToken = jwt.sign({ id: payload.id }, process.env.JWT_SECRET_KEY!, {
		expiresIn: '2h',
	});
	const refreshToken = jwt.sign({ id: payload.id }, process.env.JWT_SECRET_KEY!, {
		expiresIn: '7d',
	});

	// Set the refresh token as a cookie
	res.cookie('refreshToken', refreshToken, {
		httpOnly: true,
		secure: process.env.NODE_ENV !== 'development',
		sameSite: 'strict',
		maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
	});

	return accessToken;
};
