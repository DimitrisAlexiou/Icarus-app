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
import router from './routes';
import setCache from './middleware/cache';
import errorHandler from './middleware/errorHandler';
import CustomError from './utils/CustomError';

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
app.use(
	cors({
		credentials: true,
	})
);
app.use(cookieParser());
app.use(mongoSanitize({ replaceWith: '_' }));
app.use(setCache);
// app.use(helmet({ contentSecurityPolicy: false }));
app.use('/api/v1', router());

app.all('*', (req: Request, res: Response, next: NextFunction) => {
	next(new CustomError('Page Not Found', 404));
});

app.use(errorHandler);

const server = http.createServer(app);
server.listen(PORT, () => {
	console.log(`🌎 App serving on: http://localhost:${PORT}/api/v1`.yellow.bold);
});
