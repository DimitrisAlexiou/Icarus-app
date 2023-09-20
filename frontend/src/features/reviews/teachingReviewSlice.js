import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { extractErrorMessage } from '../../utils/errorMessage';
import {
	CREATE_TEACHING_REVIEW,
	UPDATE_TEACHING_REVIEW,
	GET_TEACHING_REVIEW,
	DELETE_TEACHING_REVIEW,
	GET_USER_TEACHING_REVIEWS,
	DELETE_USER_TEACHING_REVIEWS,
	GET_TEACHING_REVIEWS,
	DELETE_TEACHING_REVIEWS,
} from '../actions';
import { Toast } from '../../constants/sweetAlertNotification';
import teachingReviewService from './services/teachingReviewService';

const initialState = {
	teachingReviews: [],
	teachingReview: {},
	isLoading: false,
	isEditingTeachingReview: false,
	editTeachingReviewId: '',
};

export const createTeachingReview = createAsyncThunk(
	CREATE_TEACHING_REVIEW,
	async (data, thunkAPI) => {
		try {
			return await teachingReviewService.createTeachingReview(data);
		} catch (error) {
			return thunkAPI.rejectWithValue(extractErrorMessage(error));
		}
	}
);

export const updateTeachingReview = createAsyncThunk(
	UPDATE_TEACHING_REVIEW,
	async ({ teachingReviewId, data }, thunkAPI) => {
		try {
			return await teachingReviewService.updateTeachingReview(teachingReviewId, data);
		} catch (error) {
			return thunkAPI.rejectWithValue(extractErrorMessage(error));
		}
	}
);

export const getTeachingReview = createAsyncThunk(
	GET_TEACHING_REVIEW,
	async (teachingReviewId, thunkAPI) => {
		try {
			return await teachingReviewService.getTeachingReview(teachingReviewId);
		} catch (error) {
			return thunkAPI.rejectWithValue(extractErrorMessage(error));
		}
	}
);

export const deleteTeachingReview = createAsyncThunk(
	DELETE_TEACHING_REVIEW,
	async (teachingReviewId, thunkAPI) => {
		try {
			return await teachingReviewService.deleteTeachingReview(teachingReviewId);
		} catch (error) {
			return thunkAPI.rejectWithValue(extractErrorMessage(error));
		}
	}
);

export const getUserTeachingReviews = createAsyncThunk(
	GET_USER_TEACHING_REVIEWS,
	async (_, thunkAPI) => {
		try {
			return await teachingReviewService.getUserTeachingReviews();
		} catch (error) {
			return thunkAPI.rejectWithValue(extractErrorMessage(error));
		}
	}
);

export const deleteUserTeachingReviews = createAsyncThunk(
	DELETE_USER_TEACHING_REVIEWS,
	async (_, thunkAPI) => {
		try {
			return await teachingReviewService.deleteUserTeachingReviews();
		} catch (error) {
			return thunkAPI.rejectWithValue(extractErrorMessage(error));
		}
	}
);

export const getTeachingReviews = createAsyncThunk(GET_TEACHING_REVIEWS, async (_, thunkAPI) => {
	try {
		return await teachingReviewService.getTeachingReviews();
	} catch (error) {
		return thunkAPI.rejectWithValue(extractErrorMessage(error));
	}
});

export const deleteTeachingReviews = createAsyncThunk(
	DELETE_TEACHING_REVIEWS,
	async (_, thunkAPI) => {
		try {
			return await teachingReviewService.deleteTeachingReviews();
		} catch (error) {
			return thunkAPI.rejectWithValue(extractErrorMessage(error));
		}
	}
);

