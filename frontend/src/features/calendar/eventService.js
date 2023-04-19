import axiosFetch from '../../utils/axios';
import { API_URL_CALENDAR } from '../../constants/config';

const getEvents = async () => {
	const response = await axiosFetch.get(API_URL_CALENDAR);

	return response.data;
};

const addEvent = async (data) => {
	const response = await axiosFetch.post(API_URL_CALENDAR, data);

	return response.data;
};

const deleteEvent = async (eventId) => {
	const response = axiosFetch.delete(API_URL_CALENDAR + '/' + eventId);

	return response.data;
};

const deleteEvents = async () => {
	const response = axiosFetch.delete(API_URL_CALENDAR + '/delete_all');

	return response.data;
};

const eventService = {
	addEvent,
	deleteEvent,
	deleteEvents,
	getEvents,
};

export default eventService;
