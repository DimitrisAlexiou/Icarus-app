import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { extractErrorMessage } from '../../utils/errorMessage';
import { Toast } from '../../constants/sweetAlertNotification';
import {
	DEFINE_SEMESTER,
	UPDATE_SEMESTER,
	GET_SEMESTER,
	DELETE_SEMESTER,
	GET_SEMESTERS,
} from '../actions';
import semesterService from './services/semesterService';

const initialState = {
	semesters: [],
	semester: null,
	isLoading: false,
	isEditingSemester: false,
	editSemesterId: '',
};

export const defineSemester = createAsyncThunk(DEFINE_SEMESTER, async (data, thunkAPI) => {
	try {
		return await semesterService.defineSemester(data);
	} catch (error) {
		return thunkAPI.rejectWithValue(extractErrorMessage(error));
	}
});

export const updateSemester = createAsyncThunk(
	UPDATE_SEMESTER,
	async ({ semesterId, data }, thunkAPI) => {
		try {
			return await semesterService.updateSemester(semesterId, data);
		} catch (error) {
			return thunkAPI.rejectWithValue(extractErrorMessage(error));
		}
	}
);

export const getSemesters = createAsyncThunk(GET_SEMESTERS, async (_, thunkAPI) => {
	try {
		return await semesterService.getSemesters();
	} catch (error) {
		return thunkAPI.rejectWithValue(extractErrorMessage(error));
	}
});

export const getSemester = createAsyncThunk(GET_SEMESTER, async (_, thunkAPI) => {
	try {
		return await semesterService.getSemester();
	} catch (error) {
		return thunkAPI.rejectWithValue(extractErrorMessage(error));
	}
});

export const deleteSemester = createAsyncThunk(DELETE_SEMESTER, async (semesterId, thunkAPI) => {
	try {
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
		setEditSemester: (state, { payload }) => {
			return { ...state, isEditingSemester: true, ...payload };
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(defineSemester.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(defineSemester.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				Toast.fire({
					title: 'Success',
					text: payload.message,
					icon: 'success',
				});
				state.semester = payload.semester;
				state.semesters = [...state.semesters, payload.semester];
			})
			.addCase(defineSemester.rejected, (state, { payload }) => {
				state.isLoading = false;
				if (payload.includes('startDate' && 'now'))
					Toast.fire({
						title: 'Something went wrong!',
						text: 'Semester start date must be greater than today.',
						icon: 'error',
					});
				else if (payload.includes('endDate' && 'startDate'))
					Toast.fire({
						title: 'Something went wrong!',
						text: 'Semester end date must be greater than semester start date.',
						icon: 'error',
					});
				else
					Toast.fire({
						title: 'Something went wrong!',
						text: payload,
						icon: 'error',
					});
			})
			.addCase(getSemesters.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getSemesters.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				state.semesters = payload;
			})
			.addCase(getSemesters.rejected, (state, { payload }) => {
				state.isLoading = false;
				if (payload !== 'Seems like there are no defined semesters.')
					Toast.fire({
						title: 'Something went wrong!',
						text: payload,
						icon: 'error',
					});
			})
			.addCase(getSemester.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getSemester.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				state.semester = payload;
			})
			.addCase(getSemester.rejected, (state, { payload }) => {
				state.isLoading = false;
				if (payload !== 'Seems like there is no defined semester for this period.')
					Toast.fire({
						title: 'Something went wrong!',
						text: payload,
						icon: 'error',
					});
			})
			.addCase(updateSemester.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(updateSemester.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				Toast.fire({
					title: 'Success',
					text: payload.message,
					icon: 'success',
				});
				const updatedSemesterIndex = state.semesters.findIndex(
					(semester) => semester._id === payload.updatedSemester._id
				);
				if (updatedSemesterIndex !== -1)
					state.semesters[updatedSemesterIndex] = payload.updatedSemester;
			})
			.addCase(updateSemester.rejected, (state, { payload }) => {
				state.isLoading = false;
				if (payload.includes('startDate' && 'now'))
					Toast.fire({
						title: 'Something went wrong!',
						text: 'Semester start date must be greater than today.',
						icon: 'error',
					});
				else if (payload.includes('endDate' && 'startDate'))
					Toast.fire({
						title: 'Something went wrong!',
						text: 'Semester end date must be greater than semester start date.',
						icon: 'error',
					});
				else
					Toast.fire({
						title: 'Something went wrong!',
						text: payload,
						icon: 'error',
					});
			})
			.addCase(deleteSemester.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(deleteSemester.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				Toast.fire({
					title: 'Success',
					text: payload.message,
					icon: 'success',
				});
				state.semester = null;
				state.semesters = state.semesters.filter((semester) => {
					return semester._id !== payload.semester;
				});
			})
			.addCase(deleteSemester.rejected, (state, { payload }) => {
				state.isLoading = false;
				Toast.fire({
					title: 'Something went wrong!',
					text: payload,
					icon: 'error',
				});
			});
	},
});

export const { resetSemester, setEditSemester } = semesterSlice.actions;
export default semesterSlice.reducer;
