import axios from 'axios';
import { API_URL_ADMIN, headers } from '../../constants/config';
const API_URL_CYCLES = `${API_URL_ADMIN}/cycles`;
// const API_URL_CYCLE = `${BASE_URL}/api/cycles/`;

// Get Cycles
// const getCycles = async (token) => {
const getCycles = async () => {
	const config = {
		headers: { headers },
	};

	const response = await axios.get(API_URL_CYCLES, config);

	return response.data;
};

// Get User Note
// const getUserNote = async (noteId, token) => {
// const getUserNote = async (noteId) => {
// 	const config = {
// 		headers: { headers },
// 	};

// 	const response = await axios.get(API_URL_NOTE + noteId, config);

// 	return response.data;
// };

// // Create User Note
// const createUserNote = async (noteData, token) => {
// 	const config = {
// 		headers: { headers },
// 	};

// 	return await axios.post(API_URL_NOTES, noteData, config);
// };

// // Update User Note
// const updateUserNote = async (noteId, noteData, token) => {
// 	const config = {
// 		headers: { headers },
// 	};

// 	const response = await axios.put(API_URL_NOTE + noteId, noteData, config);

// 	return response.data;
// };

// // Delete User Note
// const deleteUserNote = async (noteId, token) => {
// 	const config = {
// 		headers: { headers },
// 	};

// 	return await axios.delete(API_URL_NOTE + noteId, config);
// };

const cyclesService = {
	getCycles,
	// createUserNote,
	// updateUserNote,
	// deleteUserNote,
	// getUserNote,
};

export default cyclesService;
