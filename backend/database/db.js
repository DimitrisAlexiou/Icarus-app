const mongoose = require('mongoose');

const connectDB = async () => {
	mongoose.Promise = global.Promise;
	mongoose
		.connect(process.env.MONGO_URI, {
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
};

module.exports = connectDB;
