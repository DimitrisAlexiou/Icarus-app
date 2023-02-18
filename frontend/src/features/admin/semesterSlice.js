import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API_URL_ADMIN } from '../../constants/config';
import { extractErrorMessage } from '../../utils/redux/errorMessage';
import semesterService from './semesterService';

const initialState = {
	semester: {},
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: '',
};

export const defineSemester = createAsyncThunk(API_URL_ADMIN, async (data, thunkAPI) => {
	try {
		const token = thunkAPI.getState().auth.user.token;
		return await semesterService.defineSemester(data);
	} catch (error) {
		return thunkAPI.rejectWithValue(extractErrorMessage(error));
	}
});

export const getSemester = createAsyncThunk(API_URL_ADMIN, async (_, thunkAPI) => {
	try {
		const token = thunkAPI.getState().auth.user.token;
		return await semesterService.getSemester();
	} catch (error) {
		return thunkAPI.rejectWithValue(extractErrorMessage(error));
	}
});

export const deleteSemester = createAsyncThunk(API_URL_ADMIN, async (semesterId, thunkAPI) => {
	try {
		const token = thunkAPI.getState().auth.user.token;
		return await semesterService.deleteSemester(semesterId);
	} catch (error) {
		return thunkAPI.rejectWithValue(extractErrorMessage(error));
	}
});

export const semesterSlice = createSlice({
	name: 'semester',
	initialState,
	reducers: {
		resetSemester: () => initialState,
	},
	extraReducers: (builder) => {
		builder
			.addCase(defineSemester.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(defineSemester.fulfilled, (state) => {
				state.isLoading = false;
				state.isSuccess = true;
			})
			.addCase(defineSemester.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			});
		// .addCase(getSemester.pending, (state) => {
		// 	state.isLoading = true;
		// });
		// .addCase(getSemester.fulfilled, (state, action) => {
		// 	state.isLoading = false;
		// 	state.isSuccess = true;
		// 	state.semester = action.payload;
		// })
		// .addCase(getSemester.rejected, (state, action) => {
		// 	state.isLoading = false;
		// 	state.isError = true;
		// 	state.message = action.payload;
		// })
		// .addCase(deleteSemester.fulfilled, (state, action) => {
		// 	state.isLoading = false;
		// 	state.isSuccess = true;
		// 	state.message = action.payload;
		// });
	},
});

export const { resetSemester } = semesterSlice.actions;
export default semesterSlice.reducer;
