import cron from 'node-cron';
import {
	discardNotFinalizedVaccineStatements,
	finalizePendingStatements,
} from '../controllers/course/statement';

// Schedule the task to run every day at midnight
cron.schedule('0 0 * * *', async () => {
	try {
		// Discard not finalized vaccine statements
		await discardNotFinalizedVaccineStatements();
		console.log(
			'🗑️ Discarded not finalized vaccine statements successfully.'.magenta
				.italic.bold
		);
	} catch (error) {
		console.error(
			'❌ Error discarding vaccine statements: '.yellow.bold,
			error
		);
	}
});

cron.schedule('0 0 * * *', async () => {
	try {
		// Finalize pending statements
		await finalizePendingStatements();
		console.log(
			'✔️ Finalized pending statements successfully.'.magenta.italic.bold
		);
	} catch (error) {
		console.error('❌ Error in statement finalization cron job: ', error);
	}
});

// Start the cron job
// cron.start();
