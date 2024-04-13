import { Request, Response, NextFunction } from 'express';

export const addCsrfTokenToResponse = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	res.locals.csrfToken = req.csrfToken();
	next();
};
