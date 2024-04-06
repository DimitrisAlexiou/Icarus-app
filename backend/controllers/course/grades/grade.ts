import mongoose from 'mongoose';
import { Response } from 'express';
import { AuthenticatedRequest } from '../../../interfaces/AuthRequest';
import { tryCatch } from '../../../utils/tryCatch';
import {
	deleteGradeById,
	getGradeById,
	updateGradeById,
	addGrade,
	getSubmittedGrade,
	getTeachingGrades,
	getGradesByStatementTeachings,
	getRecentGrades,
	getGradesByTeachingInStatement,
	getStudentRecentGrades,
	Examination,
	getStudentTeachingGrades,
} from '../../../models/course/grade/grade';
import {
	addOverallGrade,
	getCalculatedOverallGrade,
	getStudentOverallGrades,
	getStudentOverallRecentGrades,
	getStudentTeachingOverallGrade,
} from '../../../models/course/grade/overallGrade';
import {
	StatementProps,
	getStatementById,
	getUserCurrentStatement,
} from '../../../models/course/statement';
import { getCurrentSemester } from '../../../models/admin/semester';
import { updatePassedTeachings } from '../../../models/users/student';
import {
	TeachingProps,
	getTeachingById,
} from '../../../models/course/teaching';
import CustomError from '../../../utils/CustomError';

export const viewTeachingGrades = tryCatch(
	async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
		const { statementId } = req.params;

		const statementGrades = await getTeachingGrades(statementId);
		if (!statementGrades.length)
			throw new CustomError(
				'Seems like there are no grades defined for this statement teachings.',
				404
			);

		return res.status(200).json(statementGrades);
	}
);

export const viewRecentGrades = tryCatch(
	async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
		const userId = req.user.id;

		const recentGrades = await getRecentGrades(userId);
		if (!recentGrades.length)
			throw new CustomError(
				'Seems like there are no recent grades submitted.',
				404
			);

		return res.status(200).json(recentGrades);
	}
);

export const viewStudentRecentGrades = tryCatch(
	async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
		const userId = req.user.id;

		const currentDate = new Date();
		const semester = await getCurrentSemester(currentDate);

		if (!semester)
			throw new CustomError(
				`Seems like there is no defined semester for current period.`,
				404
			);

		const semesterId = semester._id.toString();
		const currentStatement = await getUserCurrentStatement(userId, semesterId);

		if (!currentStatement)
			throw new CustomError(
				`Seems like you haven't submitted a course statement yet.`,
				404
			);

		const recentGrades = await getStudentRecentGrades(currentStatement._id);
		if (!recentGrades.length)
			throw new CustomError(
				'Seems like there are no recent grades submitted.',
				404
			);

		return res.status(200).json(recentGrades);
	}
);

export const viewStudentOverallGrades = tryCatch(
	async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
		const userId = req.user.id;

		const overallGrades = await getStudentOverallGrades(userId);
		if (!overallGrades.length)
			throw new CustomError('Seems like there are no grades submitted.', 404);

		return res.status(200).json(overallGrades);
	}
);

export const viewStudentOverallRecentGrades = tryCatch(
	async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
		const userId = req.user.id;

		const currentDate = new Date();
		const semester = await getCurrentSemester(currentDate);

		if (!semester)
			throw new CustomError(
				`Seems like there is no defined semester for current period.`,
				404
			);

		const semesterId = semester._id.toString();
		const currentStatement = await getUserCurrentStatement(userId, semesterId);

		if (!currentStatement)
			throw new CustomError(
				`Seems like you haven't submitted a course statement yet.`,
				404
			);

		const overallRecentGrades = await getStudentOverallRecentGrades(
			userId,
			currentStatement._id
		);
		if (!overallRecentGrades.length)
			throw new CustomError('Seems like there are no grades submitted.', 404);

		return res.status(200).json(overallRecentGrades);
	}
);