export const teachingReviewSlice = createSlice({
	name: 'teachingReview',
	initialState,
	reducers: {
		resetTeachingReview: () => initialState,
		setEditTeachingReview: (state, { payload }) => {
			return { ...state, isEditingTeachingReview: true, ...payload };
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(createTeachingReview.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(createTeachingReview.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				Toast.fire({
					title: 'Success',
					text: payload.message,
					icon: 'success',
				});
				state.teachingReviews = [...state.teachingReviews, payload.teachingReview];
			})
			.addCase(createTeachingReview.rejected, (state, { payload }) => {
				state.isLoading = false;
				Toast.fire({
					title: 'Something went wrong!',
					text: payload,
					icon: 'error',
				});
			})
			.addCase(updateTeachingReview.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(updateTeachingReview.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				Toast.fire({
					title: 'Success',
					text: payload.message,
					icon: 'success',
				});
				const updatedTeachingReviewIndex = state.teachingReviews.findIndex(
					(teachingReview) => teachingReview._id === payload.updatedTeachingReview._id
				);
				if (updatedTeachingReviewIndex !== -1)
					state.teachingReviews[updatedTeachingReviewIndex] =
						payload.updatedTeachingReview;
			})
			.addCase(updateTeachingReview.rejected, (state, { payload }) => {
				state.isLoading = false;
				Toast.fire({
					title: 'Something went wrong!',
					text: payload,
					icon: 'error',
				});
			})
			.addCase(getTeachingReview.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getTeachingReview.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				state.teachingReview = payload;
			})
			.addCase(getTeachingReview.rejected, (state, { payload }) => {
				state.isLoading = false;
				if (
					payload !==
					'Seems like the teaching review that you are trying to view does not exist.'
				)
					Toast.fire({
						title: 'Something went wrong!',
						text: payload,
						icon: 'error',
					});
			})
			.addCase(deleteTeachingReview.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(deleteTeachingReview.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				Toast.fire({
					title: 'Success',
					text: payload.message,
					icon: 'success',
				});
				state.teachingReviews = state.teachingReviews.filter((teachingReview) => {
					return teachingReview._id !== payload.teachingReview;
				});
			})
			.addCase(deleteTeachingReview.rejected, (state, { payload }) => {
				state.isLoading = false;
				Toast.fire({
					title: 'Something went wrong!',
					text: payload,
					icon: 'error',
				});
			})
			.addCase(getUserTeachingReviews.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getUserTeachingReviews.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				state.teachingReviews = payload;
			})
			.addCase(getUserTeachingReviews.rejected, (state, { payload }) => {
				state.isLoading = false;
				if (payload !== `Seems like you haven't submitted any teaching reviews yet.`)
					Toast.fire({
						title: 'Something went wrong!',
						text: payload,
						icon: 'error',
					});
			})
			.addCase(getTeachingReviews.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getTeachingReviews.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				state.teachingReviews = payload;
			})
			.addCase(getTeachingReviews.rejected, (state, { payload }) => {
				state.isLoading = false;
				if (
					payload !== 'Seems like there are no teaching reviews registered in the system.'
				)
					Toast.fire({
						title: 'Something went wrong!',
						text: payload,
						icon: 'error',
					});
			})
			.addCase(deleteUserTeachingReviews.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(deleteUserTeachingReviews.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				Toast.fire({
					title: 'Success',
					text: payload.message,
					icon: 'success',
				});
			})
			.addCase(deleteUserTeachingReviews.rejected, (state, { payload }) => {
				state.isLoading = false;
				Toast.fire({
					title: 'Something went wrong!',
					text: payload,
					icon: 'error',
				});
			})
			.addCase(deleteTeachingReviews.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(deleteTeachingReviews.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				Toast.fire({
					title: 'Success',
					text: payload.message,
					icon: 'success',
				});
			})
			.addCase(deleteTeachingReviews.rejected, (state, { payload }) => {
				state.isLoading = false;
				Toast.fire({
					title: 'Something went wrong!',
					text: payload,
					icon: 'error',
				});
			});
	},
});

export const { resetTeachingReview, setEditTeachingReview } = teachingReviewSlice.actions;
export default teachingReviewSlice.reducer;
