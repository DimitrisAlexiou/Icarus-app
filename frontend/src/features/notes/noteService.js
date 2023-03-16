import axios from 'axios';
import { BASE_URL, headers } from '../../constants/config';
const API_URL_NOTES = `${BASE_URL}/api/note`;
const API_URL_NOTE = `${BASE_URL}/api/note/`;

const getUserNotes = async (token) => {
	const config = {
		headers: { headers, Authorization: `Bearer ${token}` },
	};

	const response = await axios.get(API_URL_NOTES, config);

	return response.data;
};

const getUserNote = async (noteId, token) => {
	const config = {
		headers: { headers, Authorization: `Bearer ${token}` },
	};

	const response = await axios.get(API_URL_NOTE + noteId, config);

	return response.data;
};

const createUserNote = async (data, token) => {
	const config = {
		headers: { headers, Authorization: `Bearer ${token}` },
	};

	return await axios.post(API_URL_NOTES, data, config);
};

const updateUserNote = async (noteId, data, token) => {
	const config = {
		headers: { headers, Authorization: `Bearer ${token}` },
	};

	const response = await axios.put(API_URL_NOTE + noteId, data, config);

	return response.data;
};

const deleteUserNote = async (noteId, token) => {
	const config = {
		headers: { headers, Authorization: `Bearer ${token}` },
	};

	const response = axios.delete(API_URL_NOTE + noteId, config);

	return response.data;
};

const noteService = {
	createUserNote,
	updateUserNote,
	deleteUserNote,
	getUserNotes,
	getUserNote,
};

export default noteService;
