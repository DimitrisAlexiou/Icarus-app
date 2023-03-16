require('colors');
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const mongoSanitize = require('express-mongo-sanitize');
// const helmet = require('helmet');
const connectDB = require('./database/db');
const ExpressError = require('./utils/ExpressError');
const courseRoute = require('./routes/course.routes');
const userRoute = require('./routes/user.routes');
const teachingReviewRoute = require('./routes/review/teachingReview.routes');
const instructorReviewRoute = require('./routes/review/instructorReview.routes');
const generalReviewRoute = require('./routes/review/generalReview.routes');
const adminRoute = require('./routes/admin.routes');
const authRoute = require('./routes/auth/auth.routes');
const { errorHandler } = require('./middleware/errorHandler');

//? PORT
const PORT = process.env.PORT || 4000;

//? DATABASE
mongoose.set('strictQuery', false);
connectDB();

const app = express();

//? MIDDLEWARE
app.use(express.json());
app.use(
	express.urlencoded({
		extended: false,
	})
);
app.use(cors());
app.use(mongoSanitize({ replaceWith: '_' }));
app.use(errorHandler);
// app.use(helmet({ contentSecurityPolicy: false }));

//? ROUTES
app.use('/api/auth', authRoute);
app.use('/api/course', courseRoute);
app.use('/api/user', userRoute);
app.use('/api/review/teaching', teachingReviewRoute);
app.use('/api/review/instructor', instructorReviewRoute);
app.use('/api/review/general', generalReviewRoute);
app.use('/api/admin/configuration', adminRoute);
app.use('/api/admin', adminRoute);

app.all('*', (req, res, next) => {
	next(new ExpressError('Page Not Found', 404));
});

app.use((err, req, res, next) => {
	console.error(err.message);
	if (!err.statusCode) err.statusCode = 500;
	res.status(err.statusCode).send(err.message);
});

app.listen(PORT, () => {
	console.log(`🌎 App serving on: http://localhost:${PORT}`.yellow.bold);
});
