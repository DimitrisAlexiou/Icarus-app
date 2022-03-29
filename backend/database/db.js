const mongoose = require('mongoose');

const ConnectDB = async () => {
	try {
		const conn = await mongoose.connect(process.env.MONGO_DB);
		console.log(
			`✔️ Database sucessfully connected: ${conn.connection.host}`.cyan
				.underline,
		);
	} catch (error) {
		console.log(
			`❌ Could not connect to database : ${error.message}`.red.underline.bold,
		);
		process.exit(1);
	}
};

module.exports = {
	ConnectDB,
	db: process.env.MONGO_DB,
};
