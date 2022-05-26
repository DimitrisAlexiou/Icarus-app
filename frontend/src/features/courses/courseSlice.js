import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import courseService from './courseService';
import { BASE_URL } from '../../constants/config';

const initialState = {
	courses: [],
	course: {},
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: '',
};

// Create Course
export const createCourse = createAsyncThunk(
	`${BASE_URL}/api/course/new`,
	async (courseData, thunkAPI) => {
		try {
			// const token = thunkAPI.getState().auth.user.token;
			// return await courseService.createCourse(courseData, token);
			return await courseService.createCourse(courseData);
		} catch (error) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString();

			return thunkAPI.rejectWithValue(message);
		}
	},
);

// Get All Courses
export const getCourses = createAsyncThunk(
	`${BASE_URL}/api/course`,
	async (_, thunkAPI) => {
		try {
			// const token = thunkAPI.getState().auth.user.token;
			// return await courseService.getCourses(token);
			return await courseService.getCourses();
		} catch (error) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString();

			return thunkAPI.rejectWithValue(message);
		}
	},
);

export const courseSlice = createSlice({
	name: 'course',
	initialState,
	reducers: {
		reset: (state) => initialState,
	},
	extraReducers: (builder) => {
		builder
			.addCase(createCourse.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(createCourse.fulfilled, (state) => {
				state.isLoading = false;
				state.isSuccess = true;
			})
			.addCase(createCourse.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(getCourses.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getCourses.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.courses = action.payload;
			})
			.addCase(getCourses.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			});
	},
});

export const { reset } = courseSlice.actions;
export default courseSlice.reducer;
