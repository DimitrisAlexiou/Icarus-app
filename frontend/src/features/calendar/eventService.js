import axiosFetch from '../../utils/axios';
import {
	API_URL_ADMIN_EVENTS,
	API_URL_CALENDAR,
} from '../../constants/apiConfig';

const getUserEvents = async () => {
	const response = await axiosFetch.get(API_URL_CALENDAR);

	return response.data;
};

const addEvent = async (data) => {
	const response = await axiosFetch.post(API_URL_CALENDAR, data);

	return response.data;
};

const updateEvent = async (eventId, data) => {
	const response = await axiosFetch.put(API_URL_CALENDAR + '/' + eventId, data);

	return response.data;
};

const deleteEvent = async (data) => {
	console.log(data);
	const response = await axiosFetch.delete(API_URL_CALENDAR + '/delete', data);

	return response.data;
};

const deleteUserEvents = async () => {
	const response = await axiosFetch.delete(API_URL_CALENDAR);

	return response.data;
};

const deleteEvents = async () => {
	const response = await axiosFetch.delete(API_URL_ADMIN_EVENTS);

	return response.data;
};

const getEvents = async () => {
	const response = await axiosFetch.get(API_URL_ADMIN_EVENTS);

	return response.data;
};

const eventService = {
	getUserEvents,
	addEvent,
	updateEvent,
	deleteEvent,
	deleteUserEvents,
	getEvents,
	deleteEvents,
};

export default eventService;
