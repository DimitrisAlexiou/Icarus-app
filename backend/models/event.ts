import mongoose, { ClientSession, Schema, model } from 'mongoose';

export interface EventProps {
	// eventId: string;
	title: string;
	startDate?: Date;
	endDate?: Date;
	allDay: boolean;
	owner: mongoose.Types.ObjectId;
}

const evnetSchema = new Schema<EventProps>(
	{
		title: {
			type: String,
			required: true,
		},
		startDate: {
			type: Date,
			required: function () {
				return this.allDay === false;
			},
		},
		endDate: {
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

export const Event = model<EventProps>('Event', evnetSchema);

export const createEvent = (values: EventProps) =>
	new Event(values).save().then((event) => event.toObject());
export const updateEventById = (id: string, event: EventProps) =>
	Event.findByIdAndUpdate(id, event, { new: true });
export const getEventByTitleAndOnwer = (title: string, userId: string) =>
	Event.findOne({ title: title, owner: userId });
export const getUserEvents = (userId: string) => Event.find({ owner: userId });
export const deleteEvent = (title: string, userId: string) =>
	Event.findOneAndDelete({ title: title, owner: userId });
export const deleteEvents = (userId: string, session: ClientSession) =>
	Event.deleteMany({ owner: userId }).session(session);
export const getAllEvents = () =>
	Event.find().populate({
		path: 'owner',
		select: 'name surname email',
	});
export const deleteAllEvents = () => Event.deleteMany();
