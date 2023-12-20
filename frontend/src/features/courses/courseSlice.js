import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { extractErrorMessage } from '../../utils/errorMessage';
import {
	displayErrorNotification,
	displayNotification,
	displaySuccessNotification,
} from '../../constants/sweetAlertNotification';
import courseService from './services/courseService';
import {
	ACTIVATE_COURSE,
	CREATE_COURSE,
	DEACTIVATE_COURSE,
	DELETE_COURSE,
	DELETE_COURSES,
	ENROLL_COURSE,
	GET_COURSE,
	GET_COURSES,
	GET_ENROLLED_COURSES,
	UNENROLL_COURSE,
	UPDATE_COURSE,
} from '../actions';
import { updateEnrolledCourses } from '../auth/authSlice';
import {
	updateTeachingsAfterActivation,
	updateTeachingsAfterDeactivation,
} from './teachingSlice';
import { WARNING } from '../../constants/strings';

const initialFiltersState = {
	search: '',
	searchSemester: 'all',
	searchCycle: 'all',
	searchHasLab: 'all',
	sort: 'latest',
	sortOptions: ['latest', 'oldest', 'a-z', 'z-a'],
};

const initialState = {
	courses: [],
	course: {},
	totalCourses: 0,
	numOfPages: 1,
	page: 1,
	isLoading: false,
	isEditingCourse: false,
	editCourseId: '',
	...initialFiltersState,
};

export const createCourse = createAsyncThunk(
	CREATE_COURSE,
	async (data, thunkAPI) => {
		try {
			return await courseService.createCourse(data);
		} catch (error) {
			return thunkAPI.rejectWithValue(extractErrorMessage(error));
		}
	}
);

export const updateCourse = createAsyncThunk(
	UPDATE_COURSE,
	async ({ courseId, data }, thunkAPI) => {
		try {
			return await courseService.updateCourse(courseId, data);
		} catch (error) {
			return thunkAPI.rejectWithValue(extractErrorMessage(error));
		}
	}
);

export const getCourse = createAsyncThunk(
	GET_COURSE,
	async (courseId, thunkAPI) => {
		try {
			return await courseService.getCourse(courseId);
		} catch (error) {
			return thunkAPI.rejectWithValue(extractErrorMessage(error));
		}
	}
);

export const deleteCourse = createAsyncThunk(
	DELETE_COURSE,
	async (courseId, thunkAPI) => {
		try {
			return await courseService.deleteCourse(courseId);
		} catch (error) {
			return thunkAPI.rejectWithValue(extractErrorMessage(error));
		}
	}
);

export const activateCourse = createAsyncThunk(
	ACTIVATE_COURSE,
	async (courseId, thunkAPI) => {
		try {
			const response = await courseService.activateCourse(courseId);
			thunkAPI.dispatch(updateTeachingsAfterActivation(response));
			return response;
		} catch (error) {
			return thunkAPI.rejectWithValue(extractErrorMessage(error));
		}
	}
);

export const deActivateCourse = createAsyncThunk(
	DEACTIVATE_COURSE,
	async (courseId, thunkAPI) => {
		try {
			const response = await courseService.deActivateCourse(courseId);
			thunkAPI.dispatch(updateTeachingsAfterDeactivation(response));
			return response;
		} catch (error) {
			return thunkAPI.rejectWithValue(extractErrorMessage(error));
		}
	}
);

export const getCourses = createAsyncThunk(GET_COURSES, async (_, thunkAPI) => {
	try {
		const { page, search, searchSemester, searchCycle, searchHasLab, sort } =
			thunkAPI.getState().courses;
		let url = `?page=${page}`;
		// let url = `/course/undergraduate?semester=${searchSemester}&cycle=${searchCycle}&lab=${searchHasLab}&sort=${sort}&page=${page}`;
		// if (search) url = url + `&search=${search}`;

		return await courseService.getCourses(url);
	} catch (error) {
		return thunkAPI.rejectWithValue(extractErrorMessage(error));
	}
});

export const deleteCourses = createAsyncThunk(
	DELETE_COURSES,
	async (_, thunkAPI) => {
		try {
			return await courseService.deleteCourses();
		} catch (error) {
			return thunkAPI.rejectWithValue(extractErrorMessage(error));
		}
	}
);

export const enrollCourse = createAsyncThunk(
	ENROLL_COURSE,
	async (teachingId, thunkAPI) => {
		try {
			const response = await courseService.enrollCourse(teachingId);
			const updatedStudent = response.student;

			thunkAPI.dispatch(updateEnrolledCourses(updatedStudent.enrolledCourses));
			return response;
		} catch (error) {
			return thunkAPI.rejectWithValue(extractErrorMessage(error));
		}
	}
);

