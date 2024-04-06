import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { extractErrorMessage } from '../../utils/errorMessage';
import {
	displayErrorNotification,
	displaySuccessNotification,
} from '../../constants/sweetAlertNotification';
import {
	ASSIGN_LAB_INSTRUCTORS,
	ASSIGN_THEORY_INSTRUCTORS,
	DELETE_TEACHING,
	DELETE_TEACHINGS,
	GET_TEACHING,
	GET_TEACHINGS,
	UNASSIGN_THEORY_INSTRUCTORS,
	UNASSIGN_LAB_INSTRUCTORS,
	UPDATE_TEACHING,
	GET_TEACHING_BY_COURSE_ID,
	ASSIGN_THEORY_GRADING,
	ASSIGN_LAB_GRADING,
	UNASSIGN_THEORY_GRADING,
	UNASSIGN_LAB_GRADING,
	GET_INSTRUCTOR_TEACHINGS,
	DOWNLOAD_ENROLLED_STUDENTS_PDF,
	GET_SYSTEM_TEACHINGS,
	GET_SEMESTER_ACTIVE_TEACHINGS,
} from '../actions';
import teachingService from './services/teachingService';

const initialState = {
	teachings: [],
	teaching: null,
	totalTeachings: 0,
	numOfPages: 1,
	page: 1,
	isLoading: false,
	isEditingTeaching: false,
	isEditingTeachingGrading: false,
	editTeachingId: '',
};

export const updateTeaching = createAsyncThunk(
	UPDATE_TEACHING,
	async ({ teachingId, data }, thunkAPI) => {
		try {
			return await teachingService.updateTeaching(teachingId, data);
		} catch (error) {
			return thunkAPI.rejectWithValue(extractErrorMessage(error));
		}
	}
);

export const getTeaching = createAsyncThunk(
	GET_TEACHING,
	async (teachingId, thunkAPI) => {
		try {
			return await teachingService.getTeaching(teachingId);
		} catch (error) {
			return thunkAPI.rejectWithValue(extractErrorMessage(error));
		}
	}
);

export const getTeachingByCourseId = createAsyncThunk(
	GET_TEACHING_BY_COURSE_ID,
	async (courseId, thunkAPI) => {
		try {
			return await teachingService.getTeachingByCourseId(courseId);
		} catch (error) {
			return thunkAPI.rejectWithValue(extractErrorMessage(error));
		}
	}
);

export const deleteTeaching = createAsyncThunk(
	DELETE_TEACHING,
	async (teachingId, thunkAPI) => {
		try {
			return await teachingService.deleteTeaching(teachingId);
		} catch (error) {
			return thunkAPI.rejectWithValue(extractErrorMessage(error));
		}
	}
);

export const downloadEnrolledStudentsPDF = createAsyncThunk(
	DOWNLOAD_ENROLLED_STUDENTS_PDF,
	async (teachingId, thunkAPI) => {
		try {
			return await teachingService.downloadEnrolledStudentsPDF(teachingId);
		} catch (error) {
			return thunkAPI.rejectWithValue(extractErrorMessage(error));
		}
	}
);

export const getSystemTeachings = createAsyncThunk(
	GET_SYSTEM_TEACHINGS,
	async (_, thunkAPI) => {
		try {
			const { page } = thunkAPI.getState().teachings;
			let url = `?page=${page}`;
			return await teachingService.getSystemTeachings(url);
		} catch (error) {
			return thunkAPI.rejectWithValue(extractErrorMessage(error));
		}
	}
);

export const getTeachings = createAsyncThunk(
	GET_TEACHINGS,
	async (_, thunkAPI) => {
		try {
			const { page } = thunkAPI.getState().teachings;
			let url = `?page=${page}`;
			return await teachingService.getTeachings(url);
		} catch (error) {
			return thunkAPI.rejectWithValue(extractErrorMessage(error));
		}
	}
);

export const getSemesterActiveTeachings = createAsyncThunk(
	GET_SEMESTER_ACTIVE_TEACHINGS,
	async (_, thunkAPI) => {
		try {
			return await teachingService.getSemesterActiveTeachings();
		} catch (error) {
			return thunkAPI.rejectWithValue(extractErrorMessage(error));
		}
	}
);

