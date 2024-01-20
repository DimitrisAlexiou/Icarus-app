import jwt from 'jsonwebtoken';
import { Response } from 'express';
import { AuthenticatedRequest } from '../../interfaces/AuthRequest';
import { generateToken } from '../../middleware/authMiddleware';
import { revokedTokens } from '../../middleware/authMiddleware';

// export const refreshToken = async (req: Request, res: Response) => {
// 	// Assuming the refresh token is stored in a cookie
// 	const refreshToken: string | undefined = req.cookies.refreshToken;

// 	// Verify the refresh token
// 	try {
// 		const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET_KEY!) as { id: string };
// 		const userId = decoded.id;

// 		// Generate a new access token
// 		const newAccessToken = generateToken({ id: userId });
// 		// const newAccessToken = generateToken({ id: userId }, res);

// 		return res.status(200).json({ accessToken: newAccessToken });
// 	} catch (error) {
// 		console.error('❌ Error while refreshing token: ', error);
// 		return res
// 			.status(401)
// 			.json({ message: 'Invalid or expired refresh token. Please log in again.' });
// 	}
// };

export const revokeToken = async (req: AuthenticatedRequest, res: Response) => {
	// Assuming the token is stored in a cookie
	const token = req.cookies.token;

	// Add the token to the blacklist
	revokedTokens.push(token);

	res.status(200).json({ message: 'Token revoked successfully.' });
};
