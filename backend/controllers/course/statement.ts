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
		const { teachings } = req.body;

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
		const assessmentDuration = await getAssessmentBySemester(semesterId);

		if (!assessmentDuration)
			throw new CustomError(
				`There is no assessement duration defined for the current semester.`,
				404
			);

		const assessmentStatementEndDate = new Date(semester.startDate);
		assessmentStatementEndDate.setDate(
			assessmentStatementEndDate.getDate() + assessmentDuration.period * 7
		);
		console.log(assessmentStatementEndDate);

		if (currentDate > assessmentStatementEndDate)
			throw new CustomError(
				`The assessement statement period for the current semester has ended. No more course statements can be submitted.`,
				404
			);

		const userId = req.user.id;
		const existingStatement = await getUserSubmittedStatement(
			userId,
			semesterId
		);

		if (existingStatement)
			throw new CustomError(
				'Seems like a course statement has already been submitted for this semester.',
				406
			);

		const statement = await createStatement({
			teaching: teachings,
			semester: semester,
			user: userId,
			status: 'new',
		});

		return res.status(201).json({ message: 'Statement submitted!', statement });
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
		const { teaching } = req.body;

		if (!teaching)
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
		const assessmentDuration = await getAssessmentBySemester(semesterId);

		if (!assessmentDuration)
			throw new CustomError(
				`There is no assessement duration defined for the current semester.`,
				404
			);

		const assessmentStatementEndDate = new Date(semester.startDate);
		assessmentStatementEndDate.setDate(
			assessmentStatementEndDate.getDate() + assessmentDuration.period * 7
		);

		if (currentDate > assessmentStatementEndDate)
			throw new CustomError(
				`The assessement statement period for the current semester has ended. No more course statements can be submitted.`,
				404
			);

		const userId = req.user.id;
		const { statementId } = req.params;
		const updatedStatement = await updateStatementById(statementId, {
			...req.body,
			semester: semester,
			user: userId,
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

// finalize statement
