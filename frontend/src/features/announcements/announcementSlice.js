import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { extractErrorMessage } from '../../utils/errorMessage';
import {
	displayErrorNotification,
	displaySuccessNotification,
} from '../../constants/sweetAlertNotification';
import {
	GET_ANNOUNCEMENT,
	CREATE_ANNOUNCEMENT,
	UPDATE_ANNOUNCEMENT,
	DELETE_TEACHING_ANNOUNCEMENT,
	GET_TEACHING_ANNOUNCEMENTS,
	DELETE_TEACHING_ANNOUNCEMENTS,
	DELETE_ANNOUNCEMENTS,
	GET_ANNOUNCEMENTS,
	GET_INSTRUCTOR_ANNOUNCEMENTS,
	DELETE_INSTRUCTOR_ANNOUNCEMENTS,
} from '../actions';
import announcementService from './announcementService';

const initialState = {
	announcements: [],
	announcement: {},
	isLoading: false,
	isEditingAnnouncement: false,
	editAnnouncementId: '',
};

export const getAnnouncement = createAsyncThunk(
	GET_ANNOUNCEMENT,
	async (announcementId, thunkAPI) => {
		try {
			return await announcementService.getAnnouncement(announcementId);
		} catch (error) {
			return thunkAPI.rejectWithValue(extractErrorMessage(error));
		}
	}
);

export const createAnnouncement = createAsyncThunk(
	CREATE_ANNOUNCEMENT,
	async (data, thunkAPI) => {
		try {
			return await announcementService.createAnnouncement(data);
		} catch (error) {
			return thunkAPI.rejectWithValue(extractErrorMessage(error));
		}
	}
);

export const updateAnnouncement = createAsyncThunk(
	UPDATE_ANNOUNCEMENT,
	async ({ announcementId, data }, thunkAPI) => {
		try {
			return await announcementService.updateAnnouncement(announcementId, data);
		} catch (error) {
			return thunkAPI.rejectWithValue(extractErrorMessage(error));
		}
	}
);

export const deleteAnnouncement = createAsyncThunk(
	DELETE_TEACHING_ANNOUNCEMENT,
	async (announcementId, thunkAPI) => {
		try {
			return await announcementService.deleteAnnouncement(announcementId);
		} catch (error) {
			return thunkAPI.rejectWithValue(extractErrorMessage(error));
		}
	}
);

export const getInstructorAnnouncements = createAsyncThunk(
	GET_INSTRUCTOR_ANNOUNCEMENTS,
	async (_, thunkAPI) => {
		try {
			return await announcementService.getInstructorAnnouncements();
		} catch (error) {
			return thunkAPI.rejectWithValue(extractErrorMessage(error));
		}
	}
);

export const deleteInstructorAnnouncements = createAsyncThunk(
	DELETE_INSTRUCTOR_ANNOUNCEMENTS,
	async (_, thunkAPI) => {
		try {
			return await announcementService.deleteInstructorAnnouncements();
		} catch (error) {
			return thunkAPI.rejectWithValue(extractErrorMessage(error));
		}
	}
);

export const getTeachingAnnouncements = createAsyncThunk(
	GET_TEACHING_ANNOUNCEMENTS,
	async (teachingId, thunkAPI) => {
		try {
			return await announcementService.getTeachingAnnouncements(teachingId);
		} catch (error) {
			return thunkAPI.rejectWithValue(extractErrorMessage(error));
		}
	}
);

export const deleteTeachingAnnouncements = createAsyncThunk(
	DELETE_TEACHING_ANNOUNCEMENTS,
	async (teachingId, thunkAPI) => {
		try {
			return await announcementService.deleteTeachingAnnouncements(teachingId);
		} catch (error) {
			return thunkAPI.rejectWithValue(extractErrorMessage(error));
		}
	}
);

export const getAnnouncements = createAsyncThunk(
	GET_ANNOUNCEMENTS,
	async (_, thunkAPI) => {
		try {
			return await announcementService.getAnnouncements();
		} catch (error) {
			return thunkAPI.rejectWithValue(extractErrorMessage(error));
		}
	}
);

