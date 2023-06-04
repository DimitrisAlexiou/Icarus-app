import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API_URL_NOTE } from '../../constants/config';
import { extractErrorMessage } from '../../utils/errorMessage';
import { Toast } from '../../constants/sweetAlertNotification';
import noteService from './noteService';

const initialState = {
	notes: [],
	note: {},
	isLoading: false,
	isEditing: false,
	editNoteId: '',
};

export const getUserNotes = createAsyncThunk(API_URL_NOTE, async (_, thunkAPI) => {
	try {
		return await noteService.getUserNotes();
	} catch (error) {
		return thunkAPI.rejectWithValue(extractErrorMessage(error));
	}
});

export const getUserNote = createAsyncThunk(API_URL_NOTE + 'get', async (noteId, thunkAPI) => {
	try {
		return await noteService.getUserNote(noteId);
	} catch (error) {
		return thunkAPI.rejectWithValue(extractErrorMessage(error));
	}
});

export const createUserNote = createAsyncThunk(API_URL_NOTE + 'create', async (data, thunkAPI) => {
	try {
		return await noteService.createUserNote(data);
	} catch (error) {
		return thunkAPI.rejectWithValue(extractErrorMessage(error));
	}
});

export const updateUserNote = createAsyncThunk(
	API_URL_NOTE + 'update',
	async ({ noteId, data }, thunkAPI) => {
		try {
			return await noteService.updateUserNote(noteId, data);
			// return thunkAPI.dispatch(getUserNotes());
		} catch (error) {
			return thunkAPI.rejectWithValue(extractErrorMessage(error));
		}
	}
);

export const updateImportance = createAsyncThunk(
	API_URL_NOTE + 'update_importance',
	async (noteId, thunkAPI) => {
		try {
			const updatedNote = await noteService.updateImportance(noteId);
			return { noteId, updatedNote };
		} catch (error) {
			return thunkAPI.rejectWithValue(extractErrorMessage(error));
		}
	}
);

export const deleteUserNote = createAsyncThunk(
	API_URL_NOTE + 'delete',
	async (noteId, thunkAPI) => {
		try {
			await noteService.deleteUserNote(noteId);
			return thunkAPI.dispatch(getUserNotes());
		} catch (error) {
			return thunkAPI.rejectWithValue(extractErrorMessage(error));
		}
	}
);

export const deleteUserNotes = createAsyncThunk(
	API_URL_NOTE + 'delete_all',
	async (_, thunkAPI) => {
		try {
			await noteService.deleteUserNotes();
			return thunkAPI.dispatch(getUserNotes());
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
			return { ...state, isEditing: true, ...payload };
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getUserNotes.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getUserNotes.fulfilled, (state, action) => {
				state.isLoading = false;
				state.notes = action.payload;
			})
			.addCase(getUserNotes.rejected, (state, action) => {
				state.isLoading = false;
				Toast.fire({
					title: 'Something went wrong!',
					text: action.payload,
					icon: 'error',
				});
			})
			.addCase(getUserNote.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getUserNote.fulfilled, (state, action) => {
				state.isLoading = false;
				state.note = action.payload;
			})
			.addCase(getUserNote.rejected, (state, action) => {
				state.isLoading = false;
				Toast.fire({
					title: 'Something went wrong!',
					text: action.payload,
					icon: 'error',
				});
			})
			.addCase(createUserNote.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(createUserNote.fulfilled, (state, action) => {
				state.isLoading = false;
				Toast.fire({
					title: 'Success',
					text: 'Note posted!',
					icon: 'success',
				});
				state.notes = [...state.notes, action.payload];
			})
			.addCase(createUserNote.rejected, (state, action) => {
				state.isLoading = false;
				Toast.fire({
					title: 'Something went wrong!',
					text: action.payload,
					icon: 'error',
				});
			})
			.addCase(updateUserNote.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(updateUserNote.fulfilled, (state, action) => {
				state.isLoading = false;
				Toast.fire({
					title: 'Success',
					text: 'Note updated!',
					icon: 'success',
				});
				// state.note = action.payload;
				// state.notes = state.notes.map((note) =>
				// 	note._id === action.payload._id ? action.payload : note
				// );
				// state.notes = [
				// 	...state.notes,
				// 	state.notes.map((note) =>
				// 		note._id === action.payload._id ? action.payload : note
				// 	),
				// ];
			})
			.addCase(updateUserNote.rejected, (state, action) => {
				state.isLoading = false;
				Toast.fire({
					title: 'Something went wrong!',
					text: action.payload,
					icon: 'error',
				});
			})
			.addCase(updateImportance.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(updateImportance.fulfilled, (state, action) => {
				const { noteId, updatedNote } = action.payload;
				state.isLoading = false;
				Toast.fire({
					title: 'Success',
					text: 'Note importance updated!',
					icon: 'success',
				});
				state.note = action.payload;
				state.notes = state.notes.map((note) => {
					if (note._id === noteId) {
						return {
							...note,
							importance: !updatedNote.importance,
						};
					} else {
						return note;
					}
				});
			})
			.addCase(updateImportance.rejected, (state, action) => {
				state.isLoading = false;
				Toast.fire({
					title: 'Something went wrong!',
					text: action.payload,
					icon: 'error',
				});
			})
			.addCase(deleteUserNote.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(deleteUserNote.fulfilled, (state) => {
				state.isLoading = false;
				Toast.fire({
					title: 'Success',
					text: 'Note deleted!',
					icon: 'success',
				});
			})
			.addCase(deleteUserNote.rejected, (state, action) => {
				state.isLoading = false;
				Toast.fire({
					title: 'Something went wrong!',
					text: action.payload,
					icon: 'error',
				});
			})
			.addCase(deleteUserNotes.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(deleteUserNotes.fulfilled, (state) => {
				state.isLoading = false;
				Toast.fire({
					title: 'Success',
					text: 'Notes deleted!',
					icon: 'success',
				});
			})
			.addCase(deleteUserNotes.rejected, (state, action) => {
				state.isLoading = false;
				Toast.fire({
					title: 'Something went wrong!',
					text: action.payload,
					icon: 'error',
				});
			});
	},
});

export const { resetNotes, setEditNote } = noteSlice.actions;
export default noteSlice.reducer;
