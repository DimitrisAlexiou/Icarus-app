import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { BASE_URL } from '../../constants/config';
import { extractErrorMessage } from '../../utils/redux/errorMessage';
import noteService from './noteService';

const initialState = {
	notes: [],
	note: {},
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: '',
};

// Get all User Notes
export const getUserNotes = createAsyncThunk(`${BASE_URL}/api/note`, async (_, thunkAPI) => {
	try {
		// const token = thunkAPI.getState().auth.user.token;
		// return await noteService.getUserNotes(token);
		return await noteService.getUserNotes();
	} catch (error) {
		return thunkAPI.rejectWithValue(extractErrorMessage(error));
	}
});

// Get User Note
export const getUserNote = createAsyncThunk(
	`${BASE_URL}/api/note/:noteId`,
	async (noteId, thunkAPI) => {
		try {
			// const token = thunkAPI.getState().auth.user.token;
			// return await noteService.getUserNote(token);
			return await noteService.getUserNote(noteId);
		} catch (error) {
			return thunkAPI.rejectWithValue(extractErrorMessage(error));
		}
	}
);

// Create User Note
export const createUserNote = createAsyncThunk(
	`${BASE_URL}/api/note`,
	async (noteData, thunkAPI) => {
		try {
			// const token = thunkAPI.getState().auth.user.token;
			// return await noteService.createUserNote(noteData, token);
			return await noteService.createUserNote(noteData);
		} catch (error) {
			return thunkAPI.rejectWithValue(extractErrorMessage(error));
		}
	}
);

// Update User Note
export const updateUserNote = createAsyncThunk(
	`${BASE_URL}/api/note/:noteId`,
	async (noteId, noteData, thunkAPI) => {
		try {
			// const token = thunkAPI.getState().auth.user.token;
			// return await noteService.updateUserNote(noteData, token);
			return await noteService.updateUserNote(noteId, noteData);
		} catch (error) {
			return thunkAPI.rejectWithValue(extractErrorMessage(error));
		}
	}
);

// Delete User Note
export const deleteUserNote = createAsyncThunk(
	`${BASE_URL}/api/note/:noteId`,
	async (noteId, thunkAPI) => {
		try {
			// const token = thunkAPI.getState().auth.user.token;
			// return await noteService.deleteUserNote(noteData, token);
			return await noteService.deleteUserNote(noteId);
		} catch (error) {
			return thunkAPI.rejectWithValue(extractErrorMessage(error));
		}
	}
);

export const noteSlice = createSlice({
	name: 'note',
	initialState,
	reducers: {
		reset: (state) => initialState,
	},
	extraReducers: (builder) => {
		builder
			.addCase(getUserNotes.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getUserNotes.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.notes = action.payload;
			})
			.addCase(getUserNotes.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(getUserNote.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getUserNote.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.note = action.payload;
			})
			.addCase(getUserNote.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			});
		// .addCase(createUserNote.pending, (state) => {
		// 	state.isLoading = true;
		// })
		// .addCase(createUserNote.fulfilled, (state) => {
		// 	state.isLoading = false;
		// 	state.isSuccess = true;
		// })
		// .addCase(createUserNote.rejected, (state, action) => {
		// 	state.isLoading = false;
		// 	state.isError = action.payload.status === 'error';
		// 	state.message = action.payload.message;
		// });
		// .addCase(updateUserNote.pending, (state) => {
		// 	state.isLoading = true;
		// })
		// .addCase(updateUserNote.fulfilled, (state, action) => {
		// 	state.isLoading = false;
		// 	state.isSuccess = true;
		// 	state.notes.map((note) =>
		// 		note._id === action.payload._id ? action.payload : note,
		// 	);
		// })
		// .addCase(updateUserNote.rejected, (state, action) => {
		// 	state.isLoading = false;
		// 	state.isError = action.payload.status === 'error';
		// 	state.message = action.payload.message;
		// });
		// .addCase(deleteUserNote.fulfilled, (state, action) => {
		// 	state.isLoading = false;
		// 	state.isSuccess = true;
		// })
		// .addCase(deleteUserNote.pending, (state) => {
		// 	state.isLoading = true;
		// })
		// .addCase(deleteUserNote.rejected, (state, action) => {
		// 	state.isLoading = false;
		// 	state.isError = action.payload.status === 'error';
		// 	state.message = action.payload.message;
		// });
	},
});

export const { reset } = noteSlice.actions;
export default noteSlice.reducer;
