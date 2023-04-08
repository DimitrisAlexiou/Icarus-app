const asyncHandler = require('express-async-handler');
const Calendar = require('../models/calendar');
const User = require('../models/users/user');

module.exports.addEvent = asyncHandler(async (req, res) => {
	const { eventId, title, start, end, allDay } = req.body;

	if (!title || !start || !end || !allDay) {
		return res.status(400).json('Please fill in all the required fields!');
	}

	try {
		const userId = req.user.id;
		const user = await User.findById(userId);

		if (!user) {
			return res.status(401).json('User not found!');
		} else {
			try {
				const existingEvent = await Calendar.findOne({ eventId: eventId, owner: userId });
				if (existingEvent) {
					return res
						.status(400)
						.json('Seems like an event with this title already exists for the day!');
				} else {
					try {
						const event = await Calendar.create({
							eventId,
							title,
							start,
							end,
							allDay,
							owner: userId,
							status: 'new',
						});
						console.log(event);
						return res.status(201).json(event);
					} catch (error) {
						console.error('❌ Error while creating event: ', error);
						return res
							.status(500)
							.json({ message: 'Something went wrong, try again later!' });
					}
				}
			} catch (error) {
				console.error('❌ Error while checking if event already exists: ', error);
				return res.status(500).json({ message: 'Something went wrong, try again later!' });
			}
		}
	} catch (error) {
		console.error('❌ Error while finding user: ', error);
		return res.status(500).json({ message: 'Something went wrong, try again later!' });
	}
});

module.exports.getEvents = asyncHandler(async (req, res) => {
	try {
		const userId = req.user.id;
		const user = await User.findById(userId);

		if (!user) {
			return res.status(401).json('User not found!');
		} else {
			try {
				const userEvents = await Calendar.find({
					owner: userId,
				});
				if (userEvents.length === 0) {
					return res.status(404).json(`Seems like there are no events!`);
				} else {
					return res.status(200).json(userEvents);
				}
			} catch (error) {
				console.error('❌ Error while finding user events: ', error);
				return res.status(500).json({ message: 'Something went wrong, try again later!' });
			}
		}
	} catch (error) {
		console.error('❌ Error while finding user: ', error);
		return res.status(500).json({ message: 'Something went wrong, try again later!' });
	}
});

module.exports.deleteEvent = asyncHandler(async (req, res) => {
	try {
		const userId = req.user.id;
		const user = await User.findById(userId);

		if (!user) {
			return res.status(401).json('User not found!');
		} else {
			const { id } = req.params;

			try {
				await Calendar.findByIdAndDelete(id);
				return res.status(200).json('Event deleted!');
			} catch (error) {
				console.error('❌ Error while deleting user event: ', error);
				return res.status(500).json({ message: 'Something went wrong, try again later!' });
			}
		}
	} catch (error) {
		console.error('❌ Error while finding user: ', error);
		return res.status(500).json({ message: 'Something went wrong, try again later!' });
	}
});

module.exports.deleteEvents = asyncHandler(async (req, res) => {
	try {
		const userId = req.user.id;
		const user = await User.findById(userId);

		if (!user) {
			return res.status(401).json('User not found!');
		} else {
			try {
				await Calendar.deleteMany({ owner: userId });
				return res.status(200).json('All user events deleted!');
			} catch (error) {
				console.error('❌ Error while deleting all user events: ', error);
				return res.status(500).json({ message: 'Something went wrong, try again later!' });
			}
		}
	} catch (error) {
		console.error('❌ Error while finding user: ', error);
		return res.status(500).json({ message: 'Something went wrong, try again later!' });
	}
});