export const deleteAnnouncements = createAsyncThunk(
	DELETE_ANNOUNCEMENTS,
	async (_, thunkAPI) => {
		try {
			return await announcementService.deleteAnnouncements();
		} catch (error) {
			return thunkAPI.rejectWithValue(extractErrorMessage(error));
		}
	}
);

export const announcementSlice = createSlice({
	name: 'announcement',
	initialState,
	reducers: {
		resetAnnouncements: () => initialState,
		setEditAnnouncement: (state, { payload }) => {
			return { ...state, isEditingAnnouncement: true, ...payload };
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getTeachingAnnouncements.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getTeachingAnnouncements.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				state.announcements = payload;
			})
			.addCase(getTeachingAnnouncements.rejected, (state, { payload }) => {
				state.isLoading = false;
				if (
					payload !==
					`Seems like this teaching does not have any announcements.`
				)
					displayErrorNotification(payload);
			})
			.addCase(getInstructorAnnouncements.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getInstructorAnnouncements.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				state.announcements = payload;
			})
			.addCase(getInstructorAnnouncements.rejected, (state, { payload }) => {
				state.isLoading = false;
				if (payload !== 'Seems like you do not have any announcements.')
					displayErrorNotification(payload);
			})
			.addCase(getAnnouncement.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getAnnouncement.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				state.announcement = payload;
			})
			.addCase(getAnnouncement.rejected, (state, { payload }) => {
				state.isLoading = false;
				displayErrorNotification(payload);
			})
			.addCase(createAnnouncement.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(createAnnouncement.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				displaySuccessNotification(payload.message);
				state.announcements = [...state.announcements, payload.announcement];
			})
			.addCase(createAnnouncement.rejected, (state, { payload }) => {
				state.isLoading = false;
				displayErrorNotification(payload);
			})
			.addCase(updateAnnouncement.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(updateAnnouncement.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				displaySuccessNotification(payload.message);
				const updatedAnnouncementIndex = state.announcements.findIndex(
					(announcement) => announcement._id === payload.updatedAnnouncement._id
				);
				if (updatedAnnouncementIndex !== -1)
					state.announcements[updatedAnnouncementIndex] =
						payload.updatedAnnouncement;
			})
			.addCase(updateAnnouncement.rejected, (state, { payload }) => {
				state.isLoading = false;
				displayErrorNotification(payload);
			})
			.addCase(deleteAnnouncement.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(deleteAnnouncement.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				displaySuccessNotification(payload.messsage);
				state.announcements = state.announcements.filter((announcement) => {
					return announcement._id !== payload.announcement;
				});
			})
			.addCase(deleteAnnouncement.rejected, (state, { payload }) => {
				state.isLoading = false;
				displayErrorNotification(payload);
			})
			.addCase(deleteTeachingAnnouncements.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(deleteTeachingAnnouncements.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				state.announcements = null;
				displaySuccessNotification(payload.message);
			})
			.addCase(deleteTeachingAnnouncements.rejected, (state, { payload }) => {
				state.isLoading = false;
				displayErrorNotification(payload);
			})
			.addCase(deleteInstructorAnnouncements.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(
				deleteInstructorAnnouncements.fulfilled,
				(state, { payload }) => {
					state.isLoading = false;
					state.announcements = null;
					displaySuccessNotification(payload.message);
				}
			)
			.addCase(deleteInstructorAnnouncements.rejected, (state, { payload }) => {
				state.isLoading = false;
				displayErrorNotification(payload);
			})
			.addCase(getAnnouncements.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getAnnouncements.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				state.announcements = payload;
			})
			.addCase(getAnnouncements.rejected, (state, { payload }) => {
				state.isLoading = false;
				if (
					payload !==
					'Seems like there are no announcements registered in the system.'
				)
					displayErrorNotification(payload);
			})
			.addCase(deleteAnnouncements.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(deleteAnnouncements.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				displaySuccessNotification(payload);
			})
			.addCase(deleteAnnouncements.rejected, (state, { payload }) => {
				state.isLoading = false;
				displayErrorNotification(payload);
			});
	},
});

export const { resetAnnouncements, setEditAnnouncement } =
	announcementSlice.actions;
export default announcementSlice.reducer;
