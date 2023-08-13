import mongoose, { ClientSession, Schema, model } from 'mongoose';

export interface CalendarProps {
	title: string;
	start?: Date;
	end?: Date;
	allDay: boolean;
	owner: mongoose.Types.ObjectId;
}

const calendarSchema = new Schema<CalendarProps>(
	{
		title: {
			type: String,
			required: true,
		},
		start: {
			type: Date,
			required: function () {
				return this.allDay === false;
			},
		},
		end: {
			type: Date,
			required: function () {
				return this.allDay === false;
			},
		},
		allDay: {
			type: Boolean,
			default: true,
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
export const updateEventById = (id: string, event: Record<string, any>) =>
	Calendar.findByIdAndUpdate(id, event, { new: true });
export const getEventByEventId = (eventId: string) => Calendar.findOne({ eventId });
export const getEvents = (userId: string) => Calendar.find({ owner: userId });
export const deleteEvent = (id: string) => Calendar.findByIdAndDelete(id);
export const deleteEvents = (userId: string, session: ClientSession) =>
	Calendar.deleteMany({ owner: userId }).session(session);
