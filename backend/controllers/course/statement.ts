import { Request, Response } from 'express';
import {
	createStatement,
	getStatementById,
	getUserStatements,
	getUserSubmittedStatement,
	updateStatementById,
	deleteStatementById,
	getStatements,
	deleteStatements,
	Status,
	Type,
} from '../../models/course/statement';
import { UserProps } from '../../models/users/user';
import { getCurrentSemester } from '../../models/admin/semester';
import { getAssessmentBySemester } from '../../models/admin/assessment';
import { tryCatch } from '../../utils/tryCatch';
import CustomError from '../../utils/CustomError';

interface AuthenticatedRequest extends Request {
	user?: UserProps;
}

export const createStudentStatement = tryCatch(
	async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
		const { teachings, type } = req.body;

		if (!teachings)
			throw new CustomError(
				'Please provide at least one course for the course statement creation.',
				400
			);

		const currentDate = new Date();
		const semester = await getCurrentSemester(currentDate);

		if (!semester)
			throw new CustomError(
				`Seems like there is no defined semester for current period, so you can't submit a course statement.`,
				404
			);

		const semesterId = semester._id.toString();
		const assessment = await getAssessmentBySemester(semesterId);

		if (!assessment)
			throw new CustomError(
				`There is no assessement duration defined for the current semester.`,
				404
			);

		if (type === Type.Vaccine) {
			const vaccineEndDate = new Date(assessment.vaccineEndDate);

			if (currentDate > vaccineEndDate)
				throw new CustomError(
					`The vaccine statement period for the current semester has ended. No more vaccine course statements can be submitted.`,
					404
				);
		} else {
			const assessmentStatementEndDate = new Date(semester.startDate);
			assessmentStatementEndDate.setDate(
				assessmentStatementEndDate.getDate() + assessment.period * 7
			);

			if (currentDate > assessmentStatementEndDate)
				throw new CustomError(
					`The assessement statement period for the current semester has ended. No more course statements can be submitted.`,
					404
				);
		}

		const userId = req.user.id;
		const existingStatement = await getUserSubmittedStatement(
			userId,
			semesterId,
			type
		);

		if (existingStatement)
			throw new CustomError(
				`Seems like ${type} course statement has already been submitted for this semester.`,
				406
			);

		const createdStatement = await createStatement({
			teaching: teachings,
			semester: semester,
			user: userId,
			condition: Status.Pending,
			type: type,
			status: 'new',
		});

		const statement = await getStatementById(createdStatement._id.toString());

		return res.status(201).json({ message: 'Statement submitted!', statement });
	}
);

export const finalizeStatement = tryCatch(
	async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
		const { statementId } = req.params;

		const finalizedStatement = await updateStatementById(statementId, {
			condition: Status.Finalized,
		});

		if (!finalizedStatement)
			throw new CustomError(
				'Seems like the course statement that you are trying to finalize does not exist.',
				404
			);

		return res
			.status(200)
			.json({ message: 'Statement finalized!', finalizedStatement });
	}
);

export const viewStatement = tryCatch(
	async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
		const { id } = req.params;
		const statement = await getStatementById(id);

		if (!statement)
			throw new CustomError(
				'Seems like the statement that you are trying to view does not exist.',
				404
			);

		return res.status(200).json(statement);
	}
);

