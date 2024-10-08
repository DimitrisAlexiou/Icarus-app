import axiosFetch from '../../utils/axios';
import { API_URL_ADMIN_NOTES, API_URL_NOTE } from '../../constants/apiConfig';

const getUserNotes = async () => {
	const response = await axiosFetch.get(API_URL_NOTE);

	return response.data;
};

const getUserNote = async (noteId) => {
	const response = await axiosFetch.get(API_URL_NOTE + '/' + noteId);

	return response.data;
};

const createUserNote = async (data) => {
	const response = await axiosFetch.post(API_URL_NOTE, data);

	return response.data;
};

const updateUserNote = async (noteId, data) => {
	const response = await axiosFetch.put(API_URL_NOTE + '/' + noteId, data);

	return response.data;
};

const updateImportance = async (noteId) => {
	const currentNote = await axiosFetch.get(API_URL_NOTE + '/' + noteId);

	const updatedNote = {
		...currentNote.data,
		importance: !currentNote.data.importance,
	};

	const response = await axiosFetch.patch(
		API_URL_NOTE + '/' + noteId + '/importance',
		updatedNote
	);

	return response.data;
};

const deleteCategory = async (noteId, data) => {
	const response = await axiosFetch.patch(
		API_URL_NOTE + '/' + noteId + '/category',
		data
	);

	return response.data;
};

const deleteUserNote = async (noteId) => {
	const response = await axiosFetch.delete(API_URL_NOTE + '/' + noteId);

	return response.data;
};

const deleteUserNotes = async () => {
	const response = await axiosFetch.delete(API_URL_NOTE);

	return response.data;
};

const getNotes = async () => {
	const response = await axiosFetch.get(API_URL_ADMIN_NOTES);

	return response.data;
};

const deleteNotes = async () => {
	const response = await axiosFetch.delete(API_URL_ADMIN_NOTES);

	return response.data;
};

const noteService = {
	createUserNote,
	updateUserNote,
	updateImportance,
	deleteCategory,
	deleteUserNote,
	deleteUserNotes,
	getUserNote,
	getUserNotes,
	getNotes,
	deleteNotes,
};

export default noteService;
