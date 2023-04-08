import axios from 'axios';
import { API_URL_CALENDAR, headers } from '../../constants/config';

const getEvents = async (token) => {
	const config = {
		headers: { headers, Authorization: `Bearer ${token}` },
	};

	const response = await axios.get(API_URL_CALENDAR, config);

	return response.data;
};

const addEvent = async (data, token) => {
	const config = {
		headers: { headers, Authorization: `Bearer ${token}` },
	};

	const response = await axios.post(API_URL_CALENDAR, data, config);

	return response.data;
};

const deleteEvent = async (eventId, token) => {
	const config = {
		headers: { headers, Authorization: `Bearer ${token}` },
	};

	const response = axios.delete(API_URL_CALENDAR + '/' + eventId, config);

	return response.data;
};

const deleteEvents = async (token) => {
	const config = {
		headers: { headers, Authorization: `Bearer ${token}` },
	};

	const response = axios.delete(API_URL_CALENDAR + '/delete_all', config);

	return response.data;
};

const eventService = {
	addEvent,
	deleteEvent,
	deleteEvents,
	getEvents,
};

export default eventService;
