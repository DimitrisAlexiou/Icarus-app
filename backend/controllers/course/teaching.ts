import mongoose from 'mongoose';
import { Response } from 'express';
import { AuthenticatedRequest } from '../../interfaces/AuthRequest';
import {
	getTeachings,
	getTeachingById,
	updateTeachingById,
	deleteTeachingById,
	deleteTeachings,
	unassignTheoryInstructors,
	unassignLabInstructors,
	assignTheoryInstructors,
	assignLabInstructors,
	getTeachingByCourseId,
	assignTheoryGrading,
	assignLabGrading,
	unassignTheoryGrading,
	unassignLabGrading,
	getInstructorTeachings,
	getSystemTeachings,
	getTotalTeachings,
} from '../../models/course/teaching';
import { getCourseById } from '../../models/course/course';
import {
	getStatementByTeachingId,
	getStatementsByTeachingId,
} from '../../models/course/statement';
import { getCurrentSemester } from '../../models/admin/semester';
import { tryCatch } from '../../utils/tryCatch';
import PDFDocument from 'pdfkit';
import CustomError from '../../utils/CustomError';

export const viewTeaching = tryCatch(
	async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
		const { id } = req.params;
		const teaching = await getTeachingById(id);

		if (!teaching)
			throw new CustomError(
				'Seems like the course teaching that you are trying to view does not exist.',
				404
			);

		return res.status(200).json(teaching);
	}
);

export const viewTeachingByCourseId = tryCatch(
	async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
		const { id } = req.params;
		const teaching = await getTeachingByCourseId(id);

		if (!teaching)
			throw new CustomError(
				'Seems like the course teaching that you are trying to view does not exist.',
				404
			);

		return res.status(200).json(teaching);
	}
);

export const updateTeaching = tryCatch(
	async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
		const {
			labWeight,
			theoryWeight,
			theoryGradeRetentionYears,
			labGradeRetentionYears,
			theoryGradeThreshold,
			labGradeThreshold,
			books,
			course,
		} = req.body;

		if (
			!theoryGradeRetentionYears ||
			!labGradeRetentionYears ||
			!theoryGradeThreshold ||
			!labGradeThreshold ||
			!books
		)
			throw new CustomError('Please fill in all the required fields.', 400);

		if (theoryWeight + labWeight !== 100)
			throw new CustomError(
				'The sum of theory weight and lab weight should be equal to 100.',
				400
			);

		let updatedTeaching;
		const { id } = req.params;

		const existingCourse = await getCourseById(course);
		if (!existingCourse)
			throw new CustomError(
				'Seems like the course that you are trying to retrieve for teaching update does not exist.',
				404
			);

		if (existingCourse.hasLab) {
			if (!labWeight || !theoryWeight)
				throw new CustomError(
					'Please provide the required weight fields.',
					400
				);

			updatedTeaching = await updateTeachingById(id, { ...req.body });
			if (!updatedTeaching)
				throw new CustomError(
					'Seems like the course teaching that you are trying to update does not exist.',
					404
				);
			return res
				.status(200)
				.json({ message: 'Teaching updated!', updatedTeaching });
		}

		updatedTeaching = await updateTeachingById(id, {
			...req.body,
			labWeight: 0,
			theoryWeight: 100,
		});

		if (!updatedTeaching)
			throw new CustomError(
				'Seems like the course teaching that you are trying to update does not exist.',
				404
			);

		return res
			.status(200)
			.json({ message: 'Teaching updated!', updatedTeaching });
	}
);

export const deleteTeaching = tryCatch(
	async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
		const { id } = req.params;

		const statementWithTeaching = await getStatementByTeachingId(id);

		if (statementWithTeaching)
			throw new CustomError(
				'This course teaching is in progress in at least one student statement and cannot be deleted.',
				400
			);

		const teachingToDelete = await deleteTeachingById(id);

		if (!teachingToDelete)
			throw new CustomError(
				'Seems like the course teaching that you are trying to delete does not exist.',
				404
			);

		return res.status(200).json({
			message: 'Course teaching deleted.',
			teaching: teachingToDelete._id,
		});
	}
);

export const viewTeachings = tryCatch(
	async (_: AuthenticatedRequest, res: Response): Promise<Response> => {
		const teachings = await getTeachings();

		if (!teachings.length)
			throw new CustomError(
				'Seems like there are no active course teachings registered in the system.',
				404
			);

		const totalTeachings = await getTotalTeachings();

		return res.status(200).json({ teachings, totalTeachings });
	}
);

