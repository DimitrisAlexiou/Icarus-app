import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API_URL_COURSE } from '../../constants/config';
import { extractErrorMessage } from '../../utils/redux/errorMessage';
import { Toast } from '../../constants/sweetAlertNotification';
import courseService from './courseService';

const initialState = {
	courses: [],
	course: {},
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: '',
};

export const createCourse = createAsyncThunk(API_URL_COURSE + '/create', async (data, thunkAPI) => {
	try {
		const token = thunkAPI.getState().auth.user.token;
		return await courseService.createCourse(data, token);
	} catch (error) {
		return thunkAPI.rejectWithValue(extractErrorMessage(error));
	}
});

export const updateCourse = createAsyncThunk(
	API_URL_COURSE + '/update',
	async (courseId, data, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token;
			return await courseService.updateCourse(courseId, data, token);
		} catch (error) {
			return thunkAPI.rejectWithValue(extractErrorMessage(error));
		}
	}
);

export const getCourse = createAsyncThunk(API_URL_COURSE + '/get', async (courseId, thunkAPI) => {
	try {
		const token = thunkAPI.getState().auth.user.token;
		return await courseService.getCourse(courseId, token);
	} catch (error) {
		return thunkAPI.rejectWithValue(extractErrorMessage(error));
	}
});

export const deleteCourse = createAsyncThunk(
	API_URL_COURSE + '/delete',
	async (courseId, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token;
			return await courseService.deleteCourse(courseId, token);
		} catch (error) {
			return thunkAPI.rejectWithValue(extractErrorMessage(error));
		}
	}
);

export const activateCourse = createAsyncThunk(
	API_URL_COURSE + '/activate',
	async (courseId, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token;
			return await courseService.activateCourse(courseId, token);
		} catch (error) {
			return thunkAPI.rejectWithValue(extractErrorMessage(error));
		}
	}
);

export const getCourses = createAsyncThunk(API_URL_COURSE + '/get_all', async (_, thunkAPI) => {
	try {
		const token = thunkAPI.getState().auth.user.token;
		return await courseService.getCourses(token);
	} catch (error) {
		return thunkAPI.rejectWithValue(extractErrorMessage(error));
	}
});

export const deleteCourses = createAsyncThunk(
	API_URL_COURSE + '/delete_all',
	async (_, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token;
			return await courseService.deleteCourses(token);
		} catch (error) {
			return thunkAPI.rejectWithValue(extractErrorMessage(error));
		}
	}
);

export const courseSlice = createSlice({
	name: 'course',
	initialState,
	reducers: {
		resetCourses: () => initialState,
	},
	extraReducers: (builder) => {
		builder
			.addCase(createCourse.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(createCourse.fulfilled, (state) => {
				state.isLoading = false;
				Toast.fire({
					title: 'Success',
					text: 'Course created!',
					icon: 'success',
				});
			})
			.addCase(createCourse.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(updateCourse.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(updateCourse.fulfilled, (state, action) => {
				state.isLoading = false;
				Toast.fire({
					title: 'Success',
					text: 'Course updated!',
					icon: 'success',
				});
				state.courses.map((course) =>
					course._id === action.payload._id ? action.payload : course
				);
			})
			.addCase(updateCourse.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(getCourse.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getCourse.fulfilled, (state, action) => {
				state.isLoading = false;
				state.course = action.payload;
			})
			.addCase(getCourse.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(deleteCourse.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(deleteCourse.fulfilled, (state) => {
				state.isLoading = false;
				Toast.fire({
					title: 'Success',
					text: 'Course deleted!',
					icon: 'success',
				});
			})
			.addCase(deleteCourse.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(activateCourse.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(activateCourse.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.courses.map((course) =>
					course._id === action.payload._id ? (course.isActive = true) : course
				);
			})
			.addCase(activateCourse.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(getCourses.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getCourses.fulfilled, (state, action) => {
				state.isLoading = false;
				state.courses = action.payload;
			})
			.addCase(getCourses.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(deleteCourses.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(deleteCourses.fulfilled, (state) => {
				state.isLoading = false;
				Toast.fire({
					title: 'Success',
					text: 'Courses deleted!',
					icon: 'success',
				});
			})
			.addCase(deleteCourses.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			});
	},
});

export const { resetCourses } = courseSlice.actions;
export default courseSlice.reducer;
