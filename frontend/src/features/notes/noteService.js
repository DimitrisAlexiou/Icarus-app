import axiosFetch from '../../utils/axios';
import { API_URL_NOTE } from '../../constants/apiConfig';

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

	const response = await axiosFetch.patch(API_URL_NOTE + '/' + noteId, updatedNote);

	return response.data;
};

const deleteUserNote = async (noteId) => {
	const response = axiosFetch.delete(API_URL_NOTE + '/' + noteId);

	return response.data;
};

const deleteUserNotes = async () => {
	const response = axiosFetch.delete(API_URL_NOTE);

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
