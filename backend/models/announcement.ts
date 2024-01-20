import mongoose, { ClientSession, Schema, model } from 'mongoose';

export interface AnnouncementProps {
	title: string;
	text: string;
	publishDate: Date;
	updateDate?: Date;
	visibility: number;
	isVisible: boolean;
	teaching: mongoose.Types.ObjectId;
	owner: mongoose.Types.ObjectId;
}

const announcementSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
		},
		text: {
			type: String,
			required: true,
		},
		publishDate: {
			type: Date,
			default: Date.now,
			required: true,
		},
		updateDate: {
			type: Date,
			default: null,
		},
		visibility: {
			type: Number,
			required: true,
			default: 1,
		},
		isVisible: {
			type: Boolean,
			required: true,
			default: false,
		},
		teaching: {
			type: Schema.Types.ObjectId,
			ref: 'Teaching',
			required: true,
		},
		owner: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

export const Announcement = model<AnnouncementProps>(
	'Announcement',
	announcementSchema
);

export const createAnnouncement = (values: AnnouncementProps) =>
	new Announcement(values)
		.save()
		.then((announcement) => announcement.toObject());
export const getAnnouncements = () =>
	Announcement.find()
		.populate({
			path: 'teaching',
			populate: {
				path: 'course',
				select: 'title',
			},
		})
		.populate({
			path: 'owner',
			select: 'name surname',
		});
export const getAnnouncementById = (id: string) =>
	Announcement.findById(id).populate({
		path: 'teaching',
		populate: {
			path: 'course',
			select: 'title',
		},
	});
export const getAnnouncementByTitle = (title: string) =>
	Announcement.findOne({ title });
export const getInstructorAnnouncements = (userId: string) =>
	Announcement.find({ owner: userId }).populate({
		path: 'teaching',
		populate: {
			path: 'course',
			select: 'title',
		},
	});
export const deleteInstructorAnnouncements = (
	userId: string,
	session: ClientSession
) => Announcement.deleteMany({ owner: userId }).session(session);
export const getTeachingAnnouncements = (teachingId: string) =>
	Announcement.find({ teaching: teachingId })
		.populate({
			path: 'teaching',
			populate: {
				path: 'course',
				select: 'title',
			},
		})
		.populate({
			path: 'owner',
			select: 'name surname',
		});
export const updateAnnouncementById = (
	id: string,
	announcement: AnnouncementProps
) =>
	Announcement.findByIdAndUpdate(id, announcement, { new: true }).populate({
		path: 'teaching',
		populate: {
			path: 'course',
			select: 'title',
		},
	});
export const deleteAnnouncement = (id: string) =>
	Announcement.findByIdAndDelete(id);
export const deleteTeachingAnnouncements = (
	teachingId: string,
	session: ClientSession
) => Announcement.deleteMany({ teaching: teachingId }).session(session);
export const deleteAnnouncements = () => Announcement.deleteMany();
