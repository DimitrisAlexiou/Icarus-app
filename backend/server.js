const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv').config();
const colors = require('colors');
const mongoSanitize = require('express-mongo-sanitize');
// const helmet = require('helmet');
const connectDB = require('./database/db');
const { errorHandler } = require('./middleware/errorHandler');
const ExpressError = require('./utils/ExpressError');
const courseRoute = require('./routes/course.routes');
const userRoute = require('./routes/user.routes');
const teachingReviewRoute = require('./routes/teachingReview.routes');
const instructorReviewRoute = require('./routes/instructorReview.routes');
const generalReviewRoute = require('./routes/generalReview.routes');
const adminRoute = require('./routes/admin.routes');

//? PORT
const PORT = process.env.PORT || 4000;

//? DATABASE
connectDB();

const app = express();

//? MIDDLEWARE
app.use(express.json());
app.use(
	express.urlencoded({
		extended: true,
	})
);
app.use(cors());
app.use(mongoSanitize({ replaceWith: '_' }));
app.use(errorHandler);
// app.use(helmet({ contentSecurityPolicy: false }));

//? ROUTES
app.use('/api/course', courseRoute);
app.use('/api/user', userRoute);
app.use('/api/review/teaching', teachingReviewRoute);
app.use('/api/review/instructor', instructorReviewRoute);
app.use('/api/review/general', generalReviewRoute);
app.use('/api/admin/configuration', adminRoute);

// app.get('/', async (req, res) => {
// });

// 404 Error
// app.use((req, res, next) => {
// 	next(createError(404));
// });

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
