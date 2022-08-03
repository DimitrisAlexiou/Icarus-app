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

// Update Course
export const updateCourse = createAsyncThunk(
	`${BASE_URL}/api/course/:courseId/edit`,
	async (courseId, courseData, thunkAPI) => {
		try {
			// const token = thunkAPI.getState().auth.user.token;
			// return await courseService.createCourse(courseData, token);
			return await courseService.updateCourse(courseId, courseData);
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

// Activate Course
export const activateCourse = createAsyncThunk(
	`${BASE_URL}/api/course/:courseId/activate`,
	async (courseId, thunkAPI) => {
		try {
			// const token = thunkAPI.getState().auth.user.token;
			// return await courseService.createCourse(courseData, token);
			return await courseService.activateCourse(courseId);
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

// Get Course
export const getCourse = createAsyncThunk(
	`${BASE_URL}/api/course/:courseId`,
	async (courseId, thunkAPI) => {
		try {
			// const token = thunkAPI.getState().auth.user.token;
			// return await courseService.getCourse(token);
			return await courseService.getCourse(courseId);
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

// Delete Course
export const deleteCourse = createAsyncThunk(
	`${BASE_URL}/api/course/:courseId`,
	async (courseId, thunkAPI) => {
		try {
			// const token = thunkAPI.getState().auth.user.token;
			// return await courseService.createCourse(courseData, token);
			return await courseService.deleteCourse(courseId);
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
				state.isError = action.payload.status === 'error';
				state.message = action.payload.message;
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
			})
			.addCase(getCourse.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getCourse.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.course = action.payload;
			})
			.addCase(getCourse.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(updateCourse.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(updateCourse.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.courses.map((course) =>
					course._id === action.payload._id ? action.payload : course,
				);
			})
			.addCase(updateCourse.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = action.payload.status === 'error';
				state.message = action.payload.message;
			})
			.addCase(activateCourse.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.courses.map((course) =>
					course._id === action.payload._id ? (course.isActive = true) : course,
				);
			});
		// .addCase(deleteCourse.fulfilled, (state, action) => {
		// 	state.isLoading = false;
		// 	state.isSuccess = true;
		// 	state.message = action.payload.message;
		// });
		// .addCase(deleteCourse.pending, (state) => {
		// 	state.isLoading = true;
		// })
		// .addCase(deleteCourse.rejected, (state, action) => {
		// 	state.isLoading = false;
		// 	state.isError = action.payload.status === 'error';
		// 	state.message = action.payload.message;
		// });
	},
});

export const { reset } = courseSlice.actions;
export default courseSlice.reducer;
