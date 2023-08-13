import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { extractErrorMessage } from '../../utils/errorMessage';
import { Toast } from '../../constants/sweetAlertNotification';
import {
	CREATE_NOTE,
	DELETE_NOTE,
	DELETE_NOTES,
	GET_NOTE,
	GET_NOTES,
	UPDATE_IMPORTANCE,
	UPDATE_NOTE,
} from '../actions';
import noteService from './noteService';

const initialState = {
	notes: [],
	note: {},
	isLoading: false,
	isEditingNote: false,
	editNoteId: '',
};

export const getUserNotes = createAsyncThunk(GET_NOTES, async (_, thunkAPI) => {
	try {
		return await noteService.getUserNotes();
	} catch (error) {
		return thunkAPI.rejectWithValue(extractErrorMessage(error));
	}
});

export const getUserNote = createAsyncThunk(GET_NOTE, async (noteId, thunkAPI) => {
	try {
		return await noteService.getUserNote(noteId);
	} catch (error) {
		return thunkAPI.rejectWithValue(extractErrorMessage(error));
	}
});

export const createUserNote = createAsyncThunk(CREATE_NOTE, async (data, thunkAPI) => {
	try {
		return await noteService.createUserNote(data);
	} catch (error) {
		return thunkAPI.rejectWithValue(extractErrorMessage(error));
	}
});

export const updateUserNote = createAsyncThunk(UPDATE_NOTE, async ({ noteId, data }, thunkAPI) => {
	try {
		return await noteService.updateUserNote(noteId, data);
	} catch (error) {
		return thunkAPI.rejectWithValue(extractErrorMessage(error));
	}
});

export const updateImportance = createAsyncThunk(UPDATE_IMPORTANCE, async (noteId, thunkAPI) => {
	try {
		const updatedNote = await noteService.updateImportance(noteId);
		return { noteId, updatedNote };
	} catch (error) {
		return thunkAPI.rejectWithValue(extractErrorMessage(error));
	}
});

export const deleteUserNote = createAsyncThunk(DELETE_NOTE, async (noteId, thunkAPI) => {
	try {
		return await noteService.deleteUserNote(noteId);
	} catch (error) {
		return thunkAPI.rejectWithValue(extractErrorMessage(error));
	}
});

export const deleteUserNotes = createAsyncThunk(DELETE_NOTES, async (_, thunkAPI) => {
	try {
		return await noteService.deleteUserNotes();
	} catch (error) {
		return thunkAPI.rejectWithValue(extractErrorMessage(error));
	}
});

export const noteSlice = createSlice({
	name: 'note',
	initialState,
	reducers: {
		resetNotes: () => initialState,
		setEditNote: (state, { payload }) => {
			return { ...state, isEditingNote: true, ...payload };
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getUserNotes.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getUserNotes.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				state.notes = payload;
			})
			.addCase(getUserNotes.rejected, (state, { payload }) => {
				state.isLoading = false;
				Toast.fire({
					title: 'Something went wrong!',
					text: payload,
					icon: 'error',
				});
			})
			.addCase(getUserNote.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getUserNote.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				state.note = payload;
			})
			.addCase(getUserNote.rejected, (state, { payload }) => {
				state.isLoading = false;
				Toast.fire({
					title: 'Something went wrong!',
					text: payload,
					icon: 'error',
				});
			})
			.addCase(createUserNote.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(createUserNote.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				Toast.fire({
					title: 'Success',
					text: payload.message,
					icon: 'success',
				});
				state.notes = [...state.notes, payload.note];
			})
			.addCase(createUserNote.rejected, (state, { payload }) => {
				state.isLoading = false;
				Toast.fire({
					title: 'Something went wrong!',
					text: payload,
					icon: 'error',
				});
			})
			.addCase(updateUserNote.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(updateUserNote.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				Toast.fire({
					title: 'Success',
					text: payload.message,
					icon: 'success',
				});
				const updatedNoteIndex = state.notes.findIndex(
					(note) => note._id === payload.updatedNote._id
				);
				if (updatedNoteIndex !== -1) state.notes[updatedNoteIndex] = payload.updatedNote;
			})
			.addCase(updateUserNote.rejected, (state, { payload }) => {
				state.isLoading = false;
				Toast.fire({
					title: 'Something went wrong!',
					text: payload,
					icon: 'error',
				});
			})
			.addCase(updateImportance.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(updateImportance.fulfilled, (state, { payload }) => {
				const { noteId, updatedNote } = payload;
				state.isLoading = false;
				Toast.fire({
					title: 'Success',
					text: 'Note importance updated!',
					icon: 'success',
				});
				state.note = payload;
				state.notes = state.notes.map((note) => {
					if (note._id === noteId)
						return {
							...note,
							importance: !updatedNote.importance,
						};

					return note;
				});
			})
			.addCase(updateImportance.rejected, (state, { payload }) => {
				state.isLoading = false;
				Toast.fire({
					title: 'Something went wrong!',
					text: payload,
					icon: 'error',
				});
			})
			.addCase(deleteUserNote.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(deleteUserNote.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				Toast.fire({
					title: 'Success',
					text: payload.message,
					icon: 'success',
				});
				state.notes = state.notes.filter((note) => {
					return note._id !== payload.note;
				});
			})
			.addCase(deleteUserNote.rejected, (state, { payload }) => {
				state.isLoading = false;
				Toast.fire({
					title: 'Something went wrong!',
					text: payload,
					icon: 'error',
				});
			})
			.addCase(deleteUserNotes.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(deleteUserNotes.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				Toast.fire({
					title: 'Success',
					text: payload,
					icon: 'success',
				});
			})
			.addCase(deleteUserNotes.rejected, (state, { payload }) => {
				state.isLoading = false;
				Toast.fire({
					title: 'Something went wrong!',
					text: payload,
					icon: 'error',
				});
			});
	},
});

export const { resetNotes, setEditNote } = noteSlice.actions;
export default noteSlice.reducer;
