import { Request, Response, NextFunction } from 'express';

interface CustomError extends Error {
	statusCode?: number;
}

export const errorHandler = (error: CustomError, _: Request, res: Response, next: NextFunction) => {
	const statusCode = res.statusCode < 400 ? 500 : res.statusCode;
	res.status(statusCode);
	res.json({
		message: error.message,
		stack: process.env.NODE_ENV === 'production' ? null : error.stack,
	});
};