export const getInstructorTeachings = createAsyncThunk(
	GET_INSTRUCTOR_TEACHINGS,
	async (_, thunkAPI) => {
		try {
			return await teachingService.getInstructorTeachings();
		} catch (error) {
			return thunkAPI.rejectWithValue(extractErrorMessage(error));
		}
	}
);

export const deleteTeachings = createAsyncThunk(
	DELETE_TEACHINGS,
	async (_, thunkAPI) => {
		try {
			return await teachingService.deleteTeachings();
		} catch (error) {
			return thunkAPI.rejectWithValue(extractErrorMessage(error));
		}
	}
);

export const assignTheoryInstructors = createAsyncThunk(
	ASSIGN_THEORY_INSTRUCTORS,
	async ({ teachingId, data }, thunkAPI) => {
		try {
			return await teachingService.assignTheoryInstructors(teachingId, data);
		} catch (error) {
			return thunkAPI.rejectWithValue(extractErrorMessage(error));
		}
	}
);

export const unassignTheoryInstructors = createAsyncThunk(
	UNASSIGN_THEORY_INSTRUCTORS,
	async (teachingId, thunkAPI) => {
		try {
			return await teachingService.unassignTheoryInstructors(teachingId);
		} catch (error) {
			return thunkAPI.rejectWithValue(extractErrorMessage(error));
		}
	}
);

export const assignLabInstructors = createAsyncThunk(
	ASSIGN_LAB_INSTRUCTORS,
	async ({ teachingId, data }, thunkAPI) => {
		try {
			return await teachingService.assignLabInstructors(teachingId, data);
		} catch (error) {
			return thunkAPI.rejectWithValue(extractErrorMessage(error));
		}
	}
);

export const unassignLabInstructors = createAsyncThunk(
	UNASSIGN_LAB_INSTRUCTORS,
	async (teachingId, thunkAPI) => {
		try {
			return await teachingService.unassignLabInstructors(teachingId);
		} catch (error) {
			return thunkAPI.rejectWithValue(extractErrorMessage(error));
		}
	}
);

export const assignTheoryGrading = createAsyncThunk(
	ASSIGN_THEORY_GRADING,
	async ({ teachingId, data }, thunkAPI) => {
		try {
			return await teachingService.assignTheoryGrading(teachingId, data);
		} catch (error) {
			return thunkAPI.rejectWithValue(extractErrorMessage(error));
		}
	}
);

export const unassignTheoryGrading = createAsyncThunk(
	UNASSIGN_THEORY_GRADING,
	async (teachingId, thunkAPI) => {
		try {
			return await teachingService.unassignTheoryGrading(teachingId);
		} catch (error) {
			return thunkAPI.rejectWithValue(extractErrorMessage(error));
		}
	}
);

export const assignLabGrading = createAsyncThunk(
	ASSIGN_LAB_GRADING,
	async ({ teachingId, data }, thunkAPI) => {
		try {
			return await teachingService.assignLabGrading(teachingId, data);
		} catch (error) {
			return thunkAPI.rejectWithValue(extractErrorMessage(error));
		}
	}
);

export const unassignLabGrading = createAsyncThunk(
	UNASSIGN_LAB_GRADING,
	async (teachingId, thunkAPI) => {
		try {
			return await teachingService.unassignLabGrading(teachingId);
		} catch (error) {
			return thunkAPI.rejectWithValue(extractErrorMessage(error));
		}
	}
);