export const viewStudentTeachingGrades = tryCatch(
	async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
		const { teachingId } = req.params;
		const userId = req.user.id;

		const studentTeachingOverallGrade = await getStudentTeachingOverallGrade(
			userId,
			teachingId
		);
		if (!studentTeachingOverallGrade)
			throw new CustomError(
				`Seems like there is no overall grade submitted for this user's teaching.`,
				404
			);
		const overallGrade = studentTeachingOverallGrade.overallGrade;

		const studentTeachingGrades = await getStudentTeachingGrades(
			teachingId,
			studentTeachingOverallGrade.statement
		);
		if (!studentTeachingGrades.length)
			throw new CustomError(
				'Seems like there are no grades for this teaching submitted.',
				404
			);

		return res.status(200).json({ studentTeachingGrades, overallGrade });
	}
);

export const addTeachingGrade = tryCatch(
	async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
		const { exam, teachingId, statementId } = req.body;
		const userId = req.user.id;

		if (!exam)
			throw new CustomError('Please provide the grade of the exam type.', 400);

		const existingGrade = await getSubmittedGrade(
			exam.type,
			exam.examination,
			teachingId,
			statementId
		);
		if (existingGrade)
			throw new CustomError(
				'Seems like grade is already defined for this exam type of the teaching.',
				400
			);

		const grade = await addGrade({
			exam,
			isFinalized: false,
			teaching: new mongoose.Types.ObjectId(teachingId),
			statement: new mongoose.Types.ObjectId(statementId),
			user: new mongoose.Types.ObjectId(userId),
		});

		return res.status(201).json({ message: 'Grade added.', grade });
	}
);

export const viewGrade = tryCatch(
	async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
		const { id } = req.params;

		const grade = await getGradeById(id);
		if (!grade)
			throw new CustomError('Seems like there is no grade defined.', 404);

		return res.status(200).json(grade);
	}
);

export const updateGrade = tryCatch(
	async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
		const { exam, ...grade } = req.body;

		if (!exam || !exam.grade)
			throw new CustomError('Please provide a grade.', 400);

		const { id } = req.params;
		const updatedGrade = await updateGradeById(id, {
			exam: {
				type: exam.type,
				examination: exam.examination,
				grade: exam.grade,
			},
			...grade,
		});
		if (!updatedGrade)
			throw new CustomError(
				'Seems like the grade that you are trying to update does not exist.',
				404
			);

		return res.status(200).json({
			message: 'Grade updated.',
			updatedGrade,
		});
	}
);

export const deleteGrade = tryCatch(
	async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
		const { id } = req.params;
		const gradeToDelete = await deleteGradeById(id);
		if (!gradeToDelete)
			throw new CustomError(
				'Seems like the grade that you are trying to delete does not exist.',
				404
			);

		return res.status(200).json({
			message: 'Grade deleted.',
		});
	}
);

export const finalizeGrade = tryCatch(
	async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
		const { gradeId } = req.params;

		const finalizedGrade = await updateGradeById(gradeId, {
			...req.body,
			isFinalized: true,
		});

		if (!finalizedGrade)
			throw new CustomError(
				'Seems like the grade that you are trying to finalize does not exist.',
				404
			);

		const statement = await getStatementById(
			finalizedGrade.statement._id.toString()
		);
		const teaching = await getTeachingById(
			finalizedGrade.teaching._id.toString()
		);

		const { isTheoryPassed, isLabPassed, totalTheoryGrade, totalLabGrade } =
			await calculateTeachingPassStatus(teaching, statement);

		if (isTheoryPassed && isLabPassed) {
			await calculateAndSaveOverallGrade(
				statement,
				teaching,
				totalTheoryGrade,
				totalLabGrade
			);
			await updatePassedTeachings(
				finalizedGrade.statement.user.student,
				finalizedGrade.teaching._id
			);
		}

		return res
			.status(200)
			.json({ message: 'Grade finalized!', finalizedGrade });
	}
);

