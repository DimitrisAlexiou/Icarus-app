import { Request, Response } from 'express';
import { Announcement } from '../models/announcement';
import { UserProps } from '../models/users/user';
import { tryCatch } from '../utils/tryCatch';
import CustomError from '../utils/CustomError';

interface AuthenticatedRequest extends Request {
	user?: UserProps;
}

//TODO FIX THE REQ.USER.ID FOR FINDING USER WITH USER ID
export const getAnnouncements = tryCatch(async (_: AuthenticatedRequest, res: Response) => {
	const announcements = await Announcement.find();
	if (!announcements) throw new CustomError('Seems like there are no announcements.', 404);

	return res.status(200).json(announcements);
});

export const getInstructorAnnouncements = tryCatch(
	async (req: AuthenticatedRequest, res: Response) => {
		const userId = req.user.id;
		const instructorAnnouncements = await Announcement.find({
			user: userId,
		});
		if (!instructorAnnouncements)
			throw new CustomError(
				`Seems like there are no announcements from instructor: ${req.user.username}.`,
				404
			);

		return res.status(200).json(instructorAnnouncements);
	}
);

export const viewAnnouncement = tryCatch(async (req: AuthenticatedRequest, res: Response) => {
	const { id } = req.params;
	const anouncement = await Announcement.findById(id);
	if (!anouncement)
		throw new CustomError('Seems like there is no anouncement with this ID.', 404);

	return res.status(200).json(anouncement);
});

export const createAnnouncement = tryCatch(async (req: AuthenticatedRequest, res: Response) => {
	const { title, text } = req.body;

	if (!title || !text) throw new CustomError('Please fill in all the required fields.', 400);

	const userId = req.user.id;
	const existingAnnouncement = await Announcement.findOne({ title: title, user: userId });
	if (existingAnnouncement)
		throw new CustomError('Seems like an announcement with this title already exists.', 400);

	const announcement = await Announcement.create({
		title,
		text,
		user: userId,
		status: 'new',
	});

	return res.status(201).json(announcement);
});

export const updateAnnouncement = tryCatch(async (req: AuthenticatedRequest, res: Response) => {
	const { title, text } = req.body;

	if (!title || !text) throw new CustomError('Please fill in all the required fields.', 400);

	const { id } = req.params;

	const updatedAnnouncement = await Announcement.findByIdAndUpdate(id, { ...req.body });
	if (!updatedAnnouncement)
		throw new CustomError('Seems like there is no announcement with this ID.', 404);

	return res.status(200).json(updatedAnnouncement);
});

export const deleteAnnouncement = tryCatch(async (req: AuthenticatedRequest, res: Response) => {
	const { id } = req.params;
	await Announcement.findByIdAndDelete(id);
	return res.status(200).json({ message: 'Note deleted.' });
});

export const deleteAnnouncements = tryCatch(async (_: AuthenticatedRequest, res: Response) => {
	await Announcement.deleteMany();
	return res.status(200).json({ message: 'All announcements deleted.' });
});
