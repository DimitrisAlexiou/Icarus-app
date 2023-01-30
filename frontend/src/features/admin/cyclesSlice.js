import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API_URL_ADMIN } from '../../constants/config';
import { extractErrorMessage } from '../../utils/redux/errorMessage';
import cyclesService from './cyclesService';

const initialState = {
	cycles: [],
	cycle: {},
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: '',
};

// Get all Cycles
export const getCycles = createAsyncThunk(`${API_URL_ADMIN}/cycles`, async (_, thunkAPI) => {
	try {
		// const token = thunkAPI.getState().auth.user.token;
		// return await cyclesService.getCycles(token);
		return await cyclesService.getCycles();
	} catch (error) {
		return thunkAPI.rejectWithValue(extractErrorMessage(error));
	}
});

// Get Cycle
// export const getCycle = createAsyncThunk(
// 	`${BASE_URL}/api/cycles/:cycleId`,
// 	async (cycleId, thunkAPI) => {
// 		try {
// 			// const token = thunkAPI.getState().auth.user.token;
// 			// return await cyclesService.getCycle(token);
// 			return await cyclesService.getCycle(cycleId);
// 		} catch (error) {
// 					return thunkAPI.rejectWithValue(extractErrorMessage(error));

// 		}
// 	}
// );

// Create User Note
//TODO
// export const createCycles = createAsyncThunk(
// 	`${BASE_URL}/api/cycles`,
// 	async (cycleData, thunkAPI) => {
// 		try {
// 			// const token = thunkAPI.getState().auth.user.token;
// 			// return await cyclesService.createCycles(cycleData, token);
// 			return await cyclesService.createCycles(cycleData);
// 		} catch (error) {
// 					return thunkAPI.rejectWithValue(extractErrorMessage(error));

// 		}
// 	}
// );

// TODO Update
// export const updateUserNote = createAsyncThunk(
// 	`${BASE_URL}/api/note/:noteId`,
// 	async (noteId, noteData, thunkAPI) => {
// 		try {
// 			// const token = thunkAPI.getState().auth.user.token;
// 			// return await noteService.updateUserNote(noteData, token);
// 			return await noteService.updateUserNote(noteId, noteData);
// 		} catch (error) {
// 					return thunkAPI.rejectWithValue(extractErrorMessage(error));

// 		}
// 	}
// );

// TODO Delete
// export const deleteUserNote = createAsyncThunk(
// 	`${BASE_URL}/api/note/:noteId`,
// 	async (noteId, thunkAPI) => {
// 		try {
// 			// const token = thunkAPI.getState().auth.user.token;
// 			// return await noteService.deleteUserNote(noteData, token);
// 			return await noteService.deleteUserNote(noteId);
// 		} catch (error) {
// 					return thunkAPI.rejectWithValue(extractErrorMessage(error));

// 		}
// 	}
// );

export const cyclesSlice = createSlice({
	name: 'cycle',
	initialState,
	reducers: {
		resetCycles: (state) => initialState,
	},
	extraReducers: (builder) => {
		builder
			.addCase(getCycles.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getCycles.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.cycles = action.payload;
			})
			.addCase(getCycles.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			});
		// .addCase(getUserNote.pending, (state) => {
		// 	state.isLoading = true;
		// })
		// .addCase(getUserNote.fulfilled, (state, action) => {
		// 	state.isLoading = false;
		// 	state.isSuccess = true;
		// 	state.note = action.payload;
		// })
		// .addCase(getUserNote.rejected, (state, action) => {
		// 	state.isLoading = false;
		// 	state.isError = true;
		// 	state.message = action.payload;
		// });
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

export const { resetCycles } = cyclesSlice.actions;
export default cyclesSlice.reducer;