export const disenrollCourse = createAsyncThunk(
	UNENROLL_COURSE,
	async (teachingId, thunkAPI) => {
		try {
			const response = await courseService.disenrollCourse(teachingId);
			const updatedStudent = response.student;

			thunkAPI.dispatch(updateEnrolledCourses(updatedStudent.enrolledCourses));
			return response;
		} catch (error) {
			return thunkAPI.rejectWithValue(extractErrorMessage(error));
		}
	}
);

export const getEnrolledCourses = createAsyncThunk(
	GET_ENROLLED_COURSES,
	async (_, thunkAPI) => {
		try {
			return await courseService.getEnrolledCourses();
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
		clearFilters: (state) => {
			return { ...state, ...initialFiltersState };
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
			.addCase(createCourse.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				displaySuccessNotification(payload.message);
				state.courses = [...state.courses, payload.course];
			})
			.addCase(createCourse.rejected, (state, { payload }) => {
				state.isLoading = false;
				displayErrorNotification(payload);
			})
			.addCase(updateCourse.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(updateCourse.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				displaySuccessNotification(payload.message);
				const updatedCourseIndex = state.courses.findIndex(
					(course) => course._id === payload.updatedCourse._id
				);
				if (updatedCourseIndex !== -1)
					state.courses[updatedCourseIndex] = payload.updatedCourse;
			})
			.addCase(updateCourse.rejected, (state, { payload }) => {
				state.isLoading = false;
				displayErrorNotification(payload);
			})
			.addCase(getCourse.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getCourse.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				state.course = payload;
			})
			.addCase(getCourse.rejected, (state, { payload }) => {
				state.isLoading = false;
				if (
					payload !==
					'Seems like the course that you are trying to view does not exist.'
				)
					displayErrorNotification(payload);
			})
			.addCase(deleteCourse.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(deleteCourse.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				displaySuccessNotification(payload.message);
				state.courses = state.courses.filter((course) => {
					return course._id !== payload.course;
				});
			})
			.addCase(deleteCourse.rejected, (state, { payload }) => {
				state.isLoading = false;
				displayErrorNotification(payload);
			})
			.addCase(activateCourse.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(activateCourse.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				displaySuccessNotification(payload.message);
				const activatedCourseIndex = state.courses.findIndex(
					(course) => course._id === payload.activatedCourse._id
				);
				if (activatedCourseIndex !== -1)
					state.courses[activatedCourseIndex].isActive = true;
			})
			.addCase(activateCourse.rejected, (state, { payload }) => {
				state.isLoading = false;
				displayErrorNotification(payload);
			})
			.addCase(deActivateCourse.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(deActivateCourse.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				displaySuccessNotification(payload.message);
				const deactivatedCourseIndex = state.courses.findIndex(
					(course) => course._id === payload.deactivatedCourse._id
				);
				if (deactivatedCourseIndex !== -1)
					state.courses[deactivatedCourseIndex].isActive = false;
			})
			.addCase(deActivateCourse.rejected, (state, { payload }) => {
				state.isLoading = false;
				displayErrorNotification(payload);
			})
			.addCase(getCourses.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getCourses.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				state.courses = payload;
				state.numOfPages = payload.numOfPages;
				state.totalCourses = payload.totalCourses;
			})
			.addCase(getCourses.rejected, (state, { payload }) => {
				state.isLoading = false;
				if (
					payload !==
					'Seems like there are no courses registered in the system.'
				)
					displayErrorNotification(payload);
			})
			.addCase(deleteCourses.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(deleteCourses.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				displaySuccessNotification(payload);
			})
			.addCase(deleteCourses.rejected, (state, { payload }) => {
				state.isLoading = false;
				displayErrorNotification(payload);
			})
			.addCase(enrollCourse.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(enrollCourse.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				displaySuccessNotification(payload.message);
			})
			.addCase(enrollCourse.rejected, (state, { payload }) => {
				state.isLoading = false;
				displayNotification('Something seems strange!', payload, WARNING);
			})
			.addCase(disenrollCourse.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(disenrollCourse.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				displaySuccessNotification(payload.message);
			})
			.addCase(disenrollCourse.rejected, (state, { payload }) => {
				state.isLoading = false;
				displayErrorNotification(payload);
			})
			.addCase(getEnrolledCourses.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getEnrolledCourses.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				state.user.user.student.enrolledCourses = payload;
			})
			.addCase(getEnrolledCourses.rejected, (state, { payload }) => {
				state.isLoading = false;
				if (payload !== `Seems like you haven't enrolled in any courses yet.`)
					displayErrorNotification(payload);
			});
	},
});

export const {
	resetCourses,
	changePage,
	clearFilters,
	handleChange,
	setEditCourse,
} = courseSlice.actions;
export default courseSlice.reducer;
