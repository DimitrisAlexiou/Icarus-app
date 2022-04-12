const express = require('express');
const mongoSanitize = require('express-mongo-sanitize');
const cors = require('cors');
const dotenv = require('dotenv').config();
const colors = require('colors');
// const Swal = require('sweetalert2');
// const helmet = require('helmet');
const connectDB = require('./database/db');
const { errorHandler } = require('./middleware/errorHandler');
const ExpressError = require('./utils/ExpressError');
const courseRoute = require('./routes/course.routes');

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
	}),
);
app.use(mongoSanitize({ replaceWith: '_' }));
// app.use(cors());
// app.use(helmet({ contentSecurityPolicy: false }));

//? ROUTES
app.use('/api/course', courseRoute);

// app.get('/', async (req, res) => {
// });

// 404 Error
// app.use((req, res, next) => {
// 	next(createError(404));
// });

// app.all('*', (req, res, next) => {
// 	next(new ExpressError('Page Not Found', 404));
// });

app.use(errorHandler);
app.use((err, req, res, next) => {
	console.error(err.message);
	if (!err.statusCode) err.statusCode = 500;
	res.status(err.statusCode).send(err.message);
});

app.listen(PORT, () => {
	console.log(`🌎 App serving on: http://localhost:${PORT}`.yellow.bold);
});