export const viewInstructorTeachings = tryCatch(
	async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
		const semester = await getCurrentSemester(new Date());
		if (!semester)
			throw new CustomError(
				'No current semester found. Unable to retrieve instructor teachings.',
				404
			);
		const semesterId = semester._id.toString();
		const instructorId = req.user.instructor._id;

		const teachings = await getInstructorTeachings(instructorId, semesterId);

		if (!teachings.length)
			throw new CustomError(
				'Seems like there are no active course teachings assigned to you.',
				404
			);

		const totalTeachings = await getTotalTeachings();

		return res.status(200).json({ teachings, totalTeachings });
	}
);

export const viewSystemTeachings = tryCatch(
	async (_: AuthenticatedRequest, res: Response): Promise<Response> => {
		const teachings = await getSystemTeachings();

		if (!teachings.length)
			throw new CustomError(
				'Seems like there are no active course teachings registered in the system.',
				404
			);

		const totalTeachings = await getTotalTeachings();

		return res.status(200).json({ teachings, totalTeachings });
	}
);

export const deleteSystemTeachings = tryCatch(
	async (_: AuthenticatedRequest, res: Response): Promise<Response> => {
		await deleteTeachings();

		return res
			.status(200)
			.json({ message: 'Course teachings existing in the system deleted.' });
	}
);

export const assignTheoryInstructorsToTeaching = tryCatch(
	async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
		const { theoryInstructors } = req.body;

		if (!theoryInstructors)
			throw new CustomError(
				'Please provide at least one instructor for the teaching of the theory.',
				400
			);

		const { id } = req.params;
		const assignedTheoryInstructors = await assignTheoryInstructors(
			id,
			theoryInstructors.map(
				(instructor: string) => new mongoose.Types.ObjectId(instructor)
			)
		);

		if (!assignedTheoryInstructors)
			throw new CustomError(
				'Seems like the course teaching that you are trying to assign instructor to, does not exist.',
				404
			);

		return res.status(200).json({
			message: 'Theory Instructor(s) assigned successfully.',
			assignedTheoryInstructors,
		});
	}
);

export const assignLabInstructorsToTeaching = tryCatch(
	async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
		const { labInstructors } = req.body;

		if (!labInstructors)
			throw new CustomError(
				'Please provide at least one instructor for the teaching of the lab.',
				400
			);

		const { id } = req.params;
		const assignedLabInstructors = await assignLabInstructors(
			id,
			labInstructors.map(
				(instructor: string) => new mongoose.Types.ObjectId(instructor)
			)
		);

		if (!assignedLabInstructors)
			throw new CustomError(
				'Seems like the course teaching that you are trying to assign instructor to, does not exist.',
				404
			);

		return res.status(200).json({
			message: 'Lab Instructor(s) assigned successfully.',
			assignedLabInstructors,
		});
	}
);

export const unassignTheoryInstructorsFromTeaching = tryCatch(
	async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
		const { id } = req.params;
		const unassignedTheoryInstructors = await unassignTheoryInstructors(id);

		if (!unassignedTheoryInstructors) {
			throw new CustomError(
				'Seems like the course teaching that you are trying to unassign instructor from, does not exist.',
				404
			);
		}

		return res.status(200).json({
			message: 'Theory instructor(s) unassigned successfully.',
			unassignedTheoryInstructors,
		});
	}
);

export const unassignLabInstructorsFromTeaching = tryCatch(
	async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
		const { id } = req.params;
		const unassignedLabInstructors = await unassignLabInstructors(id);

		if (!unassignedLabInstructors) {
			throw new CustomError(
				'Seems like the course teaching that you are trying to unassign instructor from, does not exist.',
				404
			);
		}

		return res.status(200).json({
			message: 'Lab instructor(s) unassigned successfully.',
			unassignedLabInstructors,
		});
	}
);

export const updateTheoryInstructorsForTeaching = tryCatch(
	async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
		const { theoryInstructors } = req.body;

		if (!theoryInstructors)
			throw new CustomError(
				'Please provide at least one instructor for updating the theory instructors.',
				400
			);

		const { id } = req.params;
		const updatedTheoryInstructors = await assignTheoryInstructors(
			id,
			theoryInstructors.map(
				(instructor: string) => new mongoose.Types.ObjectId(instructor)
			)
		);

		if (!updatedTheoryInstructors)
			throw new CustomError(
				'Seems like the course teaching that you are trying to update instructors for does not exist.',
				404
			);

		return res.status(200).json({
			message: 'Theory Instructor(s) updated successfully.',
			updatedTheoryInstructors,
		});
	}
);

