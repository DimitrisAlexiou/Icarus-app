import mongoose from 'mongoose';
import { Response } from 'express';
import { AuthenticatedRequest } from '../../interfaces/AuthRequest';
import { tryCatch } from '../../utils/tryCatch';
import {
	deleteGradeById,
	getGradeById,
	updateGradeById,
	addGrade,
	getSubmittedGrade,
	getTeachingGrades,
	getGradesByStatementTeachings,
} from '../../models/course/grade/grade';
import { getStatementById } from '../../models/course/statement';
import CustomError from '../../utils/CustomError';

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

		return res
			.status(200)
			.json({ message: 'Grade finalized!', finalizedGrade });
	}
);

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
			grades.map(async (grade) => {
				grade.isFinalized = true;
				await grade.save();
			})
		);

		return res.status(200).json({ message: 'Grades finalized successfully.' });
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

//! 1st Solution
// // Assume the following examination results for a teaching
// const teaching = {
//     // Other teaching fields...
//     theoryExamination: [
//         { type: 'Final', weight: 80, lowerGradeThreshold: 5, score: 7 },
//         { type: 'Progress', weight: 20, lowerGradeThreshold: 4, score: 8 },
//     ],
//     labExamination: [], // Similarly, you'll have examination results for lab
// };

// // Function to calculate grades for a teaching
// const calculateGrades = (teaching) => {
//     let theoryGrade = 0;
//     let labGrade = 0;

//     // Calculate theory grade
//     if (teaching.theoryExamination.length > 0) {
//         theoryGrade = teaching.theoryExamination.reduce((acc, exam) => {
//             return acc + (exam.score * exam.weight) / 100;
//         }, 0);
//     }

//     // Calculate lab grade (similar to theory grade)

//     return { theoryGrade, labGrade };
// };

// // Call the function with the teaching data
// const { theoryGrade, labGrade } = calculateGrades(teaching);
// console.log('Theory Grade:', theoryGrade);
// console.log('Lab Grade:', labGrade);

//! 2nd Solution
// // Assuming GradeProps interface is defined as you provided

// // Function to calculate the weighted grade for a specific exam type
// const calculateWeightedGrade = (examTypeGrade: number, weight: number) => {
//   return examTypeGrade * weight;
// };

// // Function to calculate the overall grade based on exam type grades and weights
// const calculateOverallGrade = (theoryGrade: number, labGrade: number, theoryWeight: number, labWeight: number) => {
//   const weightedTheoryGrade = calculateWeightedGrade(theoryGrade, theoryWeight);
//   const weightedLabGrade = calculateWeightedGrade(labGrade, labWeight);
//   const overallGrade = (weightedTheoryGrade + weightedLabGrade) / (theoryWeight + labWeight);
//   return overallGrade;
// };

// // Function to add or update grade
// export const addOrUpdateGrade = async (values: GradeProps) => {
//   // Retrieve the teaching details to get the exam type weights
//   const teaching = await Teaching.findById(values.teaching);
//   if (!teaching) {
//     throw new Error('Teaching not found');
//   }

//   // Extract exam type weights from teaching
//   const { theoryWeight, labWeight } = teaching;

//   // Calculate overall grade based on exam type grades and weights
//   const overallGrade = calculateOverallGrade(values.theoryGrade, values.labGrade, theoryWeight, labWeight);
//   values.grade = overallGrade;

//   // Check if grade exists for the user, teaching, and statement
//   const existingGrade = await Grade.findOne({ user: values.user, teaching: values.teaching, statement: values.statement });

//   // If grade exists, update it; otherwise, add a new grade
//   if (existingGrade) {
//     return await updateGradeById(existingGrade._id, values);
//   } else {
//     return await addGrade(values);
//   }
// };

//! Finalize grades
// // Assume you have a TheoryExamination model/schema
// import { TheoryExamination } from './models/TheoryExamination';

// // Function to calculate total theory grade
// const calculateTotalTheoryGrade = async (teachingId: string) => {
//   // Find all theory examinations for the teaching
//   const theoryExams = await TheoryExamination.find({ teaching: teachingId });

//   // Calculate total grade based on individual exam grades
//   let totalGrade = 0;
//   theoryExams.forEach((exam) => {
//     totalGrade += exam.grade;
//   });

//   // Optionally, you can calculate average or apply other logic here

//   return totalGrade;
// };

// // Function to mark theory examination as finalized
// const finalizeTheoryExaminationGrading = async (teachingId: string) => {
//   // Update the theory examination document to mark it as finalized
//   await TheoryExamination.updateMany({ teaching: teachingId }, { isGradingFinalized: true });
// };

// // Function to handle finalizing grading for theory examination
// export const finalizeTheoryExaminationGradingProcess = async (teachingId: string) => {
//   try {
//     // Calculate total theory grade
//     const totalTheoryGrade = await calculateTotalTheoryGrade(teachingId);

//     // Update total theory grade in your database
//     // For example, you can store it in Teaching document
//     await Teaching.findByIdAndUpdate(teachingId, { totalTheoryGrade });

//     // Mark theory examination as finalized
//     await finalizeTheoryExaminationGrading(teachingId);

//     // Optionally, you can perform additional actions or return any result here

//     return totalTheoryGrade;
//   } catch (error) {
//     // Handle error appropriately
//     console.error('Error finalizing theory examination grading:', error);
//     throw error;
//   }
// };
