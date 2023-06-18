import mongoose, { ClientSession, Schema, model } from 'mongoose';

export interface CalendarProps {
	eventId: string;
	title: string;
	start: Date;
	end: Date;
	allDay: boolean;
	owner: mongoose.Types.ObjectId;
}

const calendarSchema = new Schema<CalendarProps>(
	{
		eventId: {
			type: String,
			unique: true,
			required: true,
		},
		title: {
			type: String,
			required: true,
		},
		start: {
			type: Date,
			required: true,
		},
		end: {
			type: Date,
			required: true,
		},
		allDay: {
			type: Boolean,
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

export const Calendar = model<CalendarProps>('Calendar', calendarSchema);

export const createEvent = (values: Record<string, any>) =>
	new Calendar(values).save().then((event) => event.toObject());
export const getEventByEventId = (eventId: string) => Calendar.findOne({ eventId });
export const getEvents = (userId: string) => Calendar.find({ owner: userId });
export const deleteEvent = (id: string) => Calendar.findByIdAndDelete(id);
export const deleteEvents = (userId: string, session: ClientSession) =>
	Calendar.deleteMany({ owner: userId }).session(session);