//TODO FIX (saving multiple times the same overall grades(duplicates))
export const finalizeGrades = tryCatch(
	async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
		const { statementId } = req.params;
		const instructorId = req.user.instructor._id;

		const statement = await getStatementById(statementId);
		if (!statement)
			return res.status(404).json({ message: 'Statement not found.' });

		const teachings = statement.teaching.filter(
			(teaching) =>
				teaching.theoryInstructors.some((instr) =>
					instr._id.equals(instructorId)
				) ||
				teaching.labInstructors.some((instr) => instr._id.equals(instructorId))
		);

		const grades = await getGradesByStatementTeachings(statementId, teachings);
		if (!grades.length)
			throw new CustomError(
				'Seems like there are no grades submitted for this teaching of the statement.',
				404
			);

		await Promise.all(
			grades.map(async (grade: any) => {
				grade.isFinalized = true;
				await grade.save();

				const isTeachingPassed = await calculateTeachingPassStatus(
					grade.teaching,
					grade.statement
				);

				if (isTeachingPassed)
					await updatePassedTeachings(
						grade.statement.user.student,
						grade.teaching._id
					);
			})
		);

		return res.status(200).json({ message: 'Grades finalized successfully.' });
	}
);

const calculateTeachingPassStatus = async (
	teaching: TeachingProps,
	statement: StatementProps
): Promise<{
	isTheoryPassed: boolean;
	isLabPassed: boolean;
	totalTheoryGrade: number;
	totalLabGrade: number;
}> => {
	const gradesForTeaching = await getGradesByTeachingInStatement(
		new mongoose.Types.ObjectId(teaching._id),
		new mongoose.Types.ObjectId(statement._id)
	);
	const allGradesFinalized = gradesForTeaching.every(
		(grade) => grade.isFinalized
	);

	if (!allGradesFinalized)
		return {
			isTheoryPassed: false,
			isLabPassed: false,
			totalTheoryGrade: 0,
			totalLabGrade: 0,
		};

	let totalTheoryGrade = 0;
	let totalLabGrade = 0;

	gradesForTeaching.forEach((grade) => {
		const exam = grade.exam;
		const weight = getExamWeight(teaching, exam.examination, exam.type);
		if (exam.examination === Examination.Theory)
			totalTheoryGrade += (grade.isFinalized ? grade.exam.grade : 0) * weight;
		else if (exam.examination === Examination.Lab)
			totalLabGrade += (grade.isFinalized ? grade.exam.grade : 0) * weight;
	});

	const isTheoryPassed = totalTheoryGrade >= teaching.theoryGradeThreshold;
	const isLabPassed = totalLabGrade >= teaching.labGradeThreshold;

	return { isTheoryPassed, isLabPassed, totalTheoryGrade, totalLabGrade };
};

const getExamWeight = (
	teaching: TeachingProps,
	examination: Examination,
	type: string
) => {
	const exams =
		examination === Examination.Theory
			? teaching.theoryExamination
			: teaching.labExamination;
	const exam = exams.find((exam) => exam.type === type);
	return exam ? exam.weight / 100 : 0;
};

const calculateAndSaveOverallGrade = async (
	statement: StatementProps,
	teaching: TeachingProps,
	totalTheoryGrade: number,
	totalLabGrade: number
) => {
	const existingOverallGrade = await getCalculatedOverallGrade(
		statement.user,
		new mongoose.Types.ObjectId(statement._id),
		new mongoose.Types.ObjectId(teaching._id)
	);
	console.log(existingOverallGrade);

	if (existingOverallGrade) return;

	const overallGrade =
		(totalTheoryGrade * (teaching.theoryWeight / 100) +
			totalLabGrade * (teaching.labWeight / 100)) /
		(teaching.theoryWeight / 100 + teaching.labWeight / 100);

	const roundedOverallGrade = Math.round(overallGrade * 2) / 2;

	await addOverallGrade({
		user: statement.user,
		statement: new mongoose.Types.ObjectId(statement._id),
		teaching: new mongoose.Types.ObjectId(teaching._id),
		overallGrade: roundedOverallGrade,
		overallGradeCalculated: true,
	});
};
