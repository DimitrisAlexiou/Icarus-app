import mongoose from 'mongoose';
import PDFDocument from 'pdfkit';
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
import {
	Exams,
	SemesterType,
	getCurrentSemester,
} from '../../../models/admin/semester';
import { CourseObligation } from '../../../models/course/course';
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

export const downloadStudentGradesTranscript = tryCatch(
	async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
		const userId = req.user.id;

		const overallGrades = await getStudentOverallGrades(userId);
		if (!overallGrades.length)
			throw new CustomError('Seems like there are no grades submitted.', 404);

		// Set response headers
		res.setHeader('Content-Type', 'application/pdf');
		res.setHeader(
			'Content-Disposition',
			`attachment; filename=grades_transcript_report_${userId}.pdf`
		);

		const doc = new PDFDocument();
		// Pipe the PDF content to the response
		doc.pipe(res);

		// Add content to the PDF
		doc.fontSize(20).font('Helvetica-Bold').text('Grades Transcript Report', {
			align: 'center',
		});
		doc.moveDown();

		// Group grades by semester
		const gradesBySemesterCategory = new Map<number, any[]>();

		overallGrades.forEach((grade) => {
			const { teaching } = grade;
			const { course } = teaching as any;
			const semesterCategory = calculateSemesterCategory(
				course.year,
				course.semester
			) as any;

			if (!gradesBySemesterCategory.has(semesterCategory)) {
				gradesBySemesterCategory.set(semesterCategory, []);
			}
			gradesBySemesterCategory.get(semesterCategory).push(grade);
		});

		// Sort semester categories in ascending order
		const sortedSemesterCategories = Array.from(
			gradesBySemesterCategory.keys()
		).sort((a: any, b: any) => {
			const [aYear] = a.split(' ');
			const [bYear] = b.split(' ');
			return parseInt(aYear) - parseInt(bYear);
		});

		// Iterate over each semester and add grades
		sortedSemesterCategories.forEach((semesterCategory) => {
			doc
				.fontSize(16)
				.font('Helvetica-Bold')
				.text(`${semesterCategory}`, { align: 'center' });
			doc.moveDown();

			const gradesInCategory = gradesBySemesterCategory.get(semesterCategory);
			gradesInCategory.forEach((grade) => {
				const { teaching, statement } = grade;
				const { course } = teaching as any;
				const { semester } = statement as any;

				doc
					.fontSize(12)
					.font('Helvetica')
					.text(`Course: `, { oblique: true, continued: true })
					.font('Helvetica-Bold')
					.text(`${course.title}`)
					.moveDown(0.2);
				doc
					.fontSize(12)
					.font('Helvetica')
					.text(`ID: `, { oblique: true, continued: true })
					.font('Helvetica-Bold')
					.text(`${course.courseId}`)
					.moveDown(0.2);
				doc
					.fontSize(12)
					.font('Helvetica')
					.text(`Type: `, { oblique: true, continued: true })
					.font('Helvetica-Bold')
					.text(`${course.type}`)
					.moveDown(0.2);
				doc
					.fontSize(12)
					.font('Helvetica')
					.text(`Cycle: `, { oblique: true, continued: true })
					.font('Helvetica-Bold')
					.text(`${course.cycle || 'N/A'}`)
					.moveDown(0.2);
				doc
					.fontSize(12)
					.font('Helvetica')
					.text(`Obligation: `, { oblique: true, continued: true })
					.font('Helvetica-Bold')
					.text(
						`${
							course.isObligatory
								? CourseObligation.Obligatory
								: CourseObligation.Optional
						}`
					)
					.moveDown(0.2);
				doc
					.fontSize(12)
					.font('Helvetica')
					.text(`Examination: `, { oblique: true, continued: true })
					.font('Helvetica-Bold')
					.text(
						`${semester.type === SemesterType.Winter ? Exams.FEB : Exams.JUN} ${
							semester.academicYear
						}`
					)
					.moveDown(0.2);
				doc
					.fontSize(12)
					.font('Helvetica')
					.text('Overall Grade: ', { oblique: true, continued: true })
					.font('Helvetica-Bold')
					.text(`${grade.overallGrade}`);

				doc.moveDown();
			});
		});

		// Finalize the PDF
		doc.end();

		return res.status(200);
	}
);