export const teachingSlice = createSlice({
	name: 'teaching',
	initialState,
	reducers: {
		resetTeachings: () => initialState,
		handleChange: (state, { payload: { name, value } }) => {
			state.page = 1;
			state[name] = value;
		},
		changePage: (state, { payload }) => {
			state.page = payload;
		},
		setEditTeaching: (state, { payload }) => {
			return { ...state, isEditingTeaching: true, ...payload };
		},
		setEditTeachingGrading: (state, { payload }) => {
			return { ...state, isEditingTeachingGrading: true, ...payload };
		},
		updateTeachingsAfterActivation: (state, { payload }) => {
			state.teachings = [...state.teachings, payload.teaching];
		},
		updateTeachingsAfterDeactivation: (state, { payload }) => {
			const deactivatedCourseId = payload.deactivatedCourse._id;

			state.teachings = state.teachings.filter(
				(teaching) => teaching.course._id !== deactivatedCourseId
			);
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(updateTeaching.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(updateTeaching.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				displaySuccessNotification(payload.message);
				const updatedTeachingIndex = state.teachings.findIndex(
					(teaching) => teaching._id === payload.updatedTeaching._id
				);
				if (updatedTeachingIndex !== -1)
					state.teachings[updatedTeachingIndex] = payload.updatedTeaching;
			})
			.addCase(updateTeaching.rejected, (state, { payload }) => {
				state.isLoading = false;
				displayErrorNotification(payload);
			})
			.addCase(getTeaching.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getTeaching.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				state.teaching = payload;
			})
			.addCase(getTeaching.rejected, (state, { payload }) => {
				state.isLoading = false;
				if (
					payload !==
					'Seems like the teaching that you are trying to view does not exist.'
				)
					displayErrorNotification(payload);
			})
			.addCase(getTeachingByCourseId.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getTeachingByCourseId.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				state.teaching = payload;
			})
			.addCase(getTeachingByCourseId.rejected, (state, { payload }) => {
				state.isLoading = false;
				if (
					payload !==
					'Seems like the course teaching that you are trying to view does not exist.'
				)
					displayErrorNotification(payload);
			})
			.addCase(deleteTeaching.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(deleteTeaching.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				displaySuccessNotification(payload.message);
				state.teachings = state.teachings.filter((teaching) => {
					return teaching._id !== payload.teaching;
				});
			})
			.addCase(deleteTeaching.rejected, (state, { payload }) => {
				state.isLoading = false;
				displayErrorNotification(payload);
			})
			.addCase(downloadEnrolledStudentsPDF.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(downloadEnrolledStudentsPDF.fulfilled, (state) => {
				state.isLoading = false;
				displaySuccessNotification('Enrolled students PDF downloaded.');
			})
			.addCase(downloadEnrolledStudentsPDF.rejected, (state, { payload }) => {
				state.isLoading = false;
				displayErrorNotification(payload);
			})
			.addCase(getSystemTeachings.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getSystemTeachings.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				state.teachings = payload.teachings;
				state.numOfPages = payload.numOfPages;
				state.totalTeachings = payload.totalTeachings;
			})
			.addCase(getSystemTeachings.rejected, (state, { payload }) => {
				state.isLoading = false;
				if (
					payload !==
					'Seems like there are no active course teachings registered in the system.'
				)
					displayErrorNotification(payload);
			})
			.addCase(getTeachings.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getTeachings.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				state.teachings = payload.teachings;
				state.numOfPages = payload.numOfPages;
				state.totalTeachings = payload.totalTeachings;
			})
			.addCase(getTeachings.rejected, (state, { payload }) => {
				state.isLoading = false;
				if (
					payload !==
					'Seems like there are no active course teachings registered in the system.'
				)
					displayErrorNotification(payload);
			})
			.addCase(getSemesterActiveTeachings.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getSemesterActiveTeachings.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				state.teachings = payload.teachings;
				state.numOfPages = payload.numOfPages;
				state.totalTeachings = payload.totalTeachings;
			})
			.addCase(getSemesterActiveTeachings.rejected, (state, { payload }) => {
				state.isLoading = false;
				if (
					payload !==
					'Seems like there are no active course teachings for the current semester.'
				)
					displayErrorNotification(payload);
			})
			.addCase(getInstructorTeachings.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getInstructorTeachings.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				state.teachings = payload.teachings;
				state.numOfPages = payload.numOfPages;
				state.totalTeachings = payload.totalTeachings;
			})
			.addCase(getInstructorTeachings.rejected, (state, { payload }) => {
				state.isLoading = false;
				if (
					payload !==
					'Seems like there are no active course teachings assigned to you.'
				)
					displayErrorNotification(payload);
			})
			.addCase(deleteTeachings.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(deleteTeachings.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				displaySuccessNotification(payload);
			})
			.addCase(deleteTeachings.rejected, (state, { payload }) => {
				state.isLoading = false;
				displayErrorNotification(payload);
			})
			.addCase(assignTheoryInstructors.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(assignTheoryInstructors.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				displaySuccessNotification(payload.message);
				const assignedInstructorsIndex = state.teachings.findIndex(
					(teaching) => teaching._id === payload.assignedTheoryInstructors._id
				);
				if (assignedInstructorsIndex !== -1)
					state.teachings[assignedInstructorsIndex].theoryInstructors =
						payload.assignedTheoryInstructors.theoryInstructors;
			})
			.addCase(assignTheoryInstructors.rejected, (state, { payload }) => {
				state.isLoading = false;
				displayErrorNotification(payload);
			})
			.addCase(unassignTheoryInstructors.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(unassignTheoryInstructors.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				displaySuccessNotification(payload.message);
				const unassignedInstructorsIndex = state.teachings.findIndex(
					(teaching) => teaching._id === payload.unassignedTheoryInstructors._id
				);
				if (unassignedInstructorsIndex !== -1)
					state.teachings[unassignedInstructorsIndex].theoryInstructors = [];
			})
			.addCase(unassignTheoryInstructors.rejected, (state, { payload }) => {
				state.isLoading = false;
				displayErrorNotification(payload);
			})
			.addCase(assignLabInstructors.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(assignLabInstructors.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				displaySuccessNotification(payload.message);
				const assignedInstructorsIndex = state.teachings.findIndex(
					(teaching) => teaching._id === payload.assignedLabInstructors._id
				);
				if (assignedInstructorsIndex !== -1)
					state.teachings[assignedInstructorsIndex].labInstructors =
						payload.assignedLabInstructors.labInstructors;
			})
			.addCase(assignLabInstructors.rejected, (state, { payload }) => {
				state.isLoading = false;
				displayErrorNotification(payload);
			})
			.addCase(unassignLabInstructors.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(unassignLabInstructors.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				displaySuccessNotification(payload.message);
				const unassignedInstructorsIndex = state.teachings.findIndex(
					(teaching) => teaching._id === payload.unassignedLabInstructors._id
				);
				if (unassignedInstructorsIndex !== -1)
					state.teachings[unassignedInstructorsIndex].labInstructors = [];
			})
			.addCase(unassignLabInstructors.rejected, (state, { payload }) => {
				state.isLoading = false;
				displayErrorNotification(payload);
			})
			.addCase(assignTheoryGrading.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(assignTheoryGrading.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				displaySuccessNotification(payload.message);
				const assignedGradingIndex = state.teachings.findIndex(
					(teaching) => teaching._id === payload.assignedTheoryGrading._id
				);
				if (assignedGradingIndex !== -1)
					state.teachings[assignedGradingIndex].theoryExamination =
						payload.assignedTheoryGrading.theoryExamination;
			})
			.addCase(assignTheoryGrading.rejected, (state, { payload }) => {
				state.isLoading = false;
				displayErrorNotification(payload);
			})
			.addCase(unassignTheoryGrading.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(unassignTheoryGrading.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				displaySuccessNotification(payload.message);
				const unassignedGradingIndex = state.teachings.findIndex(
					(teaching) => teaching._id === payload.unassignedTheoryGrading._id
				);
				if (unassignedGradingIndex !== -1)
					state.teachings[unassignedGradingIndex].theoryExamination = [];
			})
			.addCase(unassignTheoryGrading.rejected, (state, { payload }) => {
				state.isLoading = false;
				displayErrorNotification(payload);
			})
			.addCase(assignLabGrading.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(assignLabGrading.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				displaySuccessNotification(payload.message);
				const assignedGradingIndex = state.teachings.findIndex(
					(teaching) => teaching._id === payload.assignedLabGrading._id
				);
				if (assignedGradingIndex !== -1)
					state.teachings[assignedGradingIndex].labExamination =
						payload.assignedLabGrading.labExamination;
			})
			.addCase(assignLabGrading.rejected, (state, { payload }) => {
				state.isLoading = false;
				displayErrorNotification(payload);
			})
			.addCase(unassignLabGrading.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(unassignLabGrading.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				displaySuccessNotification(payload.message);
				const unassignedGradingIndex = state.teachings.findIndex(
					(teaching) => teaching._id === payload.unassignedLabGrading._id
				);
				if (unassignedGradingIndex !== -1)
					state.teachings[unassignedGradingIndex].labExamination = [];
			})
			.addCase(unassignLabGrading.rejected, (state, { payload }) => {
				state.isLoading = false;
				displayErrorNotification(payload);
			});
	},
});

export const {
	resetTeachings,
	changePage,
	handleChange,
	setEditTeaching,
	setEditTeachingGrading,
	updateTeachingsAfterActivation,
	updateTeachingsAfterDeactivation,
} = teachingSlice.actions;

export default teachingSlice.reducer;
