const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();
const colors = require('colors');
// const Swal = require('sweetalert2');
// const passport = require('passport');
// const LocalStrategy = require('passport-local');
const mongoSanitize = require('express-mongo-sanitize');
// const helmet = require('helmet');
const dbConfig = require('./database/db');
// const connectDB = require('./database/db');
const { errorHandler } = require('./middleware/errorHandler');

// Express Route
const courseRoute = require('../backend/routes/course.routes');

const app = express();

// Connecting mongoDB Database
// connectDB();
// DATABASE
mongoose.Promise = global.Promise;
mongoose
	.connect(dbConfig.db, {
		useNewUrlParser: true,
	})
	.then(
		() => {
			console.log(`✔️   Database sucessfully connected . . .`.cyan.underline);
		},
		(error) => {
			console.log(
				`❌   Could not connect to database : ${error.message}`.red.underline
					.bold,
			);
		},
	);

// PORT
const PORT = process.env.PORT || 5000;

// MIDDLEWARE
app.use(bodyParser.json());
app.use(
	bodyParser.urlencoded({
		extended: true,
	}),
);
// app.use(cors());
app.use(express.json());
app.use(mongoSanitize());
// app.use(helmet({ contentSecurityPolicy: false }));

// app.use('/api/course', courseRoute);

// 404 Error
// app.use((req, res, next) => {
// 	next(createError(404));
// });

app.use(errorHandler);

app.use((err, req, res, next) => {
	console.error(err.message);
	if (!err.statusCode) err.statusCode = 500;
	res.status(err.statusCode).send(err.message);
});

const server = app.listen(PORT, () => {
	console.log(`🌎 App serving on: http://localhost:${PORT}`.yellow.bold);
});