export const downloadTeachingGradingTranscript = tryCatch(
	async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
		const { statementId } = req.params;

		const statementGrades = await getTeachingGrades(statementId);
		if (!statementGrades.length)
			throw new CustomError(
				'Seems like there are no grades defined for this statement teachings.',
				404
			);

		res.setHeader('Content-Type', 'application/pdf');
		res.setHeader(
			'Content-Disposition',
			`attachment; filename=teaching_grading_transcript_report.pdf`
		);

		const doc = new PDFDocument();
		doc.pipe(res);

		const student = statementGrades[0]?.statement?.user as any;
		const semester = statementGrades[0]?.statement?.semester as any;
		doc
			.fontSize(14)
			.font('Helvetica-Bold')
			.text(`${semester.type} ${semester.academicYear}`, {
				align: 'left',
			});
		doc
			.fontSize(14)
			.font('Helvetica-Bold')
			.text(`${student.name} ${student.surname}`, {
				align: 'right',
			});
		doc.fontSize(14).font('Helvetica-Bold').text(`${student.username}`, {
			align: 'right',
		});
		doc.moveDown(2);

		doc
			.fontSize(20)
			.font('Helvetica-Bold')
			.text('Teaching Grading Transcript Report', {
				align: 'center',
			});
		doc.moveDown();

		const teachings = statementGrades.reduce((acc: any, grade: any) => {
			const { teaching, exam } = grade;
			const teachingExamination =
				exam.examination === Examination.Theory
					? Examination.Theory
					: Examination.Lab;
			if (!acc[teaching._id]) {
				acc[teaching._id] = {
					teaching,
					theoryGrades: [],
					labGrades: [],
				};
			}
			if (teachingExamination === Examination.Theory)
				acc[teaching._id].theoryGrades.push(grade);
			else if (teachingExamination === Examination.Lab)
				acc[teaching._id].labGrades.push(grade);

			return acc;
		}, {});

		Object.values(teachings).forEach(async (teachingGroup: any) => {
			const { teaching, theoryGrades, labGrades } = teachingGroup;
			const { course } = teaching;

			const { totalGrade: totalTheoryGrade } = calculateTotalGrade(
				theoryGrades,
				teaching
			);
			const { totalGrade: totalLabGrade } = calculateTotalGrade(
				labGrades,
				teaching
			);
			const { roundedOverallGrade: overallGrade } = calculateOverallGrade(
				totalTheoryGrade,
				totalLabGrade,
				teaching
			);

			doc
				.fontSize(16)
				.font('Helvetica-Bold')
				.text(`${course.title} - ${overallGrade}`, {
					align: 'center',
				});
			doc.moveDown();

			doc
				.fontSize(14)
				.font('Helvetica-Bold')
				.text(`Theory Examination - ${totalTheoryGrade}`, { oblique: true });
			doc.moveDown();

			theoryGrades.forEach((grade: any) => {
				const { exam } = grade;
				doc.fontSize(12).font('Helvetica').text(`Exam: ${exam.type}`);
				doc.moveDown(0.1);
				doc.fontSize(12).font('Helvetica').text(`Grade: ${exam.grade}`);
				doc.moveDown(0.5);
			});
			doc.moveDown();

			doc
				.fontSize(14)
				.font('Helvetica-Bold')
				.text(`Lab Examination - ${totalLabGrade}`, { oblique: true });
			doc.moveDown();

			labGrades.forEach((grade: any) => {
				const { exam } = grade;
				doc.fontSize(12).font('Helvetica').text(`Exam: ${exam.type}`);
				doc.moveDown(0.1);
				doc.fontSize(12).font('Helvetica').text(`Grade: ${exam.grade}`);
				doc.moveDown(0.5);
			});

			doc.moveDown();
		});

		doc.end();

		return res.status(200);
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

const calculateTotalGrade = (grades: any[], teaching: TeachingProps) => {
	let totalGrade = 0;

	grades.forEach((grade: any) => {
		const exam = grade.exam;
		const weight = getExamWeight(teaching, exam.examination, exam.type);
		totalGrade += (grade.isFinalized ? grade.exam.grade : 0) * weight;
	});
	totalGrade = Math.round(totalGrade * 10) / 10;

	return { totalGrade };
};

const calculateOverallGrade = (
	totalTheoryGrade: number,
	totalLabGrade: number,
	teaching: TeachingProps
) => {
	const overallGrade =
		(totalTheoryGrade * (teaching.theoryWeight / 100) +
			totalLabGrade * (teaching.labWeight / 100)) /
		(teaching.theoryWeight / 100 + teaching.labWeight / 100);

	const roundedOverallGrade = Math.round(overallGrade * 2) / 2;

	return { roundedOverallGrade };
};

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

const calculateSemesterCategory = (year: number, semester: string): string => {
	const isWinterSemester = SemesterType.Winter.includes(semester);
	const adjustedYear = isWinterSemester ? year * 2 - 1 : year * 2;
	return `${adjustedYear}${getSemesterSuffix(adjustedYear)}`;
};

const getSemesterSuffix = (year: number): string => {
	const lastDigit = year % 10;
	switch (lastDigit) {
		case 1:
			return 'st Semester';
		case 2:
			return 'nd Semester';
		case 3:
			return 'rd Semester';
		default:
			return 'th Semester';
	}
};
