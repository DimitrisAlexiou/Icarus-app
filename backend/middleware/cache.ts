import { Request, Response, NextFunction } from 'express';

const setCache = (req: Request, res: Response, next: NextFunction) => {
	const period = 60 * 5;
	if (req.method === 'GET')
		res.set('Cache-control', `public, max-age=${period}`);

	res.set('Cache-Control', `no-store`);
	next();
};

export default setCache;
