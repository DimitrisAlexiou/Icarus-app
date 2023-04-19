import 'colors';
import 'dotenv/config';
import express, { Application, Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import http from 'http';
import cookieParser from 'cookie-parser';
import mongoSanitize from 'express-mongo-sanitize';
// import helmet from 'helmet';
import connectDB from './database/db';
import ExpressError from './utils/expressError';
import router from './routes';
import { errorHandler } from './middleware/errorHandler';

const PORT: number | string = process.env.PORT || 4000;

mongoose.set('strictQuery', false);
connectDB();

const app: Application = express();

app.use(express.json());
app.use(
	express.urlencoded({
		extended: false,
	})
);
app.use(cors());
app.use(cookieParser());
app.use(mongoSanitize({ replaceWith: '_' }));
app.use(errorHandler);
// app.use(helmet({ contentSecurityPolicy: false }));
app.use('/api/v1', router());

app.all('*', (req: Request, res: Response, next: NextFunction) => {
	next(new ExpressError('Page Not Found', 404));
});

app.use((err: ExpressError, req: Request, res: Response, next: NextFunction) => {
	console.error(err.message);
	if (!err.statusCode) err.statusCode = 500;
	res.status(err.statusCode).send(err.message);
});

const server = http.createServer(app);
server.listen(PORT, () => {
	console.log(`🌎 App serving on: http://localhost:${PORT}/api/v1`.yellow.bold);
});
