import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API_URL_COURSE } from '../../constants/config';
import { extractErrorMessage } from '../../utils/errorMessage';
import { Toast } from '../../constants/sweetAlertNotification';
import courseService from './courseService';

const initialState = {
	courses: [],
	course: {},
	totalCourses: 0,
	numOfPages: 1,
	page: 1,
	isLoading: false,
	isEditingCourse: false,
	editCourseId: '',
};

export const createCourse = createAsyncThunk(API_URL_COURSE + '/create', async (data, thunkAPI) => {
	try {
		return await courseService.createCourse(data);
	} catch (error) {
		return thunkAPI.rejectWithValue(extractErrorMessage(error));
	}
});

export const updateCourse = createAsyncThunk(
	API_URL_COURSE + '/update',
	async ({ courseId, data }, thunkAPI) => {
		try {
			return await courseService.updateCourse(courseId, data);
		} catch (error) {
			return thunkAPI.rejectWithValue(extractErrorMessage(error));
		}
	}
);

export const getCourse = createAsyncThunk(API_URL_COURSE + '/get', async (courseId, thunkAPI) => {
	try {
		return await courseService.getCourse(courseId);
	} catch (error) {
		return thunkAPI.rejectWithValue(extractErrorMessage(error));
	}
});

export const deleteCourse = createAsyncThunk(
	API_URL_COURSE + '/delete',
	async (courseId, thunkAPI) => {
		try {
			await courseService.deleteCourse(courseId);
			return thunkAPI.dispatch(getCourses());
		} catch (error) {
			return thunkAPI.rejectWithValue(extractErrorMessage(error));
		}
	}
);

export const activateCourse = createAsyncThunk(
	API_URL_COURSE + '/activate',
	async (courseId, thunkAPI) => {
		try {
			return await courseService.activateCourse(courseId);
		} catch (error) {
			return thunkAPI.rejectWithValue(extractErrorMessage(error));
		}
	}
);

export const getCourses = createAsyncThunk(API_URL_COURSE + '/get_all', async (_, thunkAPI) => {
	try {
		const { page, search, searchStatus, searchType, sort } = thunkAPI.getState().courses;
		let url = `?page=${page}`;
		// let url = `/jobs?status=${searchStatus}&jobType=${searchType}&sort=${sort}&page=${page}`;
		return await courseService.getCourses(url);
	} catch (error) {
		return thunkAPI.rejectWithValue(extractErrorMessage(error));
	}
});

export const deleteCourses = createAsyncThunk(
	API_URL_COURSE + '/delete_all',
	async (_, thunkAPI) => {
		try {
			return await courseService.deleteCourses();
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
		handleChange: (state, { payload: { name, value } }) => {
			state.page = 1;
			state[name] = value;
		},
		changePage: (state, { payload }) => {
			state.page = payload;
		},
		setEditCourse: (state, { payload }) => {
			return { ...state, isEditingCourse: true, ...payload };
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(createCourse.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(createCourse.fulfilled, (state, action) => {
				state.isLoading = false;
				Toast.fire({
					title: 'Success',
					text: 'Course created!',
					icon: 'success',
				});
				state.courses = [...state.courses, action.payload];
			})
			.addCase(createCourse.rejected, (state, action) => {
				state.isLoading = false;
				Toast.fire({
					title: 'Something went wrong!',
					text: action.payload,
					icon: 'error',
				});
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
				Toast.fire({
					title: 'Something went wrong!',
					text: action.payload,
					icon: 'error',
				});
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
				if (action.payload !== 'Seems like there is no course with this ID.')
					Toast.fire({
						title: 'Something went wrong!',
						text: action.payload,
						icon: 'error',
					});
			})
			.addCase(deleteCourse.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(deleteCourse.fulfilled, (state, action) => {
				state.isLoading = false;
				Toast.fire({
					title: 'Success',
					text: action.payload,
					icon: 'success',
				});
				// state.filter((course) => course._id !== action.payload);
				// state.courses = [
				// 	...state.courses,
				// 	state.courses.filter((course) => course._id !== action.payload._id),
				// ];
			})
			.addCase(deleteCourse.rejected, (state, action) => {
				state.isLoading = false;
				Toast.fire({
					title: 'Something went wrong!',
					text: action.payload,
					icon: 'error',
				});
			})
			.addCase(activateCourse.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(activateCourse.fulfilled, (state, action) => {
				state.isLoading = false;
				Toast.fire({
					title: 'Success',
					text: 'Course activated!',
					icon: 'success',
				});
				state.courses.map((course) =>
					course._id === action.payload._id ? (course.isActive = true) : course
				);
			})
			.addCase(activateCourse.rejected, (state, action) => {
				state.isLoading = false;
				Toast.fire({
					title: 'Something went wrong!',
					text: action.payload,
					icon: 'error',
				});
			})
			.addCase(getCourses.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getCourses.fulfilled, (state, action) => {
				state.isLoading = false;
				state.courses = action.payload;
				state.numOfPages = action.payload.numOfPages;
				state.totalJobs = action.payload.totalJobs;
			})
			.addCase(getCourses.rejected, (state, action) => {
				state.isLoading = false;
				Toast.fire({
					title: 'Something went wrong!',
					text: action.payload,
					icon: 'error',
				});
			})
			.addCase(deleteCourses.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(deleteCourses.fulfilled, (state, action) => {
				state.isLoading = false;
				Toast.fire({
					title: 'Success',
					text: action.payload,
					icon: 'success',
				});
			})
			.addCase(deleteCourses.rejected, (state, action) => {
				state.isLoading = false;
				Toast.fire({
					title: 'Something went wrong!',
					text: action.payload,
					icon: 'error',
				});
			});
	},
});

export const { resetCourses, changePage, handleChange, setEditCourse } = courseSlice.actions;
export default courseSlice.reducer;
