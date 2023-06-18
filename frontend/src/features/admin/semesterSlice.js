import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API_URL_ADMIN } from '../../constants/config';
import { extractErrorMessage } from '../../utils/errorMessage';
import { Toast } from '../../constants/sweetAlertNotification';
import semesterService from './semesterService';

const initialState = {
	semesters: [],
	semester: null,
	isLoading: false,
	isEditingSemester: false,
	editSemesterId: '',
};

export const defineSemester = createAsyncThunk(
	API_URL_ADMIN + '/defineSemester',
	async (data, thunkAPI) => {
		try {
			return await semesterService.defineSemester(data);
		} catch (error) {
			return thunkAPI.rejectWithValue(extractErrorMessage(error));
		}
	}
);

export const updateSemester = createAsyncThunk(
	API_URL_ADMIN + '/updateSemester',
	async ({ semesterId, data }, thunkAPI) => {
		try {
			return await semesterService.updateSemester(semesterId, data);
		} catch (error) {
			return thunkAPI.rejectWithValue(extractErrorMessage(error));
		}
	}
);

export const getSemesters = createAsyncThunk(
	API_URL_ADMIN + '/getSemesters',
	async (_, thunkAPI) => {
		try {
			return await semesterService.getSemesters();
		} catch (error) {
			return thunkAPI.rejectWithValue(extractErrorMessage(error));
		}
	}
);

export const getSemester = createAsyncThunk(API_URL_ADMIN + '/getSemester', async (_, thunkAPI) => {
	try {
		return await semesterService.getSemester();
	} catch (error) {
		return thunkAPI.rejectWithValue(extractErrorMessage(error));
	}
});

export const deleteSemester = createAsyncThunk(
	API_URL_ADMIN + '/deleteSemester',
	async (semesterId, thunkAPI) => {
		try {
			return await semesterService.deleteSemester(semesterId);
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
		setEditSemester: (state, { payload }) => {
			return { ...state, isEditingSemester: true, ...payload };
		},
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
					text: 'Semester defined!',
					icon: 'success',
				});
				state.semester = action.payload;
			})
			.addCase(defineSemester.rejected, (state, action) => {
				state.isLoading = false;
				Toast.fire({
					title: 'Something went wrong!',
					text: action.payload.message,
					icon: 'error',
				});
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
				if (action.payload !== 'Seems like there are no defined semesters.')
					Toast.fire({
						title: 'Something went wrong!',
						text: action.payload.message,
						icon: 'error',
					});
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
				if (action.payload !== 'Seems like there is no defined semester for this period.')
					Toast.fire({
						title: 'Something went wrong!',
						text: action.payload.message,
						icon: 'error',
					});
			})
			.addCase(updateSemester.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(updateSemester.fulfilled, (state, action) => {
				state.isLoading = false;
				Toast.fire({
					title: 'Success',
					text: 'Semester configuration updated!',
					icon: 'success',
				});
				state.semesters.map((semester) =>
					semester._id === action.payload._id ? action.payload : semester
				);
			})
			.addCase(updateSemester.rejected, (state, action) => {
				state.isLoading = false;
				Toast.fire({
					title: 'Something went wrong!',
					text: action.payload.message,
					icon: 'error',
				});
			})
			.addCase(deleteSemester.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(deleteSemester.fulfilled, (state, action) => {
				state.isLoading = false;
				Toast.fire({
					title: 'Success',
					text: action.payload.message,
					icon: 'success',
				});
				state.semester = null;
			})
			.addCase(deleteSemester.rejected, (state, action) => {
				state.isLoading = false;
				Toast.fire({
					title: 'Something went wrong!',
					text: action.payload.message,
					icon: 'error',
				});
			});
	},
});

export const { resetSemester, setEditSemester } = semesterSlice.actions;
export default semesterSlice.reducer;
