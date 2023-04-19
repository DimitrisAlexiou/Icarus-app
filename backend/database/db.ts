import mongoose, { ConnectOptions } from 'mongoose';

interface CustomConnectOptions extends ConnectOptions {
	useNewUrlParser: boolean;
	useUnifiedTopology: boolean;
}

const connectDB = async (): Promise<void> => {
	try {
		const options: CustomConnectOptions = {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		};
		await mongoose.connect(process.env.MONGO_URI, options);
		console.log(`✔️  Database successfully connected . . .`.cyan.underline);
	} catch (error) {
		console.log(`❌  Could not connect to database : ${error.message}`.red.underline.bold);
	}
};

export default connectDB;
