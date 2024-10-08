import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { extractErrorMessage } from '../../utils/errorMessage';
import {
	displayErrorNotification,
	displaySuccessNotification,
} from '../../constants/sweetAlertNotification';
import {
	CREATE_NOTE,
	DELETE_CATEGORY,
	DELETE_NOTE,
	DELETE_NOTES,
	DELETE_USER_NOTES,
	GET_NOTE,
	GET_NOTES,
	GET_USER_NOTES,
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

export const getUserNotes = createAsyncThunk(
	GET_USER_NOTES,
	async (_, thunkAPI) => {
		try {
			return await noteService.getUserNotes();
		} catch (error) {
			return thunkAPI.rejectWithValue(extractErrorMessage(error));
		}
	}
);

export const getUserNote = createAsyncThunk(
	GET_NOTE,
	async (noteId, thunkAPI) => {
		try {
			return await noteService.getUserNote(noteId);
		} catch (error) {
			return thunkAPI.rejectWithValue(extractErrorMessage(error));
		}
	}
);

export const createUserNote = createAsyncThunk(
	CREATE_NOTE,
	async (data, thunkAPI) => {
		try {
			return await noteService.createUserNote(data);
		} catch (error) {
			return thunkAPI.rejectWithValue(extractErrorMessage(error));
		}
	}
);

export const updateUserNote = createAsyncThunk(
	UPDATE_NOTE,
	async ({ noteId, data }, thunkAPI) => {
		try {
			return await noteService.updateUserNote(noteId, data);
		} catch (error) {
			return thunkAPI.rejectWithValue(extractErrorMessage(error));
		}
	}
);

export const updateImportance = createAsyncThunk(
	UPDATE_IMPORTANCE,
	async (noteId, thunkAPI) => {
		try {
			return await noteService.updateImportance(noteId);
		} catch (error) {
			return thunkAPI.rejectWithValue(extractErrorMessage(error));
		}
	}
);

export const deleteCategory = createAsyncThunk(
	DELETE_CATEGORY,
	async ({ noteId, category }, thunkAPI) => {
		try {
			return await noteService.deleteCategory(noteId, category);
		} catch (error) {
			return thunkAPI.rejectWithValue(extractErrorMessage(error));
		}
	}
);

export const deleteUserNote = createAsyncThunk(
	DELETE_NOTE,
	async (noteId, thunkAPI) => {
		try {
			return await noteService.deleteUserNote(noteId);
		} catch (error) {
			return thunkAPI.rejectWithValue(extractErrorMessage(error));
		}
	}
);

export const deleteUserNotes = createAsyncThunk(
	DELETE_USER_NOTES,
	async (_, thunkAPI) => {
		try {
			return await noteService.deleteUserNotes();
		} catch (error) {
			return thunkAPI.rejectWithValue(extractErrorMessage(error));
		}
	}
);

export const getNotes = createAsyncThunk(GET_NOTES, async (_, thunkAPI) => {
	try {
		return await noteService.getNotes();
	} catch (error) {
		return thunkAPI.rejectWithValue(extractErrorMessage(error));
	}
});

export const deleteNotes = createAsyncThunk(
	DELETE_NOTES,
	async (_, thunkAPI) => {
		try {
			return await noteService.deleteNotes();
		} catch (error) {
			return thunkAPI.rejectWithValue(extractErrorMessage(error));
		}
	}
);

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
				if (payload !== `Seems like you haven't posted any notes yet.`)
					displayErrorNotification(payload);
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
				displayErrorNotification(payload);
			})
			.addCase(createUserNote.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(createUserNote.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				displaySuccessNotification(payload.message);
				state.notes = [...state.notes, payload.note];
			})
			.addCase(createUserNote.rejected, (state, { payload }) => {
				state.isLoading = false;
				displayErrorNotification(payload);
			})
			.addCase(updateUserNote.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(updateUserNote.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				displaySuccessNotification(payload.message);
				const updatedNoteIndex = state.notes.findIndex(
					(note) => note._id === payload.updatedNote._id
				);
				if (updatedNoteIndex !== -1)
					state.notes[updatedNoteIndex] = payload.updatedNote;
			})
			.addCase(updateUserNote.rejected, (state, { payload }) => {
				state.isLoading = false;
				displayErrorNotification(payload);
			})
			.addCase(updateImportance.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(updateImportance.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				displaySuccessNotification('Note importance updated!');
				const updatedNoteIndex = state.notes.findIndex(
					(note) => note._id === payload.updatedNote._id
				);
				if (updatedNoteIndex !== -1)
					state.notes[updatedNoteIndex].importance =
						payload.updatedNote.importance;
			})
			.addCase(updateImportance.rejected, (state, { payload }) => {
				state.isLoading = false;
				displayErrorNotification(payload);
			})
			.addCase(deleteCategory.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(deleteCategory.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				displaySuccessNotification(payload.message);
				const updatedNoteIndex = state.notes.findIndex(
					(note) => note._id === payload.updatedNote._id
				);
				if (updatedNoteIndex !== -1)
					state.notes[updatedNoteIndex] = payload.updatedNote;
			})
			.addCase(deleteCategory.rejected, (state, { payload }) => {
				state.isLoading = false;
				displayErrorNotification(payload);
			})
			.addCase(deleteUserNote.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(deleteUserNote.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				displaySuccessNotification(payload.message);
				state.notes = state.notes.filter((note) => {
					return note._id !== payload.note;
				});
			})
			.addCase(deleteUserNote.rejected, (state, { payload }) => {
				state.isLoading = false;
				displayErrorNotification(payload);
			})
			.addCase(deleteUserNotes.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(deleteUserNotes.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				displaySuccessNotification(payload);
			})
			.addCase(deleteUserNotes.rejected, (state, { payload }) => {
				state.isLoading = false;
				displayErrorNotification(payload);
			})
			.addCase(getNotes.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getNotes.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				state.notes = payload;
			})
			.addCase(getNotes.rejected, (state, { payload }) => {
				state.isLoading = false;
				if (
					payload !== 'Seems like there are no notes registered in the system.'
				)
					displayErrorNotification(payload);
			})
			.addCase(deleteNotes.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(deleteNotes.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				displaySuccessNotification(payload);
			})
			.addCase(deleteNotes.rejected, (state, { payload }) => {
				state.isLoading = false;
				displayErrorNotification(payload);
			});
	},
});

export const { resetNotes, setEditNote } = noteSlice.actions;
export default noteSlice.reducer;
