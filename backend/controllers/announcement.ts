import mongoose from 'mongoose';
import { startSession } from 'mongoose';
import { Response } from 'express';
import { AuthenticatedRequest } from '../interfaces/AuthRequest';
import {
	Announcement,
	createAnnouncement,
	deleteAnnouncement,
	deleteInstructorAnnouncements,
	deleteTeachingAnnouncements,
	getAnnouncementById,
	getAnnouncementByTitle,
	getInstructorAnnouncements,
	getTeachingAnnouncements,
	updateAnnouncementById,
} from '../models/announcement';
import { tryCatch } from '../utils/tryCatch';
import CustomError from '../utils/CustomError';

export const viewAnnouncement = tryCatch(
	async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
		const { id } = req.params;
		const anouncement = await getAnnouncementById(id);

		if (!anouncement)
			throw new CustomError(
				'Seems like the announcement that you are trying to view does not exist.',
				404
			);

		return res.status(200).json(anouncement);
	}
);

export const createTeachingAnnouncement = tryCatch(
	async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
		const { title, text, publishDate, visibility, isVisible, teaching } =
			req.body;

		if (!title || !text || !visibility || !teaching)
			throw new CustomError('Please fill in all the required fields.', 400);

		const userId = req.user.id;

		const existingAnnouncement = await getAnnouncementByTitle(title);
		if (existingAnnouncement)
			throw new CustomError(
				'Seems like an announcement with this title already exists.',
				400
			);

		const createdAnnouncement = await createAnnouncement({
			title,
			text,
			publishDate,
			visibility,
			isVisible,
			teaching,
			owner: new mongoose.Types.ObjectId(userId),
		});

		const announcement = await Announcement.populate(createdAnnouncement, {
			path: 'teaching',
			populate: {
				path: 'course',
				select: 'title',
			},
		});

		return res
			.status(201)
			.json({ message: 'Announcement created!', announcement });
	}
);

export const updateAnnouncement = tryCatch(
	async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
		const { title, text, visibility, teaching } = req.body;

		if (!title || !text || !visibility || !teaching)
			throw new CustomError('Please fill in all the required fields.', 400);

		const { id } = req.params;
		const updatedAnnouncement = await updateAnnouncementById(id, {
			...req.body,
			updateDate: new Date(),
		});

		if (!updatedAnnouncement)
			throw new CustomError(
				'Seems like the announcement that you are trying to update does not exist.',
				404
			);

		return res
			.status(200)
			.json({ message: 'Announcement updated!', updatedAnnouncement });
	}
);

export const deleteTeachingAnnouncement = tryCatch(
	async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
		const { id } = req.params;
		const announcementToDelete = await deleteAnnouncement(id);

		if (!announcementToDelete)
			throw new CustomError(
				'Seems like the announcement that you are trying to delete does not exist.',
				404
			);

		return res.status(200).json({
			message: 'Announcement deleted.',
			announcement: announcementToDelete._id,
		});
	}
);

export const viewInstructorAnnouncements = tryCatch(
	async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
		const userId = req.user.id;

		const instructorAnnouncements = await getInstructorAnnouncements(userId);

		if (!instructorAnnouncements.length)
			throw new CustomError(
				'Seems like you do not have any announcements.',
				404
			);

		return res.status(200).json(instructorAnnouncements);
	}
);

export const deleteAllInstructorAnnouncements = tryCatch(
	async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
		const userId = req.user.id;
		const session = await startSession();

		try {
			session.startTransaction();

			await deleteInstructorAnnouncements(userId, session);

			await session.commitTransaction();
		} catch (error) {
			await session.abortTransaction();
			console.error('❌ ', error);
			throw new CustomError(
				'Your teaching announcements did not deleted.',
				500
			);
		} finally {
			session.endSession();
		}

		return res
			.status(200)
			.json({ message: 'Your teaching announcements deleted.' });
	}
);

export const viewTeachingAnnouncements = tryCatch(
	async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
		const { teachingId } = req.params;
		const teachingAnnouncements = await getTeachingAnnouncements(teachingId);

		if (!teachingAnnouncements.length)
			throw new CustomError(
				'Seems like this teaching does not have any announcements.',
				404
			);

		return res.status(200).json(teachingAnnouncements);
	}
);

export const deleteAllTeachingAnnouncements = tryCatch(
	async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
		const { teachingId } = req.params;
		const session = await startSession();

		try {
			session.startTransaction();

			await deleteTeachingAnnouncements(teachingId, session);

			await session.commitTransaction();
		} catch (error) {
			await session.abortTransaction();
			console.error('❌ ', error);
			throw new CustomError('Teaching announcements did not deleted.', 500);
		} finally {
			session.endSession();
		}

		return res.status(200).json({ message: 'Teaching announcements deleted.' });
	}
);
