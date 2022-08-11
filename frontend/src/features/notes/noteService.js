import axios from 'axios';
import { BASE_URL, headers } from '../../constants/config';
const API_URL_NOTES = `${BASE_URL}/api/note`;
const API_URL_NOTE = `${BASE_URL}/api/note/`;

// Get User Notes
// const getUserNotes = async (token) => {
const getUserNotes = async () => {
	const config = {
		headers: { headers },
	};

	const response = await axios.get(API_URL_NOTES, config);

	return response.data;
};

// Get User Note
// const getUserNote = async (noteId, token) => {
const getUserNote = async (noteId) => {
	const config = {
		headers: { headers },
	};

	const response = await axios.get(API_URL_NOTE + noteId, config);

	return response.data;
};

// Create User Note
const createUserNote = async (noteData, token) => {
	const config = {
		headers: { headers },
	};

	return await axios.post(API_URL_NOTES, noteData, config);
};

// Update User Note
const updateUserNote = async (noteId, noteData, token) => {
	const config = {
		headers: { headers },
	};

	const response = await axios.put(API_URL_NOTE + noteId, noteData, config);

	return response.data;
};

// Delete User Note
const deleteUserNote = async (noteId, token) => {
	const config = {
		headers: { headers },
	};

	return await axios.delete(API_URL_NOTE + noteId, config);
};

const noteService = {
	createUserNote,
	updateUserNote,
	deleteUserNote,
	getUserNotes,
	getUserNote,
};

export default noteService;
