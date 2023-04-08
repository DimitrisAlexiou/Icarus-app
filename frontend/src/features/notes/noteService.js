import axios from 'axios';
import { API_URL_NOTE, headers } from '../../constants/config';

const getUserNotes = async (token) => {
	const config = {
		headers: { headers, Authorization: `Bearer ${token}` },
	};

	const response = await axios.get(API_URL_NOTE, config);

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

	const response = await axios.post(API_URL_NOTE, data, config);

	return response.data;
};

const updateUserNote = async (noteId, data, token) => {
	const config = {
		headers: { headers, Authorization: `Bearer ${token}` },
	};

	const response = await axios.put(API_URL_NOTE + noteId, data, config);

	return response.data;
};

const updateImportance = async (noteId, token) => {
	const config = {
		headers: { headers, Authorization: `Bearer ${token}` },
	};

	const currentNote = await axios.get(API_URL_NOTE + noteId, config);

	const updatedNote = {
		...currentNote.data,
		importance: !currentNote.data.importance,
	};

	const response = await axios.put(API_URL_NOTE + noteId, updatedNote, config);

	return response.data;
};

const deleteUserNote = async (noteId, token) => {
	const config = {
		headers: { headers, Authorization: `Bearer ${token}` },
	};

	const response = axios.delete(API_URL_NOTE + noteId, config);

	return response.data;
};

const deleteUserNotes = async (token) => {
	const config = {
		headers: { headers, Authorization: `Bearer ${token}` },
	};

	const response = axios.delete(API_URL_NOTE, config);

	return response.data;
};

const noteService = {
	createUserNote,
	updateUserNote,
	updateImportance,
	deleteUserNote,
	deleteUserNotes,
	getUserNote,
	getUserNotes,
};

export default noteService;