export const updateStatement = tryCatch(
	async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
		const { teachings, type } = req.body;
		if (!teachings)
			throw new CustomError(
				'Please provide at least one course for updating the course statement.',
				400
			);

		const currentDate = new Date();
		const semester = await getCurrentSemester(currentDate);

		if (!semester)
			throw new CustomError(
				`Seems like there is no defined semester for current period, so you can't submit a course statement.`,
				404
			);

		const semesterId = semester._id.toString();
		const assessment = await getAssessmentBySemester(semesterId);

		if (!assessment)
			throw new CustomError(
				`There is no assessement duration defined for the current semester.`,
				404
			);

		if (type === Type.Vaccine) {
			const vaccineEndDate = new Date(assessment.vaccineEndDate);

			if (currentDate > vaccineEndDate)
				throw new CustomError(
					`The vaccine statement period for the current semester has ended. No more vaccine course statements can be submitted.`,
					404
				);
		} else {
			const assessmentStatementEndDate = new Date(semester.startDate);
			assessmentStatementEndDate.setDate(
				assessmentStatementEndDate.getDate() + assessment.period * 7
			);

			if (currentDate > assessmentStatementEndDate)
				throw new CustomError(
					`The assessement statement period for the current semester has ended. No more course statements can be submitted.`,
					404
				);
		}

		const userId = req.user.id;
		const { id } = req.params;

		const existingStatement = await getStatementById(id);
		if (!existingStatement)
			throw new CustomError(
				'Seems like the statement that you are trying to view does not exist.',
				404
			);

		const updatedTeachings = [...existingStatement.teaching, ...teachings];

		const updatedStatement = await updateStatementById(id, {
			teaching: updatedTeachings,
			semester: semester,
			user: userId,
			condition: Status.Pending,
			type: type,
		});

		if (!updatedStatement)
			throw new CustomError(
				'Seems like the course statement that you are trying to update does not exist.',
				404
			);

		return res
			.status(200)
			.json({ message: 'Statement updated!', updatedStatement });
	}
);

export const deleteStatement = tryCatch(
	async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
		const { id } = req.params;
		const statementToDelete = await deleteStatementById(id);

		if (!statementToDelete)
			throw new CustomError(
				'Seems like the course statement that you are trying to delete does not exist.',
				404
			);

		return res.status(200).json({
			message: 'Statement deleted.',
			statement: statementToDelete._id,
		});
	}
);

export const viewStudentStatements = tryCatch(
	async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
		const userId = req.user.id;
		const userStatements = await getUserStatements(userId);

		if (!userStatements.length)
			throw new CustomError(
				`Seems like you haven't submitted a course statement yet.`,
				404
			);

		return res.status(200).json(userStatements);
	}
);

export const viewStatements = tryCatch(
	async (_: Request, res: Response): Promise<Response> => {
		const statements = await getStatements();
		if (!statements.length)
			throw new CustomError(
				'Seems like there are no course statements registered in the system.',
				404
			);

		return res.status(200).json(statements);
	}
);

export const deleteSystemStatements = tryCatch(
	async (_: Request, res: Response): Promise<Response> => {
		await deleteStatements();
		return res
			.status(200)
			.json({ message: 'Statements existing in the system deleted.' });
	}
);

export const discardNotFinalizedVaccineStatements = async (): Promise<void> => {
	try {
		// Delete all the user statements that are not finalized and vaccine end date has passed
		// const discardedVaccineStatements = await deleteStatements({
		// 	condition: Status.Pending,
		// 	vaccineEndDate: { $lt: new Date() },
		// });

		// const discardedVaccineStatements = await updateStatementStatus({
		// 	condition: 'NotFinalized',
		// 	vaccineEndDate: { $lt: new Date() },
		// });

		// console.log(`Discarded ${discardedVaccineStatements.length} statements.`.blue.bold);
		console.log(`Discarded statements.`.blue.bold);
	} catch (error) {
		throw new Error(`Error discarding vaccine statements: ${error.message}`);
	}
};

export const finalizePendingStatements = async (): Promise<void> => {
	try {
		const currentDate = new Date();
		const statements = await getStatements();
		const semester = await getCurrentSemester(currentDate);
		const semesterId = semester._id.toString();
		const assessment = await getAssessmentBySemester(semesterId);

		const assessmentStatementEndDate = new Date(semester.startDate);
		assessmentStatementEndDate.setDate(
			assessmentStatementEndDate.getDate() + assessment.period * 7
		);

		// Iterate through each statement and finalize if the assessment period has ended
		for (const statement of statements) {
			// Finalize the statement if the current date is greater than the assessment end date
			if (
				currentDate > assessmentStatementEndDate &&
				statement.condition === Status.Pending
			) {
				await updateStatementById(statement._id.toString(), {
					condition: Status.Finalized,
				});
				console.log(
					`Statement ${statement._id} finalized automatically.`.blue.bold
				);
			} else return;
		}
	} catch (error) {
		throw new Error(`Error finalizing pending statements: ${error.message}`);
	}
};
