import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API_URL_COURSE } from '../../constants/config';
import { extractErrorMessage } from '../../utils/redux/errorMessage';
import courseService from './courseService';

const initialState = {
	courses: [],
	course: {},
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: '',
};

// Create Course
export const createCourse = createAsyncThunk(`${API_URL_COURSE}/new`, async (data, thunkAPI) => {
	try {
		// const token = thunkAPI.getState().auth.user.token;
		// return await courseService.createCourse(data, token);
		return await courseService.createCourse(data);
	} catch (error) {
		return thunkAPI.rejectWithValue(extractErrorMessage(error));
	}
});

// Update Course
export const updateCourse = createAsyncThunk(
	`${API_URL_COURSE}/:courseId/edit`,
	async (courseId, courseData, thunkAPI) => {
		try {
			// const token = thunkAPI.getState().auth.user.token;
			// return await courseService.updateCourse(courseData, token);
			return await courseService.updateCourse(courseId, courseData);
		} catch (error) {
			return thunkAPI.rejectWithValue(extractErrorMessage(error));
		}
	}
);

// Activate Course
export const activateCourse = createAsyncThunk(
	`${API_URL_COURSE}/:courseId`,
	async (courseId, thunkAPI) => {
		try {
			// const token = thunkAPI.getState().auth.user.token;
			// return await courseService.createCourse(courseData, token);
			return await courseService.activateCourse(courseId);
		} catch (error) {
			return thunkAPI.rejectWithValue(extractErrorMessage(error));
		}
	}
);

// Get all Courses
export const getCourses = createAsyncThunk(API_URL_COURSE, async (_, thunkAPI) => {
	try {
		// const token = thunkAPI.getState().auth.user.token;
		// return await courseService.getCourses(token);
		return await courseService.getCourses();
	} catch (error) {
		return thunkAPI.rejectWithValue(extractErrorMessage(error));
	}
});

// Get Course
export const getCourse = createAsyncThunk(
	`${API_URL_COURSE}/:courseId`,
	async (courseId, thunkAPI) => {
		try {
			// const token = thunkAPI.getState().auth.user.token;
			// return await courseService.getCourse(token);
			return await courseService.getCourse(courseId);
		} catch (error) {
			return thunkAPI.rejectWithValue(extractErrorMessage(error));
		}
	}
);

// Delete Course
export const deleteCourse = createAsyncThunk(
	`${API_URL_COURSE}/:courseId`,
	async (courseId, thunkAPI) => {
		try {
			// const token = thunkAPI.getState().auth.user.token;
			// return await courseService.deleteCourse(courseData, token);
			return await courseService.deleteCourse(courseId);
		} catch (error) {
			return thunkAPI.rejectWithValue(extractErrorMessage(error));
		}
	}
);

export const courseSlice = createSlice({
	name: 'course',
	initialState,
	reducers: {
		reset: () => initialState,
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
				// state.isError = action.payload.status === 'error';
				// state.message = action.payload.message;
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
					course._id === action.payload._id ? action.payload : course
				);
			})
			.addCase(updateCourse.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = action.payload.status === 'error';
				state.message = action.payload.message;
			});
		// .addCase(activateCourse.fulfilled, (state, action) => {
		// 	state.isLoading = false;
		// 	state.isSuccess = true;
		// 	state.courses.map((course) =>
		// 		course._id === action.payload._id ? (course.isActive = true) : course,
		// 	);
		// });
		// .addCase(deleteCourse.fulfilled, (state, action) => {
		//  state.isLoading = false;
		//  state.isSuccess = true;
		//  state.message = action.payload.message;
		// });
		// .addCase(deleteCourse.pending, (state) => {
		//  state.isLoading = true;
		// })
		// .addCase(deleteCourse.rejected, (state, action) => {
		//  state.isLoading = false;
		//  state.isError = action.payload.status === 'error';
		//  state.message = action.payload.message;
		// });
	},
});

export const { reset } = courseSlice.actions;
export default courseSlice.reducer;