export const assignTheoryGradingToTeaching = tryCatch(
	async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
		const { theoryExamination } = req.body;

		if (!theoryExamination)
			throw new CustomError(
				'Please provide at least one examination for the teaching of the theory.',
				400
			);

		const { id } = req.params;
		const assignedTheoryGrading = await assignTheoryGrading(
			id,
			theoryExamination
		);

		if (!assignedTheoryGrading)
			throw new CustomError(
				'Seems like the course teaching that you are trying to assign examination to, does not exist.',
				404
			);

		return res.status(200).json({
			message: 'Theory Examination(s) assigned successfully.',
			assignedTheoryGrading,
		});
	}
);

export const assignLabGradingToTeaching = tryCatch(
	async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
		const { labExamination } = req.body;

		if (!labExamination)
			throw new CustomError(
				'Please provide at least one examination for the teaching of the lab.',
				400
			);

		const { id } = req.params;
		const assignedLabGrading = await assignLabGrading(id, labExamination);

		if (!assignedLabGrading)
			throw new CustomError(
				'Seems like the course teaching that you are trying to assign examination to, does not exist.',
				404
			);

		return res.status(200).json({
			message: 'Lab Examination(s) assigned successfully.',
			assignedLabGrading,
		});
	}
);

export const unassignTheoryGradingFromTeaching = tryCatch(
	async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
		const { id } = req.params;
		const unassignedTheoryGrading = await unassignTheoryGrading(id);

		if (!unassignedTheoryGrading) {
			throw new CustomError(
				'Seems like the course teaching that you are trying to unassign grading from, does not exist.',
				404
			);
		}

		return res.status(200).json({
			message: 'Theory grading unassigned successfully.',
			unassignedTheoryGrading,
		});
	}
);

export const unassignLabGradingFromTeaching = tryCatch(
	async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
		const { id } = req.params;
		const unassignedLabGrading = await unassignLabGrading(id);

		if (!unassignedLabGrading) {
			throw new CustomError(
				'Seems like the course teaching that you are trying to unassign grading from, does not exist.',
				404
			);
		}

		return res.status(200).json({
			message: 'Lab grading unassigned successfully.',
			unassignedLabGrading,
		});
	}
);

export const downloadEnrolledStudents = tryCatch(
	async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
		const { id } = req.params;

		const teaching = await getTeachingById(id);

		if (!teaching)
			throw new CustomError(
				'Seems like the course teaching that you are trying to retrieve does not exist.',
				404
			);

		// Set response headers
		res.setHeader('Content-Type', 'application/pdf');
		res.setHeader(
			'Content-Disposition',
			`attachment; filename=enrolled_students_${id}.pdf`
		);

		const doc = new PDFDocument();
		// Pipe the PDF content to the response
		doc.pipe(res);

		// Add content to the PDF
		doc
			.fontSize(20)
			.font('Helvetica-Bold')
			.text(`Enrolled Students for ${teaching.get('course.title')}`, {
				align: 'center',
			});
		doc.moveDown();

		doc
			.fontSize(16)
			.font('Helvetica-Bold')
			.text(
				`${teaching.get('semester.type')} ${teaching.get(
					'semester.academicYear'
				)}`,
				{ align: 'center' }
			);
		doc.moveDown();

		const enrolledStudents = await getStatementsByTeachingId(id);

		if (!enrolledStudents.length)
			doc
				.fontSize(12)
				.font('Helvetica')
				.text('No enrolled students for this course teaching.', {
					align: 'center',
				});
		else
			enrolledStudents.forEach((student) => {
				const user = student.get('user');
				const studentId = user.get('student.studentId');
				doc
					.fontSize(12)
					.font('Helvetica')
					.text(`${studentId} - ${user.name} ${user.surname}`, {
						align: 'justify',
					});
			});

		// Finalize the PDF
		doc.end();

		return res.status(200);
	}
);

// // Check if the theory grade is valid for the new teaching
// if (!teaching.isTheoryGradeValid()) {
//   throw new CustomError(
//     `Theory grade retention years exceeded for the new teaching.
//     Maximum retention years: ${theoryGradeRetentionYears}`,
//     400
//   );
// }

// // Check if the lab grade is valid for the new teaching
// if (!teaching.isLabGradeValid()) {
//   throw new CustomError(
//     `Lab grade retention years exceeded for the new teaching.
//     Maximum retention years: ${labGradeRetentionYears}`,
//     400
//   );
// }
