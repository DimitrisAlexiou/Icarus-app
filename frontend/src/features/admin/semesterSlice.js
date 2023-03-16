import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API_URL_ADMIN } from '../../constants/config';
import { extractErrorMessage } from '../../utils/redux/errorMessage';
import { Toast } from '../../constants/sweetAlertNotification';
import semesterService from './semesterService';

const initialState = {
	semesters: [],
	semester: null,
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: '',
};

export const defineSemester = createAsyncThunk(
	API_URL_ADMIN + '/defineSemester',
	async (data, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token;
			return await semesterService.defineSemester(data, token);
		} catch (error) {
			return thunkAPI.rejectWithValue(extractErrorMessage(error));
		}
	}
);

export const updateSemester = createAsyncThunk(
	API_URL_ADMIN + '/updateSemester',
	async (semesterId, data, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token;
			return await semesterService.updateSemester(semesterId, data, token);
		} catch (error) {
			return thunkAPI.rejectWithValue(extractErrorMessage(error));
		}
	}
);

export const getSemesters = createAsyncThunk(
	API_URL_ADMIN + '/getSemesters',
	async (_, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token;
			return await semesterService.getSemesters(token);
		} catch (error) {
			return thunkAPI.rejectWithValue(extractErrorMessage(error));
		}
	}
);

export const getSemester = createAsyncThunk(API_URL_ADMIN + '/getSemester', async (_, thunkAPI) => {
	try {
		const token = thunkAPI.getState().auth.user.token;
		return await semesterService.getSemester(token);
	} catch (error) {
		return thunkAPI.rejectWithValue(extractErrorMessage(error));
	}
});

export const deleteSemester = createAsyncThunk(
	API_URL_ADMIN + '/deleteSemester',
	async (semesterId, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token;
			return await semesterService.deleteSemester(semesterId, token);
		} catch (error) {
			return thunkAPI.rejectWithValue(extractErrorMessage(error));
		}
	}
);

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
			.addCase(defineSemester.fulfilled, (state, action) => {
				state.isLoading = false;
				Toast.fire({
					title: 'Success',
					text: 'Semester defined successfully!',
					icon: 'success',
				});
				state.semester = action.payload;
			})
			.addCase(defineSemester.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(getSemesters.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getSemesters.fulfilled, (state, action) => {
				state.isLoading = false;
				state.semesters = action.payload;
			})
			.addCase(getSemesters.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(getSemester.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getSemester.fulfilled, (state, action) => {
				state.isLoading = false;
				state.semester = action.payload;
			})
			.addCase(getSemester.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(updateSemester.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(updateSemester.fulfilled, (state, action) => {
				state.isLoading = false;
				Toast.fire({
					title: 'Success',
					text: 'Semester updated successfully!',
					icon: 'success',
				});
				state.semesters.map((semester) =>
					semester._id === action.payload._id ? action.payload : semester
				);
			})
			.addCase(updateSemester.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(deleteSemester.fulfilled, (state) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.semester = null;
			})
			.addCase(deleteSemester.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			});
	},
});

export const { resetSemester } = semesterSlice.actions;
export default semesterSlice.reducer;
