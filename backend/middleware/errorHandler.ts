import { Request, Response, NextFunction } from 'express';
import CustomError from '../utils/CustomError';

const errorHandler = (error: CustomError, req: Request, res: Response, next: NextFunction) => {
	console.error('❌ ', error);

	if (error.statusCode === undefined)
		return res.status(500).json({ message: 'Something went wrong, try again later.' });

	return res.status(error.statusCode).json({
		message: error.message,
	});
};

export default errorHandler;
